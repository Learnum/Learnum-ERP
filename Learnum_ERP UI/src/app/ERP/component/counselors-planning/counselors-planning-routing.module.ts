import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CounselorsPlanningComponent } from './counselors-planning.component';

const routes: Routes = [
  {
    path:'',
    component:CounselorsPlanningComponent,
    children:[
      {
        path: '',
        redirectTo: 'trainers-planning',
        pathMatch: 'full'
      },
      {
        path: 'trainers-planning',
        loadChildren: () =>
          import('./trainers-planning/trainers-planning.module').then(m => m.TrainersPlanningModule),
      },
      {
        path: 'batches-planning',
        loadChildren: () =>
          import('./batches-planning/batches-planning.module').then(m => m.BatchesPlanningModule),
      },
    ] 
  },
  {
    path: 'add-trainers',
    loadChildren: () =>
      import('./trainers-planning/add-trainers/add-trainers.module').then(m => m.AddTrainersModule),
  },
  {
    path: 'add-batch',
    loadChildren: () =>
      import('./batches-planning/add-batch/add-batch.module').then(m => m.AddBatchModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CounselorsPlanningRoutingModule { }
