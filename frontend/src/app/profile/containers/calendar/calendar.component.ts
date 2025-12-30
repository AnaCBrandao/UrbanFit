import { Component, OnInit } from '@angular/core';

import { AppMaterialModule } from '../../../shared/app-material/app-material.module';
import { EventsService } from '../../../events/services/events.service';
import { Event } from '../../../events/model/event';
import { NgForOf, NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [AppMaterialModule, NgIf, NgForOf],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent implements OnInit {

  myEvents: Event[] = [];
  loading = false;
  error?: string;

  constructor(private eventsService: EventsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loading = true;

    this.eventsService.listMyEvents().subscribe({
      next: (events) => {
        this.myEvents = events ?? [];
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Falha ao carregar seus eventos.';
        this.loading = false;
      }
    });
  }

  goEvent(eventId: number): void {
    this.router.navigate(['/events/eventInfo', eventId]);
  }
}
