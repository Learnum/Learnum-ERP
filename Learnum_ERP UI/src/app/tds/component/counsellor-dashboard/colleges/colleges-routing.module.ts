import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CollegesComponent } from './colleges.component';

const routes: Routes = [
  {
    path: '',
    component: CollegesComponent,
    children: [
      {
        path: '',
        redirectTo: 'collegs',
        pathMatch: 'full'
      },
    ],   
  },
  {
    path: 'add-collegs',
    loadChildren:() => import('./add-collegs/add-collegs.module').then(m => m.AddCollegsModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CollegesRoutingModule { }
