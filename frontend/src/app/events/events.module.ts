import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventsRoutingModule } from './events-routing.module';
import { AppMaterialModule } from '../shared/app-material/app-material.module';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    EventsRoutingModule,
    AppMaterialModule,
  ]
})
export class EventsModule { }
