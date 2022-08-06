import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { ClipboardModule } from 'ngx-clipboard';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import firebase
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from "../environments/environment.firebase";
// end import firebase
// transloco
import { TranslocoConfig, TranslocoModule, TRANSLOCO_CONFIG } from "@ngneat/transloco";
import { httpLoader } from "./http-loader";
// #fake-start#
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NgChartsModule } from 'ng2-charts';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { CoreModule } from './_core/core.module';
import { ModalDeleteComponent } from './_shared/modals/modal-delete/modal-delete.component';
import { NgxPermissionsModule } from "ngx-permissions";
import { TestLayoutComponent } from './_layouts/test-layout/test-layout.component';

registerLocaleData(en);
// #fake-end#

@NgModule({
  declarations: [
    AppComponent,
    ModalDeleteComponent,
    TestLayoutComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot(),
    ClipboardModule,
    AppRoutingModule,
    NgxPermissionsModule.forRoot(),
    NgbModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    NgxDaterangepickerMd.forRoot(),
    NgChartsModule,
    CKEditorModule,
    CoreModule,
    TranslocoModule
  ],
  providers: [
    httpLoader,
    {
      provide: TRANSLOCO_CONFIG,
      useValue: {
        availableLangs: ["en", "vi"],
        reRenderOnLangChange: true,
        fallbackLang: "en",
        defaultLang: localStorage.getItem("language") || "vi",
      } as TranslocoConfig,
    },
  ],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule { }
