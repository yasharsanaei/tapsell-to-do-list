import { inject, Injectable } from '@angular/core';
import {
  DeleteRequestConfig,
  GetByIdRequestConfig,
  GetRequestConfig,
  PostRequestConfig,
  PutRequestConfig,
} from '../../types/base/request-config';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CoreService {
  #httpClient = inject(HttpClient);

  getBody<ReturnValue = unknown>({ url }: GetRequestConfig) {
    return this.#httpClient.get<ReturnValue>(url, {
      observe: 'body',
    });
  }

  getByIdBody<ReturnValue = unknown>({ url, id }: GetByIdRequestConfig) {
    return this.#httpClient.get<ReturnValue>(`${url}/${id}`, {
      observe: 'body',
    });
  }

  postBody<ReturnValue = unknown, Body = unknown>({
    url,
    body,
  }: PostRequestConfig<Body>) {
    return this.#httpClient.post<ReturnValue>(url, body, {
      observe: 'body',
    });
  }

  patchBody<ReturnValue = unknown, Body = unknown>({
    url,
    body,
    id,
  }: PutRequestConfig<Body>) {
    return this.#httpClient.put<ReturnValue>(`${url}/${id}`, body, {
      observe: 'body',
    });
  }

  deleteById<ReturnValue = unknown>({ url, id }: DeleteRequestConfig) {
    return this.#httpClient.delete<ReturnValue>(`${url}/${id}`, {
      observe: 'body',
    });
  }
}
