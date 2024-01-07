import { Component, inject, OnInit, signal } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { JsonPipe } from '@angular/common';
import { ListDto } from '../../types/dto/list-dto';
import { ListService } from '../../services/list.service';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { EditListComponent } from '../edit-list/edit-list.component';
import { ApiService } from '../../services/base/api.service';
import { DeleteConfirmationDirective } from '../../utils/directives/delete-confirmation.directive';

@Component({
  selector: 'app-view-list',
  standalone: true,
  imports: [
    JsonPipe,
    MatListModule,
    MatButtonModule,
    DeleteConfirmationDirective,
  ],
  templateUrl: './view-list.component.html',
  styleUrl: './view-list.component.css',
})
export class ViewListComponent implements OnInit {
  #activatedRoute = inject(ActivatedRoute);
  #router = inject(Router);
  #apiService = inject(ApiService);
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
    const id = this.currentList()?._id;
    if (id)
      this.#apiService
        .lists()
        .delete(id)
        .subscribe({
          next: () => {
            this.#listService.lists.update();
            this.#router.navigate(['']);
          },
        });
  }

  editList() {
    this.#matDialog.open(EditListComponent, {
      data: this.currentList(),
      width: '300px',
    });
  }
}
