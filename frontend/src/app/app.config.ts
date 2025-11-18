<<<<<<< HEAD
import { ApplicationConfig } from '@angular/core';
=======
>>>>>>> e5c44fd (event-form component)
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
<<<<<<< HEAD
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
=======
import { HttpClientModule } from '@angular/common/http';
import { importProvidersFrom, ApplicationConfig } from '@angular/core';
>>>>>>> e5c44fd (event-form component)

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(), provideAnimationsAsync(), importProvidersFrom(HttpClientModule)]
};
