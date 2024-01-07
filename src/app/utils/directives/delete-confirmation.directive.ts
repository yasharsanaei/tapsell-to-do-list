import {
  Directive,
  EventEmitter,
  HostListener,
  inject,
  Output,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationComponent } from '../../components/delete-confirmation/delete-confirmation.component';

@Directive({
  selector: '[appDeleteConfirmation]',
  standalone: true,
})
export class DeleteConfirmationDirective {
  readonly #matDialog = inject(MatDialog);

  @Output() confirmed: EventEmitter<void> = new EventEmitter<void>();

  @HostListener('click')
  openDialogue() {
    this.#matDialog
      .open(DeleteConfirmationComponent, {
        disableClose: false,
      })
      .beforeClosed()
      .subscribe({
        next: (data) => data && this.confirmed.emit(),
      });
  }
}
