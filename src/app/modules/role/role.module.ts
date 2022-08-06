import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListRoleComponent } from './components/list-role/list-role.component';
import { DetailRoleComponent } from './components/detail-role/detail-role.component';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { CoreModule } from 'src/app/_core/core.module';
import { RoleRoutingModule } from './role-routing.module';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { ModalFormRoleComponent } from './modals/modal-form-role/modal-form-role.component';
import { ModalAddUserToRoleComponent } from './modals/modal-add-user-to-role/modal-add-user-to-role.component';
import { AssignPermissionRoleComponent } from './components/assign-permission-role/assign-permission-role.component';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { ListUserRoleComponent } from './components/list-user-role/list-user-role.component';
import { TabPermissionsModuleComponent } from './components/tab-permissions-module/tab-permissions-module.component';
import { TabUserRoleComponent } from './components/tab-user-role/tab-user-role.component';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { ModalAssignPermissionRoleComponent } from './modals/modal-assign-permission-role/modal-assign-permission-role.component';
import { ModalListUsersComponent } from './modals/modal-list-users/modal-list-users.component';
import { TranslocoModule, TRANSLOCO_SCOPE } from "@ngneat/transloco";
@NgModule({
  declarations: [
    ListRoleComponent,
    DetailRoleComponent,
    ModalFormRoleComponent,
    ModalAddUserToRoleComponent,
    AssignPermissionRoleComponent,
    ListUserRoleComponent,
    TabPermissionsModuleComponent,
    TabUserRoleComponent,
    ModalAssignPermissionRoleComponent,
    ModalListUsersComponent
  ],
  imports: [
    CommonModule,
    NzInputModule,
    NzSelectModule,
    CoreModule,
    RoleRoutingModule,
    NzPopoverModule,
    NzDropDownModule,
    NzCheckboxModule,
    NzTabsModule,
    TranslocoModule
  ],
  providers: [{ provide: TRANSLOCO_SCOPE, useValue: "role" }],
})
export class RoleModule { }
