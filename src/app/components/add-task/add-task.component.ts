import { Component, inject, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { EditTaskComponent } from '../edit-task/edit-task.component';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css',
})
export class AddTaskComponent {
  #matDialog = inject(MatDialog);

  @Input({ required: true })
  listId!: string;

  openDialog() {
    this.#matDialog.open(EditTaskComponent, {
      data: {
        listId: this.listId,
        task: undefined,
      },
      minWidth: '300px',
      width: '100%',
      maxWidth: '800px',
    });
  }
}
