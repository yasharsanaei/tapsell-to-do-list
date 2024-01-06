import { inject, Injectable } from '@angular/core';
import { ReactiveState } from '../utils/reactive-state/reactive-state';
import { TaskDto } from '../types/dto/task-dto';
import { ApiService } from './base/api.service';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  #apiService = inject(ApiService);

  tasks = ReactiveState.create<TaskDto[]>({
    defaultValue: [],
    update: (id: string) => this.#apiService.tasksQuery().getByListId(id),
  });

  constructor() {}
}
