import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { DATA_PERMISSION } from 'src/app/_shared/utils/constant';
import { AssignPermissionRoleComponent } from './components/assign-permission-role/assign-permission-role.component';
import { DetailRoleComponent } from './components/detail-role/detail-role.component';
import { ListRoleComponent } from './components/list-role/list-role.component';
import { ListUserRoleComponent } from './components/list-user-role/list-user-role.component';


const routes: Routes = [
  {
    path: '',
    component: ListRoleComponent,
    // canActivate: [NgxPermissionsGuard],
    // data: {
    //   permissions: {
    //     only: [DATA_PERMISSION.role_view],
    //     redirectTo: "/accessdenied",
    //   },
    // },
  },
  {
    path: ':id',
    component: DetailRoleComponent,
    // canActivate: [NgxPermissionsGuard],
    // data: {
    //   permissions: {
    //     only: [DATA_PERMISSION.role_view],
    //     redirectTo: "/accessdenied",
    //   },
    // },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoleRoutingModule {}
