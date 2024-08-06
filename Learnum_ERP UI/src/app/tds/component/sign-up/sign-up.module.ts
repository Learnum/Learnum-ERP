import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignUpRoutingModule } from './sign-up-routing.module';
import { SignUpComponent } from './sign-up.component';
import { LoginService } from '../login/login.service';
import { SignUpService } from './sign-up.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { RedirectService } from 'src/app/core/services/redirect.service';

@NgModule({
  declarations: [SignUpComponent],
  imports: [CommonModule, ReactiveFormsModule,FormsModule, SignUpRoutingModule,SharedModule],
  providers: [SignUpService,LoginService,RedirectService],
})
export class SignUpModule { }
