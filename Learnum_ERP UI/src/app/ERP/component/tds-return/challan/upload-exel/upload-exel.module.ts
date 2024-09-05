import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyModule } from '@ngx-formly/core';
import { UploadExelComponent } from './upload-exel.component';
import { UploadExelRoutingModule } from './upload-exel-routing.module';
import { NgxFileDropModule } from 'ngx-file-drop';
import { UploadService } from './upload-exel.service';

@NgModule({
  declarations: [UploadExelComponent],
  imports: [
    CommonModule,
    UploadExelRoutingModule,
    ReactiveFormsModule,
    FormlyBootstrapModule,
    NgxFileDropModule,
    SharedModule,
    FormsModule,
    FormlyModule.forRoot(),
  ],
  providers: [ UploadService ]

  
})
export class UploadExelModule { }
