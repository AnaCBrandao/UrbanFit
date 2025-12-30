import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

import { DatePipe, AsyncPipe, NgIf, Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { EventsService } from '../../services/events.service';

import { AppMaterialModule } from '../../../shared/app-material/app-material.module';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Event } from '../../model/event';
import { ConfirmationDialogComponent } from '../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';

import { environment } from '../../../../enviroments/enviroment';
import * as mapboxgl from 'mapbox-gl';
import { AuthService } from '../../../login/services/auth.service';

@Component({
  selector: 'app-event-info',
  standalone: true,
  imports: [AppMaterialModule, DatePipe, AsyncPipe, NgIf],
  templateUrl: './event-info.component.html',
  styleUrl: './event-info.component.scss'
})
export class EventInfoComponent implements AfterViewInit{
  @ViewChild('mapEl') mapEl?: ElementRef<HTMLDivElement>;

  event$!: Observable<Event | null>;
  marker!: mapboxgl.Marker;
  map!:mapboxgl.Map;
  lat = -21.7944;
  lng = -48.1756;
  zoom = 15;

  constructor(private route: ActivatedRoute,
    private eventsService: EventsService,
    private snackBar: MatSnackBar,
    private location: Location,
    public dialog: MatDialog,
    public auth: AuthService,
  ) {}


  ngAfterViewInit(): void {
    this.initMap();

    this.event$ = this.route.paramMap.pipe(
      switchMap(params => {
        const id = Number(params.get('id'));
        if (Number.isNaN(id)) throw new Error('ID inválido');
        return this.eventsService.getEventById(id);
      }),
      tap(async event => {
        const lat = Number(event.latitude);
        const lng = Number(event.longitude);

        if (!Number.isNaN(lat) && !Number.isNaN(lng)) {
          this.updateMarkerAndFly(lng, lat);
          console.log('foi')
        } else {
          console.log(lng, lat)
           await this.forwardGeocodeAndUpdate(event.local);
        }
      })
    );
  }

  private async forwardGeocodeAndUpdate(address: string): Promise<void> {
    if (!address || !address.trim()) return;

    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json` +
                `?access_token=${environment.mapboxToken}&country=BR&language=pt&limit=1`;
    const resp = await fetch(url);
    if (!resp.ok) return;
    const json = await resp.json();

    const feature = json.features?.[0];
    if (!feature) return;

    const [lng, lat] = feature.center;
    this.updateMarkerAndFly(lng, lat);
  }

  private initMap(): void {
    if (!this.mapEl?.nativeElement) return;

    this.map = new mapboxgl.Map({
      container: this.mapEl.nativeElement,
      style: 'mapbox://styles/mapbox/light-v10',
      center: [this.lng, this.lat],
      zoom: this.zoom,
      accessToken: environment.mapboxToken
    });

    this.marker = new mapboxgl.Marker({ color: 'red', draggable: false })
      .setLngLat([this.lng, this.lat])
      .addTo(this.map);
  }

  private updateMarkerAndFly(lng: number, lat: number): void {
    if (!this.marker || !this.map) return;
    this.marker.setLngLat([lng, lat]);
    this.map.flyTo({ center: [lng, lat], zoom: 15 });
  }

  onDelete(event: Event) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Tem certeza que deseja remover esse evento?',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.eventsService.delete(event.id).subscribe(() => {
          this.snackBar.open("Evento deletado com sucesso", 'X', {duration: 5000, verticalPosition: 'top', horizontalPosition: 'center'})
          this.location.back()
        }, error =>  this.snackBar.open("Erro ao deletar evento", '', {duration: 5000}))
      };
    })
  }

  onAttend(event: Event) {
    const userId = this.auth.currentUser?.id;
    if (!userId) {
      this.snackBar.open('Você precisa estar logada(o).', 'Fechar', { duration: 3000 });
      return;
    }

    const before = event.attendees ?? [];
    event.attendees = Array.from(new Set([...before, userId]));

    this.eventsService.attend(event.id).subscribe({
      next: (updated) => {
        event.attendees = updated.attendees ?? event.attendees;

        this.snackBar.open('Presença confirmada!', 'X', {
          duration: 3000, verticalPosition: 'top', horizontalPosition: 'center'
        });
      },
      error: (err) => {
        event.attendees = before;

        this.snackBar.open('Erro ao se inscrever', 'X', {
          duration: 5000, verticalPosition: 'top', horizontalPosition: 'center'
        });
        console.error('attend error:', err);
      }
    });
  }

  // onUnAttend(event: Event) {
  //   this.eventsService.unattend(event.id).subscribe(() => {
  //         this.snackBar.open("Presença cancelada", 'X', {duration: 5000, verticalPosition: 'top', horizontalPosition: 'center'})
  //   }, error =>  this.snackBar.open("Erro ao cancelar presença", '', {duration: 5000}))
  // }


onUnAttend(event: Event) {
  const userId = this.auth.currentUser?.id;
  if (!userId) {
    this.snackBar.open('Você precisa estar logada(o).', 'Fechar', { duration: 3000 });
    return;
  }

  const before = [...(event.attendees ?? [])];

  event.attendees = (event.attendees ?? []).filter(uid => uid !== userId);

  this.eventsService.unattend(event.id).subscribe({
    next: (updated) => {
      if (updated?.attendees) {
        event.attendees = updated.attendees;
      }
      this.snackBar.open('Presença cancelada!', 'X', {
        duration: 3000, verticalPosition: 'top', horizontalPosition: 'center'
      });
    },
    error: (err) => {
      event.attendees = before;
      this.snackBar.open('Erro ao cancelar presença', 'Fechar', {
        duration: 5000, verticalPosition: 'top', horizontalPosition: 'center'
      });
      console.error('unattend error:', err);
    }
  });
}

}
