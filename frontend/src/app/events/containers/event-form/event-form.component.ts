import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { AppMaterialModule } from '../../../shared/app-material/app-material.module';
import { CdkDialogContainer } from "@angular/cdk/dialog";
import { EventsService } from '../../services/events.service';
import { MatSnackBar } from '@angular/material/snack-bar';

import { SharedModule } from '../../../shared/shared.module';
import { Location, NgIf } from '@angular/common';
import { environment } from '../../../../enviroments/enviroment';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-event-form',
  standalone: true,
  imports: [AppMaterialModule, ReactiveFormsModule, CdkDialogContainer, SharedModule, NgIf],
  templateUrl: './event-form.component.html',
  styleUrl: './event-form.component.scss'
})
export class EventFormComponent implements OnInit {

  map!:mapboxgl.Map;
  style = 'mapbox://styles/mapbox/light-v10';
  lat = 12.0911;
  lng = 85.8211;
  zoom = 5;
  fontSizePx = this.lat;

  form = this.formBuilder.group({
      name: ['',[Validators.required, Validators.minLength(5), Validators.maxLength(200)]],
      description: [''],
      local: ['', [Validators.required]],
      date: ['', [Validators.required]],
      time: ['', [Validators.required]],
    });

  constructor(private formBuilder: NonNullableFormBuilder,
    private service: EventsService,
    private snackBar: MatSnackBar,
    private location: Location
  ){
  }

  ngOnInit(): void {
    this.buildMap();
  }

  buildMap(){
    this.map = new mapboxgl.Map({
      accessToken: environment.mapboxToken,
      container: 'map',
      style: this.style,
      center: [-48.17556, -21.79444],
      zoom: 15,
    });

    const source = new mapboxgl.Marker({color: 'red', draggable: true}).setLngLat([-48.17556, -21.79444]).addTo(this.map);

    function onDragEnd(){
      var lnglat = source.getLngLat()
      console.log(lnglat)
    }
    source.on('dragend', onDragEnd);
  }

  onSubmit() {
    this.service.save(this.form.value).subscribe(data => this.onSuccess(), error => this.onError())
  }

  onCancel(){
    this.location.back()
  }

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
