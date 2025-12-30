import { Component } from '@angular/core';

import { AppMaterialModule } from '../app/shared/app-material/app-material.module';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterModule, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    AppMaterialModule,
    HttpClientModule,
    RouterModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend';

  constructor(private router: Router) {}

  goHome() {
    this.router.navigate(['/events']);
    document.querySelector('.home-icon')?.classList.add('active');
    document.querySelector('.map-icon')?.classList.remove('active');
  }

  goMap() {
    this.router.navigate(['/events/new']);
    document.querySelector('.map-icon')?.classList.add('active');
    document.querySelector('.home-icon')?.classList.remove('active');
  }

  goProfile() {
    this.router.navigate(['/profile']);
    document.querySelector('.home-icon')?.classList.remove('active');
    document.querySelector('.map-icon')?.classList.remove('active');
  }
}
