import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Event } from '../model/event';
import { delay, first, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  private readonly API = '/assets/events.json';

  constructor(private httpClient: HttpClient) { }

  listEvents() {
    return this.httpClient.get<Event[]>(this.API)
    .pipe(
      first(),
      tap(events => console.log(events))
    )
  }
}
