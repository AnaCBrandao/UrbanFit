import { Component, OnDestroy, OnInit } from '@angular/core';

import { AppMaterialModule } from '../../../shared/app-material/app-material.module';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { AuthService, LoginResponse } from '../../../login/services/auth.service';
import { Router } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import { AsyncPipe, NgIf } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile-form',
  standalone: true,
  imports: [AppMaterialModule, ReactiveFormsModule, AsyncPipe, NgIf],
  templateUrl: './profile-form.component.html',
  styleUrl: './profile-form.component.scss'
})

export class ProfileFormComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  user$: Observable<LoginResponse | null>;

  form = this.formBuilder.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    age: [undefined as number | undefined]
  });

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private auth: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {
    this.user$ = this.auth.currentUser$;
  }

  ngOnInit(): void {
    this.user$
      .pipe(takeUntil(this.destroy$))
      .subscribe(user => {
        if (user) {
          this.form.patchValue({
            name: user.name ?? '',
            email: user.email ?? '',
            age: user.age ?? undefined
          });
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload = {
      name: this.form.value.name!,
      email: this.form.value.email!,
      age: this.form.value.age ?? undefined
    };

    this.auth.updateProfile(payload).subscribe({
      next: () => { this.snackBar.open("Atualizado com sucesso", 'X', {duration: 5000, verticalPosition: 'top', horizontalPosition: 'center'})},
      error: (err) => console.error('Falha ao salvar perfil:', err)
    });
  }

  logout(): void {
    this.auth.logout().subscribe({
      next: () => this.router.navigate(['/login']),
      error: (err) => {
        console.error('Falha ao fazer logout:', err);
        this.router.navigate(['/login']);
      }
    });
  }
}
