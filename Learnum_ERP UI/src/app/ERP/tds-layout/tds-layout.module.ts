import { APP_BASE_HREF, CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AlertService } from 'src/app/core/services/alertService';
import { SharedModule } from 'src/app/shared/shared.module';
import { SanitizeHtmlPipe } from '../../shared/pipe/domsanitizer.pipe';
import { TDSLayoutRoutingModule, } from './tds-layout-routing.module';
import { TDSLayoutComponent, } from './tds-layout.component';
import { TDSLayoutService } from './tds-layout.service';


@NgModule({
  declarations: [TDSLayoutComponent],
    imports: [CommonModule, TDSLayoutRoutingModule, SharedModule, FormsModule],
  providers: [{ provide: APP_BASE_HREF, useValue: '/' }],
  exports: [],
})
export class TaxationLayoutModule {

}
