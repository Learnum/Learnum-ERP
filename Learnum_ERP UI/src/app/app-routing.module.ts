import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



const routes: Routes = [

  {
    path: '',
    //redirectTo: ":companyName/login",
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'erp',
    loadChildren: () =>
      import('./ERP/tds.module').then(
        (m) => m.POIModule
      ),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./ERP/component/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'sign-up',
    loadChildren: () =>
      import('./ERP/component/sign-up/sign-up.module').then(
        (m) => m.SignUpModule
      ),
  },
  {
    path: 'forgot-password',
    loadChildren: () =>
      import('./ERP/component/forgot-password/forgot-password.module').then(
        (m) => m.ForgotPasswordModule
      ),
  }, 
  {
    path: 'change-password',
    //canActivate: [RouteGaurd],
    loadChildren: () =>
      import('./ERP/component/change-password/change-password.module').then(
        (m) => m.ChangePasswordModule
      ),
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
