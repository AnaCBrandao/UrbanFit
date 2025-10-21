import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { Event } from '../model/event';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [
    MatGridListModule,
    MatCardModule,
    CommonModule
  ],
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss'
})
export class EventsComponent implements OnInit {

  events: Event[] = [
    {
      id_event: 1,
      name: 'Evento de Teste',
      description: 'Descrição do evento de teste',
      local: 'Local do evento de teste',
      date: new Date('2024-07-01'),
      time: '18:00',
      id_creator: 1
    }
  ]

  constructor(){

  }

  ngOnInit(): void {

  }

}
