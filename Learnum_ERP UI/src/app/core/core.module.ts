import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CookieService } from 'ngx-cookie-service';


import { RouteGuard } from './services/routeGuard';
import { AlertService } from './services/alertService';
//import { APIService } from './services/apiService';
import { BaseService } from './services/baseService';
import { AuthInterceptor } from './services/authInterceptor';
import { StateService } from './services/state-service.service';
import { UserProfileService } from './services/user-profile.service';
import { EnsureModuleLoadedOnceGuard } from './services/ensureModuleLoadedOnceGuard';
import { CoreLoadingScreenService } from './services/loading-screen.service';
//import { eTaxManagerAlertService } from './services/ITSoftAlertService';


@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [CommonModule, FormsModule, ReactiveFormsModule],

  declarations: [],

  providers: [
    AlertService,
    StateService,
    UserProfileService,
    CookieService, BaseService,
    //eTaxManagerAlertService,
    CoreLoadingScreenService,
    RouteGuard,
    {
      provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true
    },
  ],
})
export class CoreModule extends EnsureModuleLoadedOnceGuard {
  //Ensure that CoreModule is only loaded into AppModule

  //Looks for the module in the parent injector to see if it's already been loaded (only want it loaded once)
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    super(parentModule);
  }
}

