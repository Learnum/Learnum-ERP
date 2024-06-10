import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrainerComponent } from './trainer.component';

const routes: Routes = [
  {
    path: '',
    component: TrainerComponent,
    children:[
      {
        path:'',
        redirectTo:'trainer',
        pathMatch:'full'
      }, 
    ]
  },
  {
    path:'add-trainer',
    loadChildren:()=>import('./add-trainer/add-trainer.module').then(m=>m.AddTrainerModule)
  },
];
  
  


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrainerRoutingModule { }
