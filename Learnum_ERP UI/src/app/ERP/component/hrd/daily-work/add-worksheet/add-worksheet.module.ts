import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddWorksheetRoutingModule } from './add-worksheet-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyModule } from '@ngx-formly/core';
import { AddWorksheetComponent } from './add-worksheet.component';

@NgModule({
  declarations: [AddWorksheetComponent],
  imports: [
    CommonModule,
    AddWorksheetRoutingModule,
    SharedModule,
    FormlyModule,
    FormsModule,
    ReactiveFormsModule,
    FormlyBootstrapModule
  ]
})
export class AddWorksheetModule { }
