import { Component } from '@angular/core';
import { CalendarComponent } from '../calendar/calendar.component';
import { ProfileFormComponent } from '../profile-form/profile-form.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ProfileFormComponent, CalendarComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

}
