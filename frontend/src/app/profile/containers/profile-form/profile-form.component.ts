import { Component } from '@angular/core';

import { AppMaterialModule } from '../../../shared/app-material/app-material.module';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';

import { AuthService } from '../../../login/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-form',
  standalone: true,
  imports: [AppMaterialModule, ReactiveFormsModule],
  templateUrl: './profile-form.component.html',
  styleUrl: './profile-form.component.scss'
})
export class ProfileFormComponent {

  form = this.formBuilder.group({
    name: [''],
    email: [''],
    age: ['']
  });

  constructor(private formBuilder: NonNullableFormBuilder,
    public auth: AuthService, private router: Router
  ){};

  logout(): void {
    this.auth.logout().subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Falha ao fazer logout:', err);
        this.auth.currentUser = undefined;
        this.router.navigate(['/login']);
      }
    });
  }

}
