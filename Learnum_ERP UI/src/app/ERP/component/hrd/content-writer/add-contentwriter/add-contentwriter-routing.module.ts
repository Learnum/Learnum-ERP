import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddContentwriterComponent } from './add-contentwriter.component';

const routes: Routes = [
  {
    path:'',
    component:AddContentwriterComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddContentwriterRoutingModule { }
