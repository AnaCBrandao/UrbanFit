import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventsRoutingModule } from './events-routing.module';
import { AppMaterialModule } from '../shared/app-material/app-material.module';
<<<<<<< HEAD
=======
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
>>>>>>> e5c44fd (event-form component)

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    EventsRoutingModule,
    AppMaterialModule,
<<<<<<< HEAD
=======
    SharedModule,
    ReactiveFormsModule
>>>>>>> e5c44fd (event-form component)
  ]
})
export class EventsModule { }
