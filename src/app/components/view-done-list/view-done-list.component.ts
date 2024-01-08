import { Component, inject, OnInit } from '@angular/core';
import { AddTaskComponent } from '../add-task/add-task.component';
import { MatDividerModule } from '@angular/material/divider';
import { TaskListComponent } from '../task-list/task-list.component';
import { TaskService } from '../../services/task.service';
import { ApiService } from '../../services/base/api.service';

@Component({
  selector: 'app-view-done-list',
  standalone: true,
  imports: [AddTaskComponent, MatDividerModule, TaskListComponent],
  templateUrl: './view-done-list.component.html',
  styleUrl: './view-done-list.component.css',
})
export class ViewDoneListComponent implements OnInit {
  #taskService = inject(TaskService);
  #apiService = inject(ApiService);
  tasks = this.#taskService.tasks;

  ngOnInit(): void {
    this.#getCompletedTasks();
  }

  #getCompletedTasks() {
    this.tasks.set(this.#apiService.completed().get);
  }

  listUpdate() {
    this.#getCompletedTasks();
  }
}
