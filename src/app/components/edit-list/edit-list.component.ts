import { Component, inject, Input, OnDestroy } from '@angular/core';
import { ListDto } from '../../types/dto/list-dto';
import { MatDialogContent, MatDialogModule } from '@angular/material/dialog';
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

  list = ReactiveState.create<Partial<ListDto>>({
    defaultValue: {},
    update: (list: Partial<ListDto>) => this.#saveOrUpdateList(list),
  });
  form: FormGroup;

  @Input()
  set initialData(list: ListDto) {
    if (list) {
      this.list.set(list);
    }
  }

  constructor() {
    this.form = new FormGroup({
      title: new FormControl({ value: '', disabled: false }, [
        Validators.required,
      ]),
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
    this.list.update({ title: this.form.controls['title'].value });
  }

  #saveOrUpdateList(list: Partial<ListDto>) {
    if (list._id) {
      return this.#apiService.lists().put(list as ListDto, list._id);
    } else {
      return this.#apiService.lists().post(list as ListDto);
    }
  }
}
