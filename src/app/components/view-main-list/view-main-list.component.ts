import { Component, inject, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { ListService } from '../../services/list.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-view-main-list',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './view-main-list.component.html',
  styleUrl: './view-main-list.component.css',
})
export class ViewMainListComponent implements OnInit {
  #taskService = inject(TaskService);
  #listService = inject(ListService);

  tasks = this.#taskService.tasks;

  ngOnInit(): void {
    this.#listService.mainList.data$.subscribe((value) => {
      value?._id && this.tasks.update(value?._id);
    });
  }
}
