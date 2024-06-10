import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DailyWorkComponent } from './daily-work.component';

const routes: Routes = [
  {
    path: '',
    component: DailyWorkComponent,
    children:[
      {
        path:'',
        redirectTo:'daily-work',
        pathMatch:'full'
      }, 
    ]
  },
  {
    path:'add-worksheet',
    loadChildren:()=>import('./add-worksheet/add-worksheet.module').then(m=>m.AddWorksheetModule)
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DailyWorkRoutingModule { }
