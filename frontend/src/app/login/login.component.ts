import { Component, inject } from '@angular/core';

import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { LoginDialogComponent } from '../shared/components/login-dialog/login-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { RegisterDialogComponent } from '../shared/components/register-dialog/register-dialog.component';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [AppMaterialModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  readonly dialog = inject(MatDialog);

  public openLoginDialog(){
    const dialogRef = this.dialog.open(LoginDialogComponent, {

    });
  }

  public openRegisterDialog(){
    const dialogRef = this.dialog.open(RegisterDialogComponent, {

    });
  }
}
