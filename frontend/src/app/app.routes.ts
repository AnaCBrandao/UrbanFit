
import { Routes } from '@angular/router';
import { ProfileComponent } from './profile/containers/profile/profile.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from '../app/login/guards/auth.guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  {
    path: 'events',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    loadChildren: () =>
      import('./events/events.module').then(m => m.EventsModule)
  },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: 'login' }
];
