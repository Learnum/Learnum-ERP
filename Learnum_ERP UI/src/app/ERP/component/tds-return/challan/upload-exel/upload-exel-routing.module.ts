import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadExelComponent } from './upload-exel.component';

const routes: Routes = [
    {
      path: '',
      component: UploadExelComponent,
    },
  ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
export class UploadExelRoutingModule {}