import { Component } from '@angular/core';

import { DatePipe, AsyncPipe, NgIf, Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { EventsService } from '../../services/events.service';

import { AppMaterialModule } from '../../../shared/app-material/app-material.module';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Event } from '../../model/event';
import { ConfirmationDialogComponent } from '../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-event-info',
  standalone: true,
  imports: [AppMaterialModule, DatePipe, AsyncPipe, NgIf],
  templateUrl: './event-info.component.html',
  styleUrl: './event-info.component.scss'
})
export class EventInfoComponent {

  event$!: Observable<Event | null>;

  constructor(private route: ActivatedRoute,
    private eventsService: EventsService,
    private snackBar: MatSnackBar,
    private location: Location,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.event$ = this.route.paramMap.pipe(
      switchMap(params => {
        const idParam = params.get('id');
        const id = idParam ? Number(idParam) : NaN;

        if (Number.isNaN(id)) {
          return of(null);
        }

        return this.eventsService.getEventById(id);
      })
    );
  }

  onDelete(event: Event) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Tem certeza que deseja remover esse evento?',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.eventsService.delete(event.id).subscribe(() => {
          this.snackBar.open("Evento deletado com sucesso", 'X', {duration: 5000, verticalPosition: 'top', horizontalPosition: 'center'})
          this.location.back()
        }, error =>  this.snackBar.open("Erro ao deletar evento", '', {duration: 5000}))
      };
    })
  }
}
