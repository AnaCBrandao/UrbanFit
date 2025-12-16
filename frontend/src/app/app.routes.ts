import { Routes } from '@angular/router';
import { ProfileComponent } from './profile/containers/profile/profile.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'events' },
  {
    path: 'events',
    loadChildren: () => import('./events/events.module').then(m => m.EventsModule)
  },
  { path: 'profile', component: ProfileComponent },
  { path: 'login', component: LoginComponent },
];
