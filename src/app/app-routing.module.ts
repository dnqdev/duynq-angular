import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestLayoutComponent } from './_layouts/test-layout/test-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: TestLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./modules/test/test.module').then((m) => m.TestModule)
      },
    ],

  },

  { path: '**', redirectTo: 'error/404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
