import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WebsiteLeadsComponent } from './website-leads.component';

const routes: Routes = [
  {
    path: '',
    component: WebsiteLeadsComponent,
    children: [
      {
        path: '',
        redirectTo: 'website-leads',
        pathMatch: 'full'
      },
    ]
  },
  {
    path: 'add-website',
    loadChildren:() => import('./add-website/add-website.module').then(m => m.AddWebsiteModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebsiteLeadsRoutingModule { }
