import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BirthdaysComponent } from './birthdays.component';

const routes: Routes = [
  {
    path: '',
    component: BirthdaysComponent,
    children:[
      {
        path:'',
        redirectTo:'birthdays',
        pathMatch:'full'
      }, 
    ]
  },
  {
    path:'add-birthday',
    loadChildren:()=>import('./add-birthday/add-birthday.module').then(m=>m.AddBirthdayModule)
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BirthdaysRoutingModule { }
