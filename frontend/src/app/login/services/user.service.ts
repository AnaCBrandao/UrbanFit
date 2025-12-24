import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../model/user';
import { delay, first, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

   private readonly API = 'api/users';

    constructor(private httpClient: HttpClient) { }

    listUsers() {
      return this.httpClient.get<User[]>(this.API)
      .pipe(
        first(),
        delay(2000),
        tap(users => console.log(users))
      )
    }

    save(record: Partial<User>) {
      console.log(record)
      return this.httpClient.post<User>(this.API, record).pipe(first())
    }

    getUserById(id: number): Observable<User> {
      return this.httpClient.get<User>(`${this.API}/${id}`);
    }

    delete(id: number) {
      return this.httpClient.delete(`${this.API}/${id}`).pipe(first())
    }


    updateProfile(payload: Partial<User>): Observable<User> {
      return this.httpClient.put<User>('/api/profile', payload);
    }

}
