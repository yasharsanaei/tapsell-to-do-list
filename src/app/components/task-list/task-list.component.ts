import { Component, Input } from '@angular/core';
import { TaskDto } from '../../types/dto/task-dto';
import { TaskCardComponent } from '../task-card/task-card.component';
import { ReactiveState } from '../../utils/reactive-state/reactive-state';
import {JsonPipe} from "@angular/common";
import {LoadingComponent} from "../loading/loading.component";

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [TaskCardComponent, JsonPipe, LoadingComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
})
export class TaskListComponent {
  @Input({ required: true })
  tasks!: ReactiveState<TaskDto[]>;
}
