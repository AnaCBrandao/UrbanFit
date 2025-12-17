import { Component, inject } from '@angular/core';

import { AppMaterialModule } from '../../../shared/app-material/app-material.module';

import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-register-dialog',
  standalone: true,
  imports: [AppMaterialModule],
  templateUrl: './register-dialog.component.html',
  styleUrl: './register-dialog.component.scss'
})
export class RegisterDialogComponent {
  readonly dialogRef = inject(MatDialogRef<RegisterDialogComponent>);

    onNoClick(): void {
      this.dialogRef.close();
    }
}
