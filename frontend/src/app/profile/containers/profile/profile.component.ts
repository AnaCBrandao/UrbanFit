import { Component } from '@angular/core';
import { CalendarComponent } from '../calendar/calendar.component';
import { ProfileFormComponent } from '../profile-form/profile-form.component';
import { AuthService } from '../../../login/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ProfileFormComponent, CalendarComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

constructor(public auth: AuthService, private router: Router) {}

  logout(): void {
    this.auth.logout().subscribe({
      next: () => {
        // Redireciona após invalidar a sessão no backend
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Falha ao fazer logout:', err);
        // Mesmo se der erro, por segurança você pode limpar o estado local e redirecionar:
        this.auth.currentUser = undefined;
        this.router.navigate(['/login']);
      }
    });
  }

}
