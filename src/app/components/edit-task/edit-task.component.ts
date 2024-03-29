import { Component, inject, Inject, OnDestroy } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
} from '@angular/material/dialog';
import { TaskDto } from '../../types/dto/task-dto';
import { ReactiveState } from '../../utils/reactive-state/reactive-state';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Subject, takeUntil } from 'rxjs';
import { DialogRef } from '@angular/cdk/dialog';
import { ApiService } from '../../services/base/api.service';
import { TaskService } from '../../services/task.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-edit-task',
  standalone: true,
  imports: [
    MatButtonModule,
    ReactiveFormsModule,
    MatDialogContent,
    MatInputModule,
    MatDialogActions,
    MatDialogClose,
    MatCheckboxModule,
    MatDatepickerModule,
  ],
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.css',
})
export class EditTaskComponent implements OnDestroy {
  #onDestroy = new Subject<void>();
  #dialogRef = inject(DialogRef);
  #apiService = inject(ApiService);
  #taskService = inject(TaskService);

  task = ReactiveState.create<Partial<TaskDto>>({
    defaultValue: {},
    update: (body: Partial<TaskDto>) => this.#saveOrUpdateTask(body),
  });
  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public initialData: { task: TaskDto; listId: string },
  ) {
    this.form = new FormGroup({
      title: new FormControl(
        {
          value: this.initialData?.task?.title || '',
          disabled: false,
        },
        [Validators.required],
      ),
      description: new FormControl({
        value: this.initialData?.task?.description || '',
        disabled: false,
      }),
      done: new FormControl({
        value: this.initialData?.task?.done || false,
        disabled: false,
      }),
      date: new FormControl({
        value: this.initialData?.task?.date || '',
        disabled: false,
      }),
      list: new FormControl({
        value: this.initialData?.task?.list || this.initialData.listId || '',
        disabled: false,
      }),
      _id: new FormControl({
        value: this.initialData?.task?._id || '',
        disabled: false,
      }),
    });
    this.task.isFetching$
      .pipe(takeUntil(this.#onDestroy))
      .subscribe((value) => {
        if (value) this.form.disable();
        else this.form.enable();
      });
  }

  ngOnDestroy(): void {
    this.#onDestroy.next();
    this.#onDestroy.complete();
  }

  #saveOrUpdateTask(task: Partial<TaskDto>) {
    if (this.initialData?.task?._id) {
      return this.#apiService.tasks().put(task, this.initialData.task._id);
    } else {
      const { _id, ...rest } = task;
      return this.#apiService.tasks().post(rest);
    }
  }

  submitForm() {
    if (this.form.invalid) return;
    const body = {
      title: this.form.controls['title'].value,
      description: this.form.controls['description'].value,
      done: this.form.controls['done'].value,
      date: this.form.controls['date'].value,
      list: this.form.controls['list'].value,
      _id: this.form.controls['_id'].value,
    } satisfies TaskDto;
    this.task.update(body).subscribe({
      next: () => {
        this.#dialogRef.close();
        this.#taskService.tasks.update(this.initialData.listId);
      },
    });
  }
}
