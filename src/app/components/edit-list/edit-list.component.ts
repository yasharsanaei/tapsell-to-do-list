import { Component, Inject, inject, OnDestroy } from '@angular/core';
import { ListDto } from '../../types/dto/list-dto';
import {
  MAT_DIALOG_DATA,
  MatDialogContent,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { DialogRef } from '@angular/cdk/dialog';
import { MatButtonModule } from '@angular/material/button';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ReactiveState } from '../../utils/reactive-state/reactive-state';
import { ApiService } from '../../services/base/api.service';
import { Subject, takeUntil } from 'rxjs';
import { ListService } from '../../services/list.service';

@Component({
  selector: 'app-edit-list',
  standalone: true,
  imports: [
    MatDialogModule,
    MatDialogContent,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './edit-list.component.html',
  styleUrl: './edit-list.component.css',
})
export class EditListComponent implements OnDestroy {
  #onDestroy = new Subject<void>();
  #dialogRef = inject(DialogRef);
  #apiService = inject(ApiService);
  #listService = inject(ListService);

  list = ReactiveState.create<Partial<ListDto>>({
    defaultValue: {},
    update: (list: Partial<ListDto>) => this.#saveOrUpdateList(list),
  });
  form: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public initialData: ListDto) {
    if (this.initialData) this.list.set(this.initialData);
    this.form = new FormGroup({
      title: new FormControl(
        { value: this.list.data()?.title || '', disabled: false },
        [Validators.required],
      ),
      _id: new FormControl({
        value: this.list.data()?._id || '',
        disabled: false,
      }),
    });
    this.list.isFetching$
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

  closeDialog() {
    this.#dialogRef.close();
  }

  submitForm() {
    if (this.form.invalid) return;
    this.list
      .update({
        title: this.form.controls['title'].value,
        _id: this.form.controls['_id'].value,
      })
      .subscribe({
        next: () => {
          this.#dialogRef.close();
          this.#listService.lists.update();
        },
      });
  }

  #saveOrUpdateList(list: Partial<ListDto>) {
    if (list._id) {
      return this.#apiService.lists().put(list as ListDto, list._id);
    } else {
      return this.#apiService.lists().post(list as ListDto);
    }
  }
}
