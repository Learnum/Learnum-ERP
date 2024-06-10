import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { ContentWriterRoutingModule } from './content-writer-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyModule } from '@ngx-formly/core';
import { ContentWriterComponent } from './content-writer.component';

@NgModule({
  declarations: [
    ContentWriterComponent,
  ],
  imports: [
    CommonModule,
    ContentWriterRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    FormlyBootstrapModule,
    FormlyModule

  ]
})
export class ContentWriterModule { }
