import { Component, inject, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { ListService } from '../../services/list.service';
import { MatDividerModule } from '@angular/material/divider';
import { TaskListComponent } from '../task-list/task-list.component';
import { AddTaskComponent } from '../add-task/add-task.component';

@Component({
  selector: 'app-view-main-list',
  standalone: true,
  imports: [MatDividerModule, TaskListComponent, AddTaskComponent],
  templateUrl: './view-main-list.component.html',
  styleUrl: './view-main-list.component.css',
})
export class ViewMainListComponent implements OnInit {
  #taskService = inject(TaskService);
  #listService = inject(ListService);

  tasks = this.#taskService.tasks;
  mainList = this.#listService.mainList;

  ngOnInit(): void {
    this.#listService.mainList.data$.subscribe((value) => {
      value?._id && this.tasks.update(value?._id);
    });
  }

  listUpdate() {
    this.tasks.update(this.mainList.data()?._id);
  }
}
