import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { inject } from '@angular/core';
import { ListService } from '../services/list.service';
import { Observable } from 'rxjs';

export const validateListIdGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const listService = inject(ListService);
  const lists = listService.lists;
  let tryCount = 0;
  return new Observable<boolean | UrlTree>((observer) => {
    listService.lists.isSuccess$.subscribe((value) => {
      if (value) {
        if (lists.data()?.some((d) => d._id == route.paramMap.get('id')))
          observer.next(true);
        else observer.next(router.createUrlTree(['']));
        observer.complete();
      } else {
        if (!listService.lists.isFetching())
          if (tryCount < 3) {
            tryCount++;
            listService.lists.update();
          } else {
            observer.next(router.createUrlTree(['']));
            observer.complete();
          }
      }
    });
  });
};
