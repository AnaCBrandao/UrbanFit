import { NgModule } from '@angular/core';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  exports: [
    MatGridListModule,
    MatCardModule
  ]
})
export class AppMaterialModule { }
