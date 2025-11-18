import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'events' },
  {
    path: 'events',
    loadChildren: () => import('./events/events.module').then(m => m.EventsModule)
<<<<<<< HEAD
  }
=======
  },

>>>>>>> e5c44fd (event-form component)
];
