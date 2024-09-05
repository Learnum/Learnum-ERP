import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { AgGridAngular } from "ag-grid-angular";
import { ColDef, GridApi, GridReadyEvent, StatusPanelDef } from "ag-grid-community";
import { Subscription } from "rxjs";

// import { ConfigurationSettings } from "src/app/core/models/configuration";
// import { ResponseCode } from "src/app/core/models/responseObject.model";
// import { AlertService } from "src/app/core/services/alertService";
// import { MessageService } from "src/app/core/services/message.service";
// import { ExcelExportService } from "src/app/shared/excel-export/excel-export.service";
// import { EmployeePersonalInfoModel } from "src/app/shared/Models/employee-personal-info.model";
// import { EmployeeSearchParameterModel } from "src/app/shared/Models/employee-search.model";
// import { ExcelExportColumnModel } from "src/app/shared/Models/excel-export-column.model";
// import { EmployerService } from "../employer.service";
// import { ViewUpdateEmployeeService } from "./view-update-employee.service";


@Component({
  selector: 'deductor-details',
  templateUrl: './deductor-details.component.html',
  styleUrls: ['./deductor-details.component.scss'],
})
export class DeductorDetailsComponent {

  constructor(){

  }
  ngOnInit(): void {
    
  }
}
