
import { HttpClientModule } from '@angular/common/http';
import { NgModule,} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { APP_BASE_HREF, CommonModule } from '@angular/common';

import { ToastrModule } from 'ngx-toastr';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
//import { PoiUploadDocumentsModule } from './poi/component/employee/poi/poi-upload-documents/poi-upload-documents.module';
//import { BranchesModule } from './tds/component/masters/branches/branches.module';

declare global {
  interface Navigator {
      msSaveBlob?: (blob: any, defaultName?: string) => boolean
  }
}
if (navigator.msSaveBlob) {
  // use navigator.msSaveBlob
}
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AppRoutingModule,
    //BranchesModule,
    HttpClientModule,
    CoreModule,
    //PoiUploadDocumentsModule,
    

    ToastrModule.forRoot({
      timeOut: 15000, // 15 seconds
      closeButton: true,
      progressBar: true,
      positionClass: "toast-top-center",
    }),
  ],
  exports: [FormsModule, 
    ReactiveFormsModule,],
  providers: [{ provide: APP_BASE_HREF, useValue: '/' },],
  bootstrap: [AppComponent],
  
})
export class AppModule { }

