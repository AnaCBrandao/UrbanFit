import { Component } from '@angular/core';
import { CalendarComponent } from '../calendar/calendar.component';
import { ProfileFormComponent } from '../profile-form/profile-form.component';

import { AppMaterialModule } from '../../../shared/app-material/app-material.module';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ProfileFormComponent, CalendarComponent, AppMaterialModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

constructor() {}



}
