import { Component } from '@angular/core';
<<<<<<< HEAD
import { RouterOutlet } from '@angular/router';

import { AppMaterialModule } from '../app/shared/app-material/app-material.module';
import { HttpClientModule } from '@angular/common/http';
=======

import { AppMaterialModule } from '../app/shared/app-material/app-material.module';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterModule, RouterOutlet } from '@angular/router';

>>>>>>> e5c44fd (event-form component)

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    AppMaterialModule,
    HttpClientModule,
<<<<<<< HEAD
=======
    RouterModule
>>>>>>> e5c44fd (event-form component)
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend';
<<<<<<< HEAD
=======

  constructor(private router: Router) {}

  goHome() {
    this.router.navigate(['/']);
    document.querySelector('.home-icon')?.classList.add('active');
    document.querySelector('.map-icon')?.classList.remove('active');
  }

  goMap() {
    this.router.navigate(['/']);
    document.querySelector('.map-icon')?.classList.add('active');
    document.querySelector('.home-icon')?.classList.remove('active');
  }

>>>>>>> e5c44fd (event-form component)
}
