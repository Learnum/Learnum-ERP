import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentWriterComponent } from './content-writer.component';

const routes: Routes = [
  {
    path: '',
    component: ContentWriterComponent,
    children:[
      {
        path:'',
        redirectTo:'content-writer',
        pathMatch:'full',
      }, 
    ]
  },
  {
    path:'add-contentwriter',
    loadChildren:()=>import('./add-contentwriter/add-contentwriter.module').then(m=>m.AddContentwriterModule)
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContentWriterRoutingModule { }
