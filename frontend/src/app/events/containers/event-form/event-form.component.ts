import { Component, OnInit, OnDestroy  } from '@angular/core';
import { FormControl, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { AppMaterialModule } from '../../../shared/app-material/app-material.module';
import { CdkDialogContainer } from "@angular/cdk/dialog";
import { EventsService } from '../../services/events.service';
import { MatSnackBar } from '@angular/material/snack-bar';

import { SharedModule } from '../../../shared/shared.module';
import { Location, NgIf } from '@angular/common';
import { environment } from '../../../../enviroments/enviroment';
import * as mapboxgl from 'mapbox-gl';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

@Component({
  selector: 'app-event-form',
  standalone: true,
  imports: [AppMaterialModule, ReactiveFormsModule, CdkDialogContainer, SharedModule, NgIf],
  templateUrl: './event-form.component.html',
  styleUrl: './event-form.component.scss'
})
export class EventFormComponent implements OnInit, OnDestroy  {

  marker!: mapboxgl.Marker;
  map!:mapboxgl.Map;
  lat = -21.7944;
  lng = -48.1756;
  zoom = 12;


  form = this.formBuilder.group({
      name: ['',[Validators.required, Validators.minLength(5), Validators.maxLength(200)]],
      description: [''],
      local: ['', [Validators.required]],
      date: ['', [Validators.required]],
      time: ['', [Validators.required]],
    });

  get localCtrl(): FormControl {
    return this.form.get('local') as FormControl;
  }

  constructor(private formBuilder: NonNullableFormBuilder,
    private service: EventsService,
    private snackBar: MatSnackBar,
    private location: Location
  ){
  }

  ngOnInit(): void {
    this.buildMap();
    this.listenLocalField();
  }


  ngOnDestroy(): void {
    this.map?.remove();
  }

  //lógica do mapa
  buildMap(){

    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/light-v10',
      center: [this.lng, this.lat],
      zoom: this.zoom,
      accessToken: environment.mapboxToken
    });

    this.marker = new mapboxgl.Marker({ color: 'red', draggable: true })
      .setLngLat([this.lng, this.lat])
      .addTo(this.map);

    // const onDragEnd = () => {
    //   const lngLat = this.marker.getLngLat();
    //   this.lng = lngLat.lng;
    //   this.lat = lngLat.lat;
    // };
    // this.marker.on('dragend', onDragEnd);


  this.marker.on('dragend', async () => {
    const { lng, lat } = this.marker.getLngLat();
    this.lng = lng;
    this.lat = lat;
    await this.reverseGeocodeAndFillLocal(lat, lng); // opcional
  });

  const geocoder = new MapboxGeocoder({
    accessToken: (mapboxgl as any).accessToken,
    mapboxgl: mapboxgl,
    marker: false,
    placeholder: 'Digite um endereço',
    countries: 'br',
    language: 'pt',
    limit: 5
  });

  this.map.addControl(geocoder);

  geocoder.on('result', (e: any) => {
    const [lng, lat] = e.result.center;
    this.marker.setLngLat([lng, lat]);
    this.map.flyTo({ center: [lng, lat], zoom: 15 });

    const place = e.result.place_name ?? '';
    this.localCtrl.setValue(place, { emitEvent: false });
    this.lng = lng;
    this.lat = lat;
  });
}

  private listenLocalField(): void {
    this.localCtrl.valueChanges.pipe(
      debounceTime(600),
      distinctUntilChanged(),
      filter(v => !!v && v.trim().length > 3)
    ).subscribe(async (address) => {
      try {
        await this.forwardGeocode(address!.trim());
      } catch (err) {
        console.error('Falha ao geocodificar endereço:', err);
      }
    });
  }


private async forwardGeocode(address: string): Promise<void> {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json` +
                `?access_token=${environment.mapboxToken}&country=BR&language=pt&limit=1`;

    const resp = await fetch(url);
    if (!resp.ok) throw new Error(`Mapbox geocoding falhou: ${resp.status}`);
    const json = await resp.json();

    if (!json.features?.length) return; // não encontrado

    const [lng, lat] = json.features[0].center;
    this.marker.setLngLat([lng, lat]);
    this.map.flyTo({ center: [lng, lat], zoom: 15 });
    this.lng = lng;
    this.lat = lat;
}


private async reverseGeocodeAndFillLocal(lat: number, lng: number): Promise<void> {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json` +
                `?access_token=${environment.mapboxToken}&types=address&country=BR&language=pt&limit=1`;

    const resp = await fetch(url);
    if (!resp.ok) return;
    const json = await resp.json();

    const place = json.features?.[0]?.place_name;
    if (place) {
      this.localCtrl.setValue(place, { emitEvent: false });
    }
  }



  //acoes do formulario
  onSubmit() {
    this.service.save(this.form.value).subscribe(data => this.onSuccess(), error => this.onError())
  }

  onCancel(){
    this.location.back()
  }

  //mensagens e erros
  private onSuccess() {
    this.snackBar.open("Evento salvo com sucesso", '', {duration: 5000})
    this.location.back()
  }

  private onError() {
    this.snackBar.open("Erro ao salvar evento", '', {duration: 5000})
  }

  getErrorMessage(fieldName: string){
    const field = this.form.get(fieldName);

    if (field?.hasError('required')){
      return 'Campo obrigatório'
    }

    if (field?.hasError('minlength')){
      const requiredLength = field.errors ? field.errors['minlength']['requiredLength'] : 5
      return `Tamanho minimo: ${requiredLength} caracteres.`
    }

    if (field?.hasError('maxlength')){
      const requiredLength = field.errors ? field.errors['maxlength']['requiredLength'] : 200
      return `Tamanho máximo: ${requiredLength} caracteres.`
    }

    return 'Campo Inválido'
  }
}
