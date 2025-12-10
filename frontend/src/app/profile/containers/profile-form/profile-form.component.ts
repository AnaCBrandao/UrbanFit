import { Component } from '@angular/core';

import { AppMaterialModule } from '../../../shared/app-material/app-material.module';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile-form',
  standalone: true,
  imports: [AppMaterialModule, ReactiveFormsModule],
  templateUrl: './profile-form.component.html',
  styleUrl: './profile-form.component.scss'
})
export class ProfileFormComponent {

  form = this.formBuilder.group({
    name: [''],
    email: [''],
    age: ['']
  });

  constructor(private formBuilder: NonNullableFormBuilder,
  ){};


}
