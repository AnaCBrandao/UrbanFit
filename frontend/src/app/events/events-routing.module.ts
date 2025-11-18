import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventsComponent } from './events/events.component';
<<<<<<< HEAD

const routes: Routes = [
  { path: '', component: EventsComponent}
=======
import { EventFormComponent } from './event-form/event-form.component';

const routes: Routes = [
  { path: '', component: EventsComponent},
  { path: 'new', component: EventFormComponent}
>>>>>>> e5c44fd (event-form component)
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsRoutingModule { }
