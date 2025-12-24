import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';


import { AppMaterialModule } from '../../../shared/app-material/app-material.module';

import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../login/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-dialog',
  standalone: true,
  imports: [AppMaterialModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login-dialog.component.html',
  styleUrl: './login-dialog.component.scss'
})
export class LoginDialogComponent {
  readonly dialogRef = inject(MatDialogRef<LoginDialogComponent>);

  form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
    loading = false; error?: string;

    constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {}

    submit() {
      this.loading = true;
      const { email, password } = this.form.value;
      this.auth.login(email!, password!).subscribe({
        next: () => { this.loading = false; this.router.navigate(['/events']); this.dialogRef.close();},
        error: (err) => {
          this.loading = false;
          this.error = err?.error?.message || 'Usuário ou senha inválidos';
        }
      });
    }


  onNoClick(): void {
    this.dialogRef.close();
  }
}
