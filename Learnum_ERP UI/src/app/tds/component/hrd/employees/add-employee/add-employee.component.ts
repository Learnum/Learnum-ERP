import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { AlertService } from 'src/app/core/services/alertService';
import { MessageService } from 'src/app/core/services/message.service';
import { EmployeeDetails } from './add-employee.model';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {
  form = new FormGroup({});
  employeeDetails: EmployeeDetails = new EmployeeDetails();
  fields: FormlyFieldConfig[];
  options: FormlyFormOptions = {};
  editData: any;
  GetEmployeeList: any;
  NowDate: any = new Date();
  model = {};
  addEmployeeService: any;
  
  constructor(
    private router: Router,
    private alertService: AlertService,
    private messageService: MessageService,
    private activateRoute: ActivatedRoute,
    private fb: FormBuilder,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.setParameter();
  }

  

 
  setParameter() {
    this.fields = [
      {
        fieldGroupClassName: 'row card-body p-2',
        fieldGroup: [
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
            key: 'EmployeeEmail',
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
            key: 'AADHAARNumber',
            templateOptions: {
              placeholder: 'Enter AADHAAR Number',
              required: true,
              label: 'AADHAAR Number',
            },
          },
          {
            className: 'col-md-4',
            type: 'input',
            key: 'DateofBirth',
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
              placeholder: 'Select Blood Group',
              required: true,
              options: [
                { value: 'A+', label: 'A+' },
                { value: 'B+', label: 'B+' },
                { value: 'A-', label: 'A-' },
                { value: 'B-', label: 'B-' },
              ]
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
              placeholder: 'Enter Gender',
              required: true,
              type: 'text',
              label: 'Gender',
              options: [
                { value: 'Male', label: 'Male' },
                { value: 'Female', label: 'Female' }
              ]
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
            key: 'EmployeePhoto',
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
            key: 'PinCode',
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
                { value: 'Nashik', label: 'Nashik' },
                { value: 'Pune', label: 'Pune' }
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
            key: 'PinCode',
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
          key: 'EmployeeRole',
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
          className: 'col-md-2',
          type: 'select',
          key: 'EmployeeStatus',
          templateOptions: {
            placeholder: 'select',
            type: 'text',
            label: 'Employee Status',
            required: true,
            options: [
              { value: 'active', label: 'active' },
              { value: 'Inactive', label: 'Inactive' }
            ]
          },
        }
      ]
    }
    ];
  }
  getEmployeeDetails(EmployeeDetailId: number) {
    this.addEmployeeService.getEmployeeDetails(EmployeeDetailId).subscribe(
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

  onCancelClick() {
    this.router.navigateByUrl('tds/hrd/employees');
  }

  onSubmit() {
    if (this.form.valid) {
      // Handle the form submission
      console.log(this.form.value);
    } else {
      this.alertService.error('Please fill all required fields');
    }
  }

  get f() {
    return this.form.controls;
  }
}
