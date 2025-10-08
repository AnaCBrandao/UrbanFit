import { Component, OnInit } from '@angular/core';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [
    MatGridListModule,
    MatCardModule
  ],
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss'
})
export class EventsComponent implements OnInit {

  events: Event[] = []

  constructor(){

  }

  ngOnInit(): void {

  }

}
