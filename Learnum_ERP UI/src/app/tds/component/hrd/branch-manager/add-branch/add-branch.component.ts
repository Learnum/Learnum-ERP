import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { AlertService } from 'src/app/core/services/alertService';
import { MessageService } from 'src/app/core/services/message.service';

@Component({
  selector: 'app-add-branch',
  templateUrl: './add-branch.component.html',
  styleUrls: ['./add-branch.component.scss']
})
export class AddBranchComponent implements OnInit {

  form = new FormGroup({});
  //employeeDetails: EmployeeDetails = new EmployeeDetails();
  reasonList: any[] = [];
  fields: FormlyFieldConfig[];
  options: FormlyFormOptions = {};
  editData: any;
  tdsReturnList: any;
  GetEmployeeList: any;
  coOwners: any;
  NowDate: any = new Date();
employeeDetails: any;
 
  constructor(
   // private addEmployeeService: AddEmployeeService,
    private router: Router,
    private alertService: AlertService,
    private messageService: MessageService,
    private activateRoute: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.setParameter();
    //this.getReason();
    this.createForm();
    this.editData = this.activateRoute.snapshot.queryParams;
    if (this.editData.source === 'edit' && this.editData.EmployeeDetailId) {
     // this.getEmployeeDetails(this.editData.EmployeeDetailId);
    }
    
  }
  createForm(): void {
    this.form = this.fb.group({
      BranchManagerName: ['', Validators.required], 
      BranchName: ['', Validators.required], 
      status: ['', Validators.required], 

      
    });
  }


  
  


setParameter() {
    this.fields = [
      {
        fieldGroupClassName: 'row card-body p-2',
        // key: 'ITDPreEmploymentSalModel',
        fieldGroup: [

          {
            className: 'col-md-3',
            type: 'select',
            key: 'BranchManagerName',
            templateOptions: {
              placeholder: 'select',
              type: 'text',
              label: "Branch Manager Name",
              required: true,
          
            },
            },
          {
            className: 'col-md-3',
            type: 'select',
            key: 'BranchName',
            props: { 
              placeholder: 'select',
              type: 'text',
              label: "BranchName",
              required: true,
              
            },
          },
         {
            className: 'col-md-3',
            type: 'select',
            key: 'status',
            props: {
              placeholder: 'Select',
              required: true,
              valueProp: 'value',
              labelProp: 'label',
              label: "status",
            },
          }, 
         ],
      },
    ]
  }

  onCancleClick() {
    this.router.navigateByUrl('tds/tds-return/employee');
  }

  get f()
  {
    return this.form.controls;
  }

  onSubmit():void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
     // this.insertAddEmployee();
      this.GetEmployeeList();
    }
    else {
      this.alertService.ShowErrorMessage('Please fill in all required fields.');
    }
  }

  // insertAddEmployee() {
  //   this.employeeDetails.AddedBy = 1;
  //   this.employeeDetails.AddedDate = new Date();
  //   this.employeeDetails.UpdatedBy = 1;
  //   this.employeeDetails.UpdatedDate = new Date();
  //   this.employeeDetails.IsActive = true;

  //   this.addEmployeeService.insertEmployeeData(this.employeeDetails).subscribe(
  //     (result: any) => {
  //       let serviceResponse = result.Value
  //       if (result.Value === ResponseCode.Success) {
  //         this.alertService.ShowSuccessMessage(this.messageService.savedSuccessfully);

  //       }
  //       else if (serviceResponse == ResponseCode.Update) {
  //         this.alertService.ShowSuccessMessage(this.messageService.updateSuccessfully);
  //       }
  //       else {
  //         this.alertService.ShowErrorMessage(this.messageService.serviceError);
  //       }
  //     },
  //     (error: any) => {
  //       this.alertService.ShowErrorMessage("Enter all required fields");
  //     }
  //   )
  //   this.router.navigateByUrl('tds/tds-return/employee');
  // }




}
