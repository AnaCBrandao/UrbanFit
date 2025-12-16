import { Component, inject } from '@angular/core';

import { AppMaterialModule } from '../../../shared/app-material/app-material.module';

import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-login-dialog',
  standalone: true,
  imports: [AppMaterialModule],
  templateUrl: './login-dialog.component.html',
  styleUrl: './login-dialog.component.scss'
})
export class LoginDialogComponent {
  readonly dialogRef = inject(MatDialogRef<LoginDialogComponent>);

  onNoClick(): void {
    this.dialogRef.close();
  }
}
