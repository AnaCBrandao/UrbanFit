import { Component } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';

import { AppMaterialModule } from '../../../shared/app-material/app-material.module';
import { CdkDialogContainer } from "@angular/cdk/dialog";
import { EventsService } from '../../services/events.service';
import { MatSnackBar } from '@angular/material/snack-bar';

import { SharedModule } from '../../../shared/shared.module';
import { Location } from '@angular/common';

@Component({
  selector: 'app-event-form',
  standalone: true,
  imports: [AppMaterialModule, ReactiveFormsModule, CdkDialogContainer, SharedModule],
  templateUrl: './event-form.component.html',
  styleUrl: './event-form.component.scss'
})
export class EventFormComponent {

  form = this.formBuilder.group({
      name: [''],
      description: [''],
      local: [''],
      date: [''],
      time: [''],
    });

  constructor(private formBuilder: NonNullableFormBuilder,
    private service: EventsService,
    private snackBar: MatSnackBar,
    private location: Location
  ){};


  onSubmit() {
    this.service.save(this.form.value).subscribe(data => this.onSuccess(), error => this.onError())
  }

  onCancel(){
    this.location.back()
  }

  private onSuccess() {
    this.snackBar.open("Evento salvo com sucesso", '', {duration: 5000})
    this.location.back()
  }

  private onError() {
    this.snackBar.open("Erro ao salvar evento", '', {duration: 5000})
  }

}
