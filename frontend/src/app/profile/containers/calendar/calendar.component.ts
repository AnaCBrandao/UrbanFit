import { Component } from '@angular/core';

import { AppMaterialModule } from '../../../shared/app-material/app-material.module';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [AppMaterialModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent {

}
