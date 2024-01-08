import {
  booleanAttribute,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { TaskDto } from '../../types/dto/task-dto';
import { TaskCardComponent } from '../task-card/task-card.component';
import { ReactiveState } from '../../utils/reactive-state/reactive-state';
import { JsonPipe } from '@angular/common';
import { LoadingComponent } from '../loading/loading.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [TaskCardComponent, JsonPipe, LoadingComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
})
export class TaskListComponent {
  @Output()
  listUpdate: EventEmitter<void> = new EventEmitter<void>();

  @Input({ transform: booleanAttribute })
  isDoneView?: boolean;

  @Input({ required: true })
  tasks!: ReactiveState<TaskDto[]>;

  onUpdateList() {
    this.listUpdate.next();
  }
}
