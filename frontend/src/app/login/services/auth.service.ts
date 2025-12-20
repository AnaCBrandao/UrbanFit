
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

export interface LoginResponse {
  id: number;
  nome: string;
  email: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly API = 'api/auth';

  currentUser?: LoginResponse;

  constructor(private http: HttpClient) {}

  login(email: string, senha: string) {
    console.log(email,senha);
    return this.http.post<LoginResponse>(`${this.API}/login`, { email, senha })
      .pipe(tap(res => this.currentUser = res));
  }

  logout() {
    return this.http.post<void>(`${this.API}/logout`, {})
      .pipe(tap(() => this.currentUser = undefined));
  }

  me() {
    return this.http.get<LoginResponse>(`${this.API}/me`)
      .pipe(tap(res => this.currentUser = res));
  }

  get isLoggedIn(): boolean {
    return !!this.currentUser;
  }
}
