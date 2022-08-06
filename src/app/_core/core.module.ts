import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { LoadingComponent } from '../_shared/components/loading/loading.component';
import { PaginationComponent } from '../_shared/components/pagination/pagination.component';
import { FormatTimePipe } from '../_shared/pipe/format-time.pipe';
import { SubstringPipe } from '../_shared/pipe/substring.pipe';
import { OverlayModule } from '@angular/cdk/overlay';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { SingleDatePickerComponent } from '../_shared/components/single-date-picker/single-date-picker.component';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { NgxPermissionsModule } from "ngx-permissions";
import { TRANSLOCO_SCOPE, TranslocoModule } from '@ngneat/transloco';
@NgModule({
  declarations: [
    LoadingComponent,
    PaginationComponent,
    FormatTimePipe,
    SubstringPipe,
    SingleDatePickerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbPaginationModule,
    OverlayModule,
    NzNotificationModule,
    NgxDaterangepickerMd,
    TranslocoModule,
    NgxPermissionsModule.forChild()
  ],
  exports: [
    LoadingComponent,
    PaginationComponent,
    FormatTimePipe,
    SubstringPipe,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbPaginationModule,
    OverlayModule,
    NzNotificationModule,
    SingleDatePickerComponent,
    NgxPermissionsModule
  ],
  providers: [
    { provide: TRANSLOCO_SCOPE, useValue: '' }
  ]
})
export class CoreModule {}
