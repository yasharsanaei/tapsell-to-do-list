import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { TaskDto } from '../../types/dto/task-dto';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { EditTaskComponent } from '../edit-task/edit-task.component';
import { DatePipe } from '@angular/common';
import { ApiService } from '../../services/base/api.service';
import { DeleteConfirmationDirective } from '../../utils/directives/delete-confirmation.directive';
import { ListService } from '../../services/list.service';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    DatePipe,
    DeleteConfirmationDirective,
  ],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.css',
})
export class TaskCardComponent implements OnInit {
  #matDialog = inject(MatDialog);
  #apiService = inject(ApiService);
  #listService = inject(ListService);

  isLoading = signal<boolean>(false);
  isDaily = signal<boolean>(false);

  @Input({ required: true })
  task!: TaskDto;

  @Output()
  updateList: EventEmitter<void> = new EventEmitter<void>();

  ngOnInit(): void {
    if (this.task.list === this.#listService.mainList.data()?._id) {
      this.isDaily.set(true);
    }
  }

  editTask() {
    this.#matDialog.open(EditTaskComponent, {
      data: {
        listId: this.task.list,
        task: this.task,
      },
      minWidth: '300px',
      width: '100%',
      maxWidth: '800px',
    });
  }

  toggleDoneTask() {
    this.isLoading.set(true);
    this.#apiService
      .tasks()
      .put({ ...this.task, done: !this.task.done }, this.task._id)
      .subscribe(() => {
        this.isLoading.set(false);
        this.updateList.next();
      });
  }

  moveToDaily() {
    this.isLoading.set(true);
    this.#apiService
      .tasks()
      .put(
        { ...this.task, list: this.#listService.mainList.data()?._id },
        this.task._id,
      )
      .subscribe(() => {
        this.isLoading.set(false);
        this.updateList.next();
      });
  }

  deleteTask() {
    this.isLoading.set(true);
    this.#apiService
      .tasks()
      .delete(this.task._id)
      .subscribe(() => {
        this.isLoading.set(false);
        this.updateList.next();
      });
  }
}
