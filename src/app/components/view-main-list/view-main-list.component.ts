import { Component, inject, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { ListService } from '../../services/list.service';
import { MatDividerModule } from '@angular/material/divider';
import { DeleteConfirmationDirective } from '../../utils/directives/delete-confirmation.directive';
import { MatButtonModule } from '@angular/material/button';
import { TaskListComponent } from '../task-list/task-list.component';

@Component({
  selector: 'app-view-main-list',
  standalone: true,
  imports: [
    MatDividerModule,
    DeleteConfirmationDirective,
    MatButtonModule,
    TaskListComponent,
  ],
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
}
