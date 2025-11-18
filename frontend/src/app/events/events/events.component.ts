import { EventsService } from './../services/events.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { Event } from '../model/event';
import { AppMaterialModule } from '../../shared/app-material/app-material.module';
<<<<<<< HEAD
import { RouterModule } from '@angular/router';
=======
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
>>>>>>> e5c44fd (event-form component)
import { catchError, of } from 'rxjs';
import { ErrorDialogComponent } from '../../shared/components/error-dialog/error-dialog.component';
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
<<<<<<< HEAD
    public dialog: MatDialog
=======
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
>>>>>>> e5c44fd (event-form component)
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
<<<<<<< HEAD
=======

  onAdd() {
    this.router.navigate(['new'], {relativeTo: this.route})
  }
>>>>>>> e5c44fd (event-form component)
}
