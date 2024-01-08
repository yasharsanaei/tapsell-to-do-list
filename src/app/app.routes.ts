import { Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { ViewListComponent } from './components/view-list/view-list.component';
import { ViewMainListComponent } from './components/view-main-list/view-main-list.component';
import { validateListIdGuard } from './guards/validate-list-id.guard';
import { ViewDoneListComponent } from './components/view-done-list/view-done-list.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'done-tasks',
        component: ViewDoneListComponent,
      },
      {
        path: ':id',
        component: ViewListComponent,
        canActivate: [validateListIdGuard],
      },
      {
        path: '',
        component: ViewMainListComponent,
      },
      {
        path: '**',
        pathMatch: 'full',
        redirectTo: '',
      },
    ],
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '',
  },
];
