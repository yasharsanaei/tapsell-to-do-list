import { Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { ViewListComponent } from './components/view-list/view-list.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: ':id',
        component: ViewListComponent,
      },
    ],
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '',
  },
];
