import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventsComponent } from '../events/containers/events/events.component';
import { EventFormComponent } from './containers/event-form/event-form.component';
import { EventInfoComponent } from './containers/event-info/event-info.component';

const routes: Routes = [
  { path: '', component: EventsComponent},
  { path: 'new', component: EventFormComponent},
  { path: 'eventInfo/:id', component: EventInfoComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsRoutingModule { }
