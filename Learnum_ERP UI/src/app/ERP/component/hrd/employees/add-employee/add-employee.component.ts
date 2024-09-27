import { Component, OnInit } from '@angular/core';
import { EmployeeService } from './employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/core/services/alertService';
import { MessageService } from 'src/app/core/services/message.service';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { EmployeeDetailsModel } from './employee.model';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { ResponseCode } from 'src/app/core/models/responseObject.model';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {
  
  form = new FormGroup({});
  employeeDetails: EmployeeDetailsModel = new EmployeeDetailsModel();
  fields: FormlyFieldConfig[];
  options: FormlyFormOptions = {};
  GetEmployeeList: any;
  NowDate: any = new Date();
  editData: any;

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private alertService: AlertService,
    private messageService: MessageService,
    private activateRoute: ActivatedRoute,
    private fb: FormBuilder,
    private http: HttpClient
  ) { }
 

  ngOnInit(): void {
    this.setParameter();  
    this.editData = this.activateRoute.snapshot.queryParams;
    if (this.editData.source === 'edit' && this.editData.EmployeeDetailId) {
      this.getEmployeeDetails(this.editData.EmployeeDetailId);
    }
  }

  setParameter() {
    this.fields = [
      {
        fieldGroupClassName: 'row card-body p-2',
        fieldGroup: [

          {
            key: 'EmployeeId'
          },
          {
            className: 'col-md-4',
            type: 'input',
            key: 'EmployeeName',
            templateOptions: {
              placeholder: 'Enter Employee Name',
              type: 'text',
              label: 'Employee Name',
              required: true,
            },
          },
          {
            className: 'col-md-4',
            type: 'input',
            key: 'Email',
            templateOptions: {
              placeholder: 'Enter Email',
              type: 'email',
              label: 'Employee Email',
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
            key: 'EmployeePhone',
            templateOptions: {
              placeholder: 'Enter Employee Phone',
              required: true,
              label: 'Employee Phone',
            },
          },
          {
            className: 'col-md-4',
            type: 'input',
            key: 'AadharNumber',
            templateOptions: {
              placeholder: 'Enter AADHAAR Number',
              required: true,
              label: 'AADHAAR Number',
            },
          },
          {
            className: 'col-md-4',
            type: 'input',
            key: 'DateOfBirth',
            templateOptions: {
              label: 'Date of Birth',
              placeholder: 'Date',
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
            type: 'select',
            key: 'BloodGroup',
            templateOptions: {
              label: 'Blood Group',
             // placeholder: 'Select Blood Group',
              required: true,
              options: [
                { value: null, label: 'Select Blood Group', disabled: true },  // Disabled placeholder option
                { value: 'A+', label: 'A+' },
                { value: 'B+', label: 'B+' },
                { value: 'A-', label: 'A-' },
                { value: 'B-', label: 'B-' },
              ],
            },
            defaultValue: null,
            validators: {
              required: {
                expression: (c: AbstractControl) => c.value !== null && c.value !== '', // Ensure a valid value is selected
                message: 'This field is required',
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
            type: 'select',
            key: 'Gender',
            templateOptions: {
              label: 'Gender',
              //placeholder: 'Select Gender',
              required: true,
              options: [
                { value: null, label: 'Select Gender', disabled: true },  // Disabled placeholder option
                { value: 'Male', label: 'Male' },
                { value: 'Female', label: 'Female' }
              ],
            },
            defaultValue: null,
            validators: {
              required: {
                expression: (c: AbstractControl) => c.value !== null && c.value !== '', // Ensure a valid value is selected
                message: 'This field is required',
              },
            },
            validation: {
              messages: {
                required: 'This field is required',
              },
            },
          }
          ,
          {
            className: 'col-md-4',
            type: 'input',
            key: 'Qualification',
            templateOptions: {
              placeholder: 'Qualification',
              required: true,
              type: 'text',
              label: 'Qualification',
            },
            validation: {
              messages: {
                required: 'This field is required',
                tds: 'Please enter a Qualification',
              },
            },
          },
          {
            className: 'col-md-2',
            key: 'File',
            type: 'file',
            templateOptions: {
              placeholder: 'Select File',
              label: 'Employee Photo',
              required: true,
            },
          },
        ],
      },
      {
        template: '<label class="form-label"><h6><b>Address Details</b></h6></label>',
      },
      {
        template: `
          
          <h6><b>Current Address</b></h6>
          <hr style="border-bottom : 2px solid rgb(230, 230, 230); margin-top: 10px; margin-bottom: 10px;">
        `,
      },
      {
        key: 'AddressDetails',
        fieldGroupClassName: 'row card-body p-2',
        fieldGroup: [
          {
            className: 'col-md-3',
            type: 'input',
            key: 'Address',
            templateOptions: {
              label: 'Address ',
              placeholder: 'Enter Address ',
              required: true,
            },
            validation: {
              messages: {
                required: 'Address  is required',
              },
            },
          },
          {
            className: 'col-md-3',
            type: 'select',
            key: 'City',
            templateOptions: {
              label: 'City / District',
              placeholder: 'Enter City / District',
              required: true,
              options: [
                { value: 'city', label: 'Nashik' },
                { value: 'city', label: 'Pune' }
              ]
            },
            validation: {
              messages: {
                required: 'City / District is required',
              },
            },
          },
          {
            className: 'col-md-3',
            type: 'select',
            key: 'State',
            templateOptions: {
              label: 'State / Province',
              placeholder: 'Enter State / Province',
              required: true,
              options: [
                { value: 'state', label: 'nashik' },
                { value: 'state', label: 'pune' }
              ]
            },
            validation: {
              messages: {
                required: 'State / Province is required',
              },
            },
          },
          {
            className: 'col-md-3',
            type: 'input',
            key: 'postalCode',
            templateOptions: {
              label: 'Postal Code',
              placeholder: 'Enter Postal Code',
              required: true,
            },
            validation: {
              messages: {
                required: 'Postal Code is required',
              },
            },
          },
          {
            className: 'col-md-6',
            type: 'checkbox',
            key: 'SameAsCurrentAddress',
            templateOptions: {
              label: 'Same As Current Address',
            },
          },
        ],
      },
     
      {
        template: `
         
          <h6><b>Permanent Address</b></h6>
          <hr style="border: 1px solid rgb(230, 230, 230); margin-top: 10px; margin-bottom: 10px;">
        `,
      },
      {
        key: 'PermanentAddress',
        fieldGroupClassName: 'row card-body p-2',
        fieldGroup: [
          {
            className: 'col-md-3',
            type: 'input',
            key: 'Address',
            templateOptions: {
              label: 'Address Line',
              placeholder: 'Enter Address ',
              required: true,
            },
            validation: {
              messages: {
                required: 'Address is required',
              },
            },
          },
          {
            className: 'col-md-3',
            type: 'select',
            key: 'City',
            templateOptions: {
              label: 'City / District',
              placeholder: 'Enter City ',
              required: true,
              options: [
                { value: 'Nashik', label: 'Nashik' },
                { value: 'Pune', label: 'Pune' }
              ]
            },
            validation: {
              messages: {
                required: 'City / District is required',
              },
            },
          },
          {
            className: 'col-md-3',
            type: 'select',
            key: 'State',
            templateOptions: {
              label: 'State',
              placeholder: 'Enter State',
              required: true,
              options: [
                { value: 'maharastra', label: 'maharastra' },
                { value: 'asam', label: 'asam' }
              ]
            },
            validation: {
              messages: {
                required: 'State is required',
              },
            },
          },
          {
            className: 'col-md-3',
            type: 'input',
            key: 'PostalCode',
            templateOptions: {
              label: 'Postal Code',
              placeholder: 'Enter Postal Code',
              required: true,
            },
            validation: {
              messages: {
                required: 'Postal Code is required',
              },
            },
          },
        ],
      },
      {
      fieldGroupClassName: 'row card-body p-2',
      fieldGroup: [
        {
          className: 'col-md-2',
          type: 'select',
          key: 'Role',
          templateOptions: {
            placeholder: 'select',
            type: 'text',
            label: 'Employee Role',
            required: true,
            options: [
              { value: 'developer', label: 'Developer' },
              { value: 'manager', label: 'Manager' }
            ]
          },
        },
        {
          className: 'col-md-3',
          type: 'select',
          key: 'IsActive',
          templateOptions: {
            label: 'Employee Status',
            //placeholder: 'Select Employee Status',
            required: true,
            options: [
              { value: null, label: 'Select Employee Status', disabled: true },  // Disabled placeholder option
              { value: true, label: 'Active' },
              { value: false, label: 'Inactive' }
            ],
          },
          defaultValue: null,  // Set default value to 'Active'
          validation: {
            messages: {
              required: 'Please select a employee status',
            },
          },
        }
      ]
    }
    ];
  }

  onCancelClick() {
    this.router.navigateByUrl('erp/hrd/employees');
  }

  onResetClick() {
    this.form.reset();
  }

  onSubmit(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.insertEmployee();
    } else {
      this.alertService.ShowErrorMessage('Please fill in all required fields.');
    }
  }



  insertEmployee() {
    this.employeeDetails.addedBy = 1;
    this.employeeDetails.addedDate = new Date();
    this.employeeDetails.updatedBy = 1;
    this.employeeDetails.updatedDate = new Date();
    //this.employeeDetails.employeeId = 0;

    this.employeeService.insertEmployeeData(this.employeeDetails).subscribe(
      (result: any) => {
        const serviceResponse = result.Value;
        if (serviceResponse === ResponseCode.Success) {
          this.alertService.ShowSuccessMessage(this.messageService.savedSuccessfully);
          this.router.navigateByUrl('erp/hrd/employee');

        } else if (serviceResponse === ResponseCode.Update) {
          this.alertService.ShowSuccessMessage(this.messageService.updateSuccessfully);
          this.router.navigateByUrl('erp/hrd/employee');

        } else {
          this.alertService.ShowErrorMessage(this.messageService.serviceError);
        }
      },
      (error: any) => {
        this.alertService.ShowErrorMessage(error);
      }
    );
}
getEmployeeDetails(EmployeeDetailId: number) {
    this.employeeService.getEmployeeDetails(EmployeeDetailId).subscribe(
      (result: any) => {
        if (result && result.Value && result.Value.Item1) {
          this.employeeDetails = result.Value.Item1;
          
          //DateofPayment && DateOfDeduction 
          this.setParameter(); 
        } else {
          console.error('No data found for EmployeeDetailId: ' + EmployeeDetailId);

        }

      },
      (error: any) => {
        console.error('Error retrieving employee details:', error);

        if (error && error.status === 404) {
          console.error('Employee not found.');

        } else {
          console.error('An unexpected error occurred. Please try again later.');

        }
      }
    );
  }

}
