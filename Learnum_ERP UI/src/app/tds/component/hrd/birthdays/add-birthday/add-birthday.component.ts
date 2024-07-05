import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { ResponseCode } from 'src/app/core/models/responseObject.model';
import { AlertService } from 'src/app/core/services/alertService';
import { MessageService } from 'src/app/core/services/message.service';

@Component({
  selector: 'app-add-birthday',
  templateUrl: './add-birthday.component.html',
  styleUrls: ['./add-birthday.component.scss']
})
export class AddBirthdayComponent implements OnInit {

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
  birthdayDetails: any;
  addBirthdayService: any;
 
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
    // this.createForm();
    this.editData = this.activateRoute.snapshot.queryParams;
    if (this.editData.source === 'edit' && this.editData.EmployeeDetailId) {
   //   this.getEmployeeDetails(this.editData.EmployeeDetailId);
    }
    
  }
  


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
            type: 'input',
            key: 'Name',
            templateOptions: {
              placeholder: 'Enter Name',
              type: 'text',
              label: "Name",
              required: true,
            },
          },
          {
            className: 'col-md-4',
            type: 'input',
            key: 'Email',
            props: {
              placeholder: 'Enter Email',
              type: 'text',
              label: "Email",
              required: true,
            },
            validation: {
              messages: {
                required: 'Email is required',
                pattern: 'Please enter a valid Email ',
              },
            },
          },
          {
            className: 'col-md-4',
            type: 'input',
            key: 'DateofBirth',
            templateOptions: {
              label: 'Date of Birth',
              placeholder: 'Enter Date',
              type: 'date',
              required: true,
              attributes: {
                max: formatDate(this.NowDate, 'YYYY-MM-dd', 'en-IN'),
              },

            },
            validation: {
              messages: {
                required: 'This field is required',
              },
            },
          },
          {
            className: 'col-md-4',
            type: 'input',
            key:'Day',
            props: {
              placeholder: 'Enter Day',
              type: 'text',
              label: "Day",
              required: true,
            },
          },
          {
            className: 'col-md-4',
            type: 'input',
            key: 'Month',
            props: {
              placeholder: 'Enter Month',
              type: 'text',
              label: "Month",
              required: true,
            },
          },
          {
            className: 'col-md-4',
            type: 'select',
            key: 'Status',
            props: {
              placeholder: 'status',
              
              type: 'text',
              label: "Status",
              required: true,
              options: [
                { value: 'Active', label: 'Active' },
                { value: 'Inactive', label: 'Inactive' }
              ]
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

  insertAddBirthday() {
    this.birthdayDetails.AddedBy = 1;
    this.birthdayDetails.AddedDate = new Date();
    this.birthdayDetails.UpdatedBy = 1;
    this.birthdayDetails.UpdatedDate = new Date();
    this.birthdayDetails.IsActive = true;

    this.addBirthdayService.insertBirthdayData(this.birthdayDetails).subscribe(
      (result: any) => {
        let serviceResponse = result.Value;
        if (serviceResponse === ResponseCode.Success) {
          this.alertService.ShowSuccessMessage(this.messageService.savedSuccessfully);
        } else if (serviceResponse == ResponseCode.Update) {
          this.alertService.ShowSuccessMessage(this.messageService.updateSuccessfully);
        } else {
          this.alertService.ShowErrorMessage(this.messageService.serviceError);
        }
      },
      (error: any) => {
        this.alertService.ShowErrorMessage("Enter all required fields");
      }
    );
    this.router.navigateByUrl('tds/tds-return/employee');
  }

}
