import { Event } from './../../model/event';
import { EventsService } from './../../services/events.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AppMaterialModule } from '../../../shared/app-material/app-material.module';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { catchError, of } from 'rxjs';
import { ErrorDialogComponent } from '../../../shared/components/error-dialog/error-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [AppMaterialModule, CommonModule, HttpClientModule, RouterModule],
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss',
})
export class EventsComponent implements OnInit {
  events: Event[] = [];

  constructor(
    private eventsService: EventsService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.eventsService
      .listEvents()
      .pipe(
        catchError((error) => {
          this.onError('Erro ao carregar eventos.');
          return of([]);
        })
      )
      .subscribe((events) => (this.events = events));
  }

  ngOnInit(): void {}

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg,
    });
  }

  onAdd() {
    this.router.navigate(['new'], {relativeTo: this.route})
  }

  onSubscribe(event: Event) {
    console.log(event)
    this.router.navigate(['eventInfo', event.id], {relativeTo: this.route})
  }
}

