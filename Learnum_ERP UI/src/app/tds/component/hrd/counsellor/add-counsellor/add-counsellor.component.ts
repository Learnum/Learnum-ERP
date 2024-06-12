import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { AlertService } from 'src/app/core/services/alertService';
import { MessageService } from 'src/app/core/services/message.service';

@Component({
  selector: 'app-add-counsellor',
  templateUrl: './add-counsellor.component.html',
  styleUrls: ['./add-counsellor.component.scss']
})
export class AddCounsellorComponent {
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
    //private addEmployeeService: AddEmployeeService,
    private router: Router,
    private alertService: AlertService,
    private messageService: MessageService,
    private activateRoute: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.setParameter();
  //  this.getReason();
    this.createForm();
    this.editData = this.activateRoute.snapshot.queryParams;
    if (this.editData.source === 'edit' && this.editData.EmployeeDetailId) {
   //   this.getEmployeeDetails(this.editData.EmployeeDetailId);
    }
    
  }
  createForm(): void {
    this.form = this.fb.group({
      CounsellorName: ['', Validators.required], 
      BranchName: ['', Validators.required], 
      Status: ['', Validators.required], 
      
    });
  }


  // getReason() {
  //   this.addEmployeeService.getReason().subscribe(
  //     (result: any) => {
  //       this.reasonList = result.Value;
  //       this.setParameter();
  //     },
  //     (error) => {
  //       // Handle error
  //     }
  //   );
  // }

  // getEmployeeDetails(EmployeeDetailId: number) {
  //   this.addEmployeeService.getEmployeeDetails(EmployeeDetailId).subscribe(
  //     (result: any) => {
  //       if (result && result.Value && result.Value.Item1) {
  //         this.employeeDetails = result.Value.Item1;
          
  //         //DateofPayment && DateOfDeduction
  //         this.employeeDetails.DateOfPayment = this.addEmployeeService.formatDate(this.employeeDetails.DateOfPayment);
  //         this.employeeDetails.DateOfDeduction = this.addEmployeeService.formatDate(this.employeeDetails.DateOfDeduction);

  //         this.setParameter();
  //       } else {
  //         console.error('No data found for EmployeeDetailId: ' + EmployeeDetailId);

  //       }
  //     },
  //     (error: any) => {
  //       console.error('Error retrieving employee details:', error);

  //       if (error && error.status === 404) {
  //         console.error('Employee not found.');

  //       } else {
  //         console.error('An unexpected error occurred. Please try again later.');

  //       }
  //     }
  //   );
  // }


setParameter() {
    this.fields = [
      {
        fieldGroupClassName: 'row card-body p-2',
        // key: 'ITDPreEmploymentSalModel',
        fieldGroup: [

          {
            className: 'col-md-4',
            type: 'select',
            key: 'CounsellorName',
            templateOptions: {
              placeholder: 'select',
              type: 'text',
              label: "Counsellor Name",
              required: true,
            },
            },
            {
              className: 'col-md-4',
              type: 'select',
              key: 'BranchName',
              templateOptions: {
                placeholder: 'select',
                type: 'text',
                label: "Branch Name",
                required: true,
              },
              },
              {
                className: 'col-md-4',
                type: 'select',
                key: 'Status',
                templateOptions: {
                  placeholder: 'select',
                  type: 'text',
                  label: "Status",
                  required: true,
                },
                },
                
        ],
      },
    ]
  }

  onCancleClick() {
    this.router.navigateByUrl('tds/hrd/counsellor');
  }

  get f()
  {
    return this.form.controls;
  }

  onSubmit():void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
    //  this.insertAddEmployee();
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
