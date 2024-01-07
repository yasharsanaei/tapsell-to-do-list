import { Component, inject, OnInit, signal } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { ActivatedRoute } from '@angular/router';
import { JsonPipe } from '@angular/common';
import { ListDto } from '../../types/dto/list-dto';
import { ListService } from '../../services/list.service';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { EditListComponent } from '../edit-list/edit-list.component';

@Component({
  selector: 'app-view-list',
  standalone: true,
  imports: [JsonPipe, MatListModule, MatButtonModule],
  templateUrl: './view-list.component.html',
  styleUrl: './view-list.component.css',
})
export class ViewListComponent implements OnInit {
  #activatedRoute = inject(ActivatedRoute);
  #taskService = inject(TaskService);
  #listService = inject(ListService);
  #matDialog = inject(MatDialog);

  tasks = this.#taskService.tasks;
  currentList = signal<ListDto | undefined>(undefined);

  ngOnInit(): void {
    this.#activatedRoute.paramMap.subscribe((value) => {
      if (value.has('id')) {
        this.tasks.update(value.get('id'));
        this.currentList.set(
          this.#listService.lists.data().find((d) => d._id == value.get('id')),
        );
      }
    });
  }

  deleteList() {
    //   TODO: delete list
  }

  editList() {
    this.#matDialog.open(EditListComponent, {
      data: this.currentList(),
      width: '300px',
    });
  }
}
