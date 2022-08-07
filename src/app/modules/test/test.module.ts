import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from 'src/app/_core/core.module';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NgxPermissionsModule } from "ngx-permissions";
import { TestRoutingModule } from './test-routing.module';
import { TestIndexComponent } from './components/test-index/test-index.component';
import { ModalFormComponent } from './modals/modal-form/modal-form.component';
import { ModalDeleteComponent } from './modals/modal-delete/modal-delete.component';

@NgModule({
  declarations: [
    TestIndexComponent,
    ModalFormComponent,
    ModalDeleteComponent,
  ],
  imports: [
    CommonModule,
    TestRoutingModule,
    CoreModule,
    ReactiveFormsModule,
    NzCheckboxModule,
    NzPopoverModule,
    NzRadioModule,
    NzDropDownModule,
    NzSelectModule,
    NgxPermissionsModule.forChild()
  ],
})
export class TestModule { }
