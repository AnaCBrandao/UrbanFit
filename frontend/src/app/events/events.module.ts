import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventsRoutingModule } from './events-routing.module';
import { MatGridListModule } from '@angular/material/grid-list';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    EventsRoutingModule,
    MatGridListModule,
  ]
})
export class EventsModule { }
