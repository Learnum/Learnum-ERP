import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyModule } from '@ngx-formly/core';
import { ReviewUploadRoutingModule } from './review-upload-routing.module';
import { ReviewUploadComponent } from './review-upload.component';




@NgModule({
  declarations: [ReviewUploadComponent],
  imports: [
    CommonModule,
    ReviewUploadRoutingModule,
    ReactiveFormsModule,
    FormlyBootstrapModule,
    SharedModule,
    FormsModule,
    FormlyModule.forRoot(),
  ]
})
export class ReviewUploadModule { }
