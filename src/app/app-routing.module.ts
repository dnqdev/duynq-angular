import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComponentExampleComponent } from './_shared/components/component-example/component-example.component';
import { TestLayoutComponent } from './_layouts/test-layout/test-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: TestLayoutComponent,
    children: [
      {
        path: 'user',
        loadChildren: () => import('./modules/user/user.module').then((m) => m.UserModule)
      }
    ],
  },

  { path: 'compo-example', component: ComponentExampleComponent },

  { path: '**', redirectTo: 'error/404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
