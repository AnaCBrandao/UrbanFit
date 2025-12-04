import { Component } from '@angular/core';

import { DatePipe, AsyncPipe, NgIf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { EventsService } from '../../services/events.service';

import { AppMaterialModule } from '../../../shared/app-material/app-material.module';
import { Event } from '../../model/event';

@Component({
  selector: 'app-event-info',
  standalone: true,
  imports: [AppMaterialModule, DatePipe, AsyncPipe, NgIf],
  templateUrl: './event-info.component.html',
  styleUrl: './event-info.component.scss'
})
export class EventInfoComponent {

event$!: Observable<Event | null>;

  constructor(private route: ActivatedRoute, private eventsService: EventsService) {}

  ngOnInit(): void {
    this.event$ = this.route.paramMap.pipe(
      switchMap(params => {
        const idParam = params.get('id');
        const id = idParam ? Number(idParam) : NaN;

        if (Number.isNaN(id)) {
          return of(null);
        }

        return this.eventsService.getEventById(id);
      })
    );
  }

}
