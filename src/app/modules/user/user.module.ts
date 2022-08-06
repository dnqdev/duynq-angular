import { UserRoutingModule } from './user-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from 'src/app/_core/core.module';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { TranslocoModule, TRANSLOCO_SCOPE } from "@ngneat/transloco";
import { NgxPermissionsModule } from "ngx-permissions";
import { UserIndexComponent } from './components/user-index/user-index.component';
import { ModalChangePasswordComponent } from './modals/modal-change-password/modal-change-password.component';

@NgModule({
  declarations: [
    UserIndexComponent,
    ModalChangePasswordComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    CoreModule,
    ReactiveFormsModule,
    NzCheckboxModule,
    NzPopoverModule,
    NzRadioModule,
    NzDropDownModule,
    NzSelectModule,
    TranslocoModule,
    NgxPermissionsModule.forChild()
  ],
  providers: [{ provide: TRANSLOCO_SCOPE, useValue: "user" }],
})
export class UserModule { }
