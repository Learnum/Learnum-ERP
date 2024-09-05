import { Component, OnInit } from '@angular/core';
import { ActionColumn, TableColumn } from 'src/app/shared/data-grid/model/data-grid-column.model';
import { SalaryInfoService } from './salary-info.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResponseCode } from 'src/app/core/models/responseObject.model';
import { AlertService } from 'src/app/core/services/alertService';
import { SalaryInfoModel } from './salary-info.model';
import { ActivatedRoute } from '@angular/router';
import { ConfigurationSettings } from 'src/app/core/models/configuration';

@Component({
  selector: 'app-salary-info',
  templateUrl: './salary-info.component.html',
  styleUrls: ['./salary-info.component.scss']
})
export class SalaryInfoComponent implements OnInit {

  rowSelection: 'single' | 'multiple' = 'multiple';
  isMultipleSelected: boolean = false;
  selectedUsers: any[];
  dataSource: any[];
  editable: boolean = false;
  closeable: boolean = false;
  showSearch: boolean = true;
  showStatus: boolean = true;
  showDepartment: boolean = true;
  paged: boolean = true;
  radioOptions = [
    { label: 'Detailed Entry', value: 1 },
    { label: 'Summary', value: 2 }
  ];
  selectedOption: string = 'option1';
  salaryinfomodel = new SalaryInfoModel();
  SalarySectionTypeList: any;
  SalaySectionInfo: FormGroup;
  SalaySectionInfo_form: any;
  submitted: boolean;
  salaryinformationList: any;
  userTableColumns: TableColumn[] = [
    {
      field: 'SalarySectionName',
      headerName: 'Salary Section Name',
      filter: 'agTextColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
        required: true,
      },
      minWidth: 100
    },
    {
      field: 'SalarySection',
      headerName: 'Salary Section Type',
      filter: 'agTextColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
        required: true,
      },
    },
    {
      field: 'Status',
      headerName: 'Status',
      filter: 'agTextColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
      },
    }

  ];
  userActionColumns: ActionColumn[] = [
    {
      action: 'edit',
      actionPage: 'ViewEmployee',
      actionIcon: 'uil uil-pen',
      buttonClass: 'btn  btn-secondary',
      colorClass: 'text-secondary'
    },
    {
      action: 'activate',
      actionPage: 'ViewEmployee',
      actionIcon: 'uil uil-play-circle',
      buttonClass: 'btn  btn-secondary',
      colorClass: 'text-secondary',
    },
    {
      action: 'deactivate',
      actionPage: 'ViewEmployee',
      actionIcon: 'uil uil-pause-circle',
      buttonClass: 'btn  btn-secondary',
      colorClass: 'text-secondary',
    }
  ];
  buttonTypes: null;
  data: any[];
  isDirty: boolean;
  editData: any;
  deductorId: any;

  

  constructor(private salaryInfoService:SalaryInfoService,
    private formBuilder: FormBuilder,
    private alertService:AlertService,
    private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.editData = this.activateRoute.snapshot.queryParams;
    this.deductorId = ConfigurationSettings.getDeductorId();
    this.GetSalarySectionTypeList();
    this.GetAllSalaryInformation();
    this.SalaySectionInfo = this.formBuilder.group({
      SalaryInfoId:['0'],
      EntryType: [''],
      DeductorId:[''],
      SalarySectionName: [''],
      SalarySectionTypeId: [''],
      IsActive: ['true'],
    });
    this.SalaySectionInfo_form = this.SalaySectionInfo.controls;
  }

  onRowAction(data: any) {
    let action: string = data.action;
    let salaryinfo: any = data.row;
    this.salaryinfomodel = salaryinfo;

    switch(action){
      case 'edit':
        this.SalaySectionInfo.patchValue({SalarySectionName: this.salaryinfomodel.SalarySectionName,
          EntryType: this.salaryinfomodel.EntryType,
          SalarySectionTypeId: this.salaryinfomodel.SalarySectionTypeId,
          SalaryInfoId: this.salaryinfomodel.SalaryInfoId

        });

          break;
      case "deactivate":
        this.onActiveDeactive(salaryinfo);
        break;
      case "activate":
        this.onActiveDeactive(salaryinfo);
        break;
     }
  }

  selectEmployee(employees: any) {
    if (employees.length > 0) {
      this.isMultipleSelected = true;
      this.selectedUsers = employees;
    }
    else {
      this.isMultipleSelected = false;
    }
  }
  GetSalarySectionTypeList() {

    return this.salaryInfoService.getSalarySectionTypeList().subscribe(
      result => {
        this.SalarySectionTypeList = result.Value;
        this.SalaySectionInfo.patchValue({ SalarySectionTypeId:0 });

      },
      (error: any) => {
        //this.alertService.ShowErrorMessage(error.error);
      }
    )
  }
  GetAllSalaryInformation() {

    return this.salaryInfoService.getAllSalaryInformation().subscribe(
      result => {
        this.salaryinformationList = result.Value;
      },
      (error: any) => {
        //this.alertService.ShowErrorMessage(error.error);
      }
    )
  }
  onActionButton(action: string) {
    alert(action + ' ' + 'action button clicked.');
  }

  SaveSalaryInfoData() {
    this.submitted = true;
    this.SalaySectionInfo.patchValue({DeductorId:this.deductorId})
    if(this.SalaySectionInfo.valid){
    let data = this.SalaySectionInfo.value;
      this.salaryInfoService.SaveSalaryInfoData(data).subscribe(
        (result: any) => {
          let serviceResponse = result.Value;
          if (serviceResponse == ResponseCode.Success)
          {
            this.alertService.ShowSuccessMessage("Salary Information Saved Successfully");
            this.GetAllSalaryInformation();
            
          }
          else if(serviceResponse==ResponseCode.Update)
          {
            this.alertService.ShowSuccessMessage("Salary Information Updated Successfully");
            this.GetAllSalaryInformation();


          }
          this.ResetForm();
        },
        (error: any) => {
          this.alertService.ShowErrorMessage("Please Enter Valid Details");
        }
      );
    }
    else{
      this.alertService.ShowErrorMessage("Please Enter Valid Details");


    }
    }
    onActiveDeactive(salaryinfo) {
      let salaryinfomodel = new SalaryInfoModel();
      if (salaryinfo.IsActive) {
        this.salaryinfomodel.IsActive = false;
      }
      else {
        this.salaryinfomodel.IsActive = true;
      }
      this.salaryInfoService.onActiveDeactive(this.salaryinfomodel).subscribe(
        (result: any) => {
          let serviceResponse = result.Value;
          if (serviceResponse.ResponseCode == ResponseCode.Success) {
            this.alertService.ShowSuccessMessage("Action Updated Successfully");
            this.GetAllSalaryInformation();

          }
          (error: any) => {
            this.alertService.ShowError(error, "Failed to save due to Service error");
          }

        },
        (error: any) => {
          this.alertService.ShowErrorMessage(error.error);
        }
  
      );
    }
    setEditable() {
      this.isDirty = false;
      this.paged = true;
      this.showSearch = true;
      this.showStatus = true;
      this.showDepartment = true;
      this.buttonTypes = null;
      this.closeable = false;
      this.editable = false;
      this.dataSource = this.data;
      this.dataSource.forEach(e => e.status = e.isActive ? 'Active' : 'Inactive')
    }
    ResetForm() {
      this.submitted = false;
      this.SalaySectionInfo.reset();
      this.SalaySectionInfo.patchValue({ SalarySectionTypeId:0 });

    }
    notallonumber(event)
    {
        return (
          (event.charCode >= 65 && event.charCode <= 90) || // Uppercase letters
          (event.charCode >= 97 && event.charCode <= 122) || // Lowercase letters
         (event.charCode == 32)  // Space
          
        );
      
      
    }
  }

 
