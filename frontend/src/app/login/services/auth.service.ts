
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

export interface LoginResponse {
  id: number;
  name: string;
  email: string;
  age: number;
}

@Injectable({ providedIn: 'root' })
export class AuthService {

private readonly API = 'api/auth';

  private currentUserSubject = new BehaviorSubject<LoginResponse | null>(null);

  currentUser$ = this.currentUserSubject.asObservable();

  get currentUser(): LoginResponse | null {
    return this.currentUserSubject.value;
  }

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.API}/login`, { email, password })
      .pipe(
        tap(res => this.currentUserSubject.next(res))
      );
  }

  me(): Observable<LoginResponse> {
    return this.http
      .get<LoginResponse>(`${this.API}/me`)
      .pipe(
        tap(res => this.currentUserSubject.next(res))
      );
  }

  updateProfile(payload: Partial<LoginResponse>): Observable<LoginResponse> {
    console.log(payload);
    return this.http
      .put<LoginResponse>(`${this.API}/me`, payload)
      .pipe(
        tap(res => this.currentUserSubject.next(res))
      );
  }

  logout(): Observable<void> {
    return this.http
      .post<void>(`${this.API}/logout`, {})
      .pipe(
        tap(() => this.currentUserSubject.next(null))
      );
  }

  get isLoggedIn(): boolean {
    return !!this.currentUserSubject.value;
  }

}
