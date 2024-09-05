import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResponsiblePersonInfoComponent } from './responsible-person-info.component';

const routes: Routes = [
  {
    path: '',
    component: ResponsiblePersonInfoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResponsiblePersonInfoRoutingModule { }
