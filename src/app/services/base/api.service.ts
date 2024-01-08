import { inject, Injectable } from '@angular/core';
import { CoreService } from './core.service';
import { environment } from '../../../environments/environment';
import { TaskDto } from '../../types/dto/task-dto';
import { ListDto } from '../../types/dto/list-dto';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  #coreService = inject(CoreService);

  #wrapUrl(url: string) {
    return environment.baseApiUrl.concat(url);
  }

  tasks() {
    const url = this.#wrapUrl('tasks');
    return {
      get: () =>
        this.#coreService.getBody<TaskDto[]>({
          url,
        }),
      post: (body: Partial<TaskDto>) =>
        this.#coreService.postBody<TaskDto, Partial<TaskDto>>({
          url,
          body,
        }),
      getById: (id: string) =>
        this.#coreService.getByIdBody<TaskDto>({ url, id }),
      put: (body: Partial<TaskDto>, id: string) =>
        this.#coreService.patchBody<TaskDto, Partial<TaskDto>>({
          url,
          body,
          id,
        }),
      delete: (id: string) => this.#coreService.deleteById({ url, id }),
    };
  }

  tasksQuery() {
    const url = this.#wrapUrl('tasks/query');
    return {
      getByListId: (id: string) => {
        return this.#coreService.getByIdBody<TaskDto[]>({ url, id });
      },
    };
  }

  lists() {
    const url = this.#wrapUrl('lists');
    return {
      get: () =>
        this.#coreService.getBody<ListDto[]>({
          url,
        }),
      post: (body: ListDto) =>
        this.#coreService.postBody<ListDto, ListDto>({
          url,
          body,
        }),
      getById: (id: string) =>
        this.#coreService.getByIdBody<ListDto>({ url, id }),
      put: (body: ListDto, id: string) =>
        this.#coreService.patchBody<ListDto>({ url, body, id }),
      delete: (id: string) => this.#coreService.deleteById({ url, id }),
    };
  }

  completed() {
    const url = this.#wrapUrl('compeleted');
    return {
      get: () => this.#coreService.getBody<TaskDto[]>({ url }),
    };
  }

  mainList() {
    const url = this.#wrapUrl('mainList');
    return {
      get: () => this.#coreService.getBody<ListDto>({ url }),
    };
  }
}
