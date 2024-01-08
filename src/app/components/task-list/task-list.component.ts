import { Component, inject, Input } from '@angular/core';
import { TaskDto } from '../../types/dto/task-dto';
import { TaskCardComponent } from '../task-card/task-card.component';
import { ReactiveState } from '../../utils/reactive-state/reactive-state';
import { JsonPipe } from '@angular/common';
import { LoadingComponent } from '../loading/loading.component';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [TaskCardComponent, JsonPipe, LoadingComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
})
export class TaskListComponent {
  #taskService = inject(TaskService);

  @Input({ required: true })
  listId!: string;

  @Input({ required: true })
  tasks!: ReactiveState<TaskDto[]>;

  onUpdateList() {
    this.#taskService.tasks.update(this.listId);
  }
}
