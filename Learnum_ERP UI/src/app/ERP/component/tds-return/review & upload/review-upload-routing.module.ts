import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReviewUploadComponent } from './review-upload.component';

const routes: Routes = [
    {
      path: '',
      component: ReviewUploadComponent,
    },
  ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
export class ReviewUploadRoutingModule {}