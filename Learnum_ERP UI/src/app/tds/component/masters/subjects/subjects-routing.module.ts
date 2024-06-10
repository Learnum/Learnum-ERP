import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubjectsComponent } from './subjects.component';

const routes: Routes = [
  {
    path: '',
    component: SubjectsComponent,
    children:[
      {
        path:'',
        redirectTo:'subjects',
        pathMatch:'full'
      }, 
    ]
  },
  {
    path:'add-subjects',
    loadChildren:()=>import('./add-subjects/add-subjects.module').then(m=>m.AddSubjectsModule)
    
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubjectsRoutingModule { }
