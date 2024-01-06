import { signal, Signal, WritableSignal } from '@angular/core';
import { isObservable, Observable } from 'rxjs';
import { isPromise } from 'rxjs/internal/util/isPromise';
import { toObservable } from '@angular/core/rxjs-interop';

type FetcherFunction<T> = (data: any) => Observable<T> | Promise<T> | T;
type UpdateFunction<T> = (data: T) => Observable<T> | Promise<T> | T;

type ReactiveStateInit<T> = {
  defaultValue: T;
  isFetching?: boolean;
  isSuccess?: boolean;
  isError?: boolean;
  update?: FetcherFunction<T>;
};

export class ReactiveState<T> {
  get isError(): Signal<boolean> {
    return this.#isError.asReadonly();
  }

  get isSuccess(): Signal<boolean> {
    return this.#isSuccess.asReadonly();
  }

  get isFetching(): Signal<boolean> {
    return this.#isFetching.asReadonly();
  }

  get data(): Signal<T | undefined> {
    return this.#data.asReadonly();
  }

  readonly #updateFn?: FetcherFunction<T>;

  readonly #data: WritableSignal<T>;
  readonly #isFetching: WritableSignal<boolean>;
  readonly #isSuccess: WritableSignal<boolean>;
  readonly #isError: WritableSignal<boolean>;

  readonly data$: Observable<T>;
  readonly isFetching$: Observable<boolean>;
  readonly isSuccess$: Observable<boolean>;
  readonly isError$: Observable<boolean>;

  protected constructor({
    defaultValue,
    isFetching,
    isSuccess,
    isError,
    update,
  }: ReactiveStateInit<T>) {
    this.#updateFn = update;
    this.#data = signal(defaultValue);
    this.#isFetching = signal(isFetching || false);
    this.#isSuccess = signal(isSuccess || false);
    this.#isError = signal(isError || false);
    this.data$ = toObservable(this.#data);
    this.isFetching$ = toObservable(this.#isFetching);
    this.isSuccess$ = toObservable(this.#isSuccess);
    this.isError$ = toObservable(this.#isError);
  }

  #onSuccess(value: T) {
    this.#data.set(value);
    this.#isFetching.set(false);
    this.#isSuccess.set(true);
    this.#isError.set(false);
  }

  #onError(e: unknown) {
    this.#isFetching.set(false);
    this.#isSuccess.set(false);
    this.#isError.set(true);
    console.error('Error on updating ReactiveState: ', e);
  }

  #setDataWithMutateFn(mutateFn: FetcherFunction<T>, args: any) {
    this.#isFetching.set(true);
    this.#isSuccess.set(false);
    this.#isError.set(false);
    if (isObservable(mutateFn(args))) {
      (mutateFn(args) as Observable<T>).subscribe({
        next: (v) => this.#onSuccess(v),
        error: (e) => this.#onError(e),
      });
    } else if (isPromise(mutateFn(args))) {
      (mutateFn(args) as Promise<T>)
        .then((v) => this.#onSuccess(v))
        .catch((e) => this.#onError(e));
    } else {
      try {
        this.#onSuccess(mutateFn(args) as T);
      } catch (e) {
        this.#onError(e);
      }
    }
  }

  update = (args?: any) => {
    if (this.#updateFn) this.#setDataWithMutateFn(this.#updateFn, args);
    else
      console.error(
        `'update' method neither return a callback or a value, Are you sure you assigned a 'updateFn'? If you want to return a value to assign it to the state's data use 'set'`,
      );
  };

  set = (value: UpdateFunction<T> | T) => {
    if (isCallback(value)) {
      this.#setDataWithMutateFn(value as UpdateFunction<T>, this.#data());
    } else {
      try {
        this.#onSuccess(value as T);
      } catch (e) {
        this.#onError(e);
      }
    }
  };

  static create<T>(initialData: ReactiveStateInit<T>) {
    return new ReactiveState<T>(initialData);
  }
}

function isCallback<T>(maybeFunc: T | unknown): maybeFunc is T {
  return typeof maybeFunc === 'function';
}
