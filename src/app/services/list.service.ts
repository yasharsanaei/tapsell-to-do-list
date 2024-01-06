import { inject, Injectable } from '@angular/core';
import { ReactiveState } from '../utils/reactive-state/reactive-state';
import { ListDto } from '../types/dto/list-dto';
import { ApiService } from './base/api.service';

@Injectable({
  providedIn: 'root',
})
export class ListService {
  #apiService = inject(ApiService);

  lists = ReactiveState.create<ListDto[]>({
    defaultValue: [],
    update: () => this.#apiService.lists().get(),
  });

  mainList = ReactiveState.create<ListDto | undefined>({
    defaultValue: undefined,
    update: () => this.#apiService.mainList().get(),
  });

  constructor() {
    this.lists.update();
    this.mainList.update();
  }
}
