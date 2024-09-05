import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddContentwriterRoutingModule } from './add-contentwriter-routing.module';
import { AddContentwriterComponent } from './add-contentwriter.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyModule } from '@ngx-formly/core';


@NgModule({
  declarations: [AddContentwriterComponent],
  imports: [
    CommonModule,
    AddContentwriterRoutingModule,
    SharedModule,
    FormlyModule,
    ReactiveFormsModule,
    FormsModule,
    FormlyBootstrapModule

  ]
})
export class AddContentwriterModule { }
