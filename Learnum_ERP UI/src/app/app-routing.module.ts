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
    path: 'tds',
    loadChildren: () =>
      import('./tds/tds.module').then(
        (m) => m.POIModule
      ),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./tds/component/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'sign-up',
    loadChildren: () =>
      import('./tds/component/sign-up/sign-up.module').then(
        (m) => m.SignUpModule
      ),
  },
  {
    path: 'forgot-password',
    loadChildren: () =>
      import('./tds/component/forgot-password/forgot-password.module').then(
        (m) => m.ForgotPasswordModule
      ),
  }, 
  {
    path: 'change-password',
    //canActivate: [RouteGaurd],
    loadChildren: () =>
      import('./tds/component/change-password/change-password.module').then(
        (m) => m.ChangePasswordModule
      ),
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
