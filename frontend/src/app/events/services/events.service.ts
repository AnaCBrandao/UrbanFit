import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Event } from '../model/event';
import { delay, first, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

<<<<<<< HEAD
  private readonly API = '/assets/events.json';
=======
  private readonly API = 'api/events';
>>>>>>> e5c44fd (event-form component)

  constructor(private httpClient: HttpClient) { }

  listEvents() {
    return this.httpClient.get<Event[]>(this.API)
    .pipe(
      first(),
      delay(2000),
      tap(events => console.log(events))
    )
  }
}
