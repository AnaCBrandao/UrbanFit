import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Event } from '../model/event';
import { delay, first, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  private readonly API = 'api/events';

  constructor(private httpClient: HttpClient) { }

  listEvents() {
    return this.httpClient.get<Event[]>(this.API)
    .pipe(
      first(),
      delay(2000),
      tap(events => console.log(events))
    )
  }

  save(record: Partial<Event>) {

    if (record.date) {
      record.date = moment(record.date).format('DD/MM/YYYY');
    }

    return this.httpClient.post<Event>(this.API, record).pipe(first())
  }


  getEventById(id: number): Observable<Event> {
    return this.httpClient.get<Event>(`${this.API}/${id}`);
  }

  delete(id: number) {
    return this.httpClient.delete(`${this.API}/${id}`).pipe(first())
  }


  attend(id: number): Observable<Event> {
    return this.httpClient.put<Event>(`${this.API}/${id}/attend`, {});
  }

  unattend(id: number): Observable<Event> {
    return this.httpClient.put<Event>(`${this.API}/${id}/unattend`, {});
  }

}

