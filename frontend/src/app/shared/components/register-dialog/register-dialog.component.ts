import { Component, inject } from '@angular/core';

import { AppMaterialModule } from '../../../shared/app-material/app-material.module';
import { FormControl, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../../login/services/user.service';
import { SharedModule } from '../../shared.module';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';

@Component({
  selector: 'app-register-dialog',
  standalone: true,
  imports: [AppMaterialModule, ReactiveFormsModule, SharedModule],
  templateUrl: './register-dialog.component.html',
  styleUrl: './register-dialog.component.scss'
})
export class RegisterDialogComponent {
  readonly dialogRef = inject(MatDialogRef<RegisterDialogComponent>);

  form = this.formBuilder.group({
    name: ['',[Validators.required, Validators.minLength(5), Validators.maxLength(200)]],
    email: ['', [Validators.required]],
    age: [undefined as number | undefined],
    password: ['', [Validators.required]],
  });

  constructor(private service: UserService,
    private formBuilder: NonNullableFormBuilder,
    private snackBar: MatSnackBar,
  ){
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onRegister() {
    this.service.save(this.form.value).subscribe(data => this.onSuccess(), error => this.onError())
  }

  private onSuccess() {
    this.snackBar.open("Cadastrado com sucesso", '', {duration: 5000})
  }

  private onError() {
    this.snackBar.open("Erro ao salvar dados", '', {duration: 5000})
  }

  readonly dialog = inject(MatDialog);

  public openLoginDialog(){
    this.dialogRef.close();
    this.dialog.open(LoginDialogComponent, {});
  }
}
