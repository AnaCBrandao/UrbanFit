import { EventsService } from './../services/events.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { Event } from '../model/event';
import { AppMaterialModule } from '../../shared/app-material/app-material.module';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [
    AppMaterialModule,
    CommonModule,
    HttpClientModule,
    RouterModule
  ],
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss'
})
export class EventsComponent implements OnInit {

  events: Event[] = [];

  constructor(private eventsService: EventsService) {

    this.eventsService.listEvents().subscribe(events => this.events = events);
  }

  ngOnInit(): void {

  }

}
