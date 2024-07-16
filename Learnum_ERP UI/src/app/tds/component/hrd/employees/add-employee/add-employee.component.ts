import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { AlertService } from 'src/app/core/services/alertService';
import { MessageService } from 'src/app/core/services/message.service';
import { EmployeeDetailsModel } from './add-employee.model';
import { ResponseCode } from 'src/app/core/models/responseObject.model';
import { AddemployeeService } from './addemployee.service';


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
  
  
  
  constructor(
    private addemployeeService: AddemployeeService,
    private router: Router,
    private alertService: AlertService,
    private messageService: MessageService,
    private activateRoute: ActivatedRoute,
    private fb: FormBuilder,
    private http: HttpClient
  ) { }
 

  ngOnInit(): void {
    this.setParameter();
    this.addSameAsCurrentAddressListener();
  }

  setParameter() {
    this.fields = [
      {
        fieldGroupClassName: 'row card-body p-2',
        fieldGroup: [
          {
            className: 'col-md-4',
            type: 'input',
            key: 'employeeName',
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
            key: 'email',
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
            key: 'employeePhone',
            templateOptions: {
              placeholder: 'Enter Employee Phone',
              required: true,
              label: 'Employee Phone',
            },
          },
          {
            className: 'col-md-4',
            type: 'input',
            key: 'aadharNumber',
            templateOptions: {
              placeholder: 'Enter AADHAAR Number',
              required: true,
              label: 'AADHAAR Number',
            },
          },
          {
            className: 'col-md-4',
            type: 'input',
            key: 'dateOfBirth',
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
            key: 'bloodGroup',
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
            key: 'gender',
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
            key: 'qualification',
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
            key: 'file',
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
            key: 'address',
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
            key: 'city',
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
            key: 'state',
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
            key: 'address',
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
            key: 'city',
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
            key: 'state',
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
        ],
      },
      {
      fieldGroupClassName: 'row card-body p-2',
      fieldGroup: [
        {
          className: 'col-md-2',
          type: 'select',
          key: 'role',
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
          key: 'isActive',
          templateOptions: {
            placeholder: 'select',
            type: 'text',
            label: 'Employee Status',
            required: true,
            options: [
              { value: 'true', label: 'active' },
              { value: 'false', label: 'Inactive' }
            ]
          },
        }
      ]
    }
    ];
  }
  // getEmployeeDetails(EmployeeDetailId: number) {
  //   this.addEmployeeService.getEmployeeDetails(EmployeeDetailId).subscribe(
  //     (result: any) => {
  //       if (result && result.Value && result.Value.Item1) {
  //         this.employeeDetails = result.Value.Item1;
          
  //         //DateofPayment && DateOfDeduction

      
          
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

  onCancelClick() {
    this.router.navigateByUrl('tds/hrd/employees');
  }

  addSameAsCurrentAddressListener() {
    this.form.get('AddressDetails.SameAsCurrentAddress').valueChanges.subscribe((checked: boolean) => {
      if (checked) {
        const currentAddress = this.form.get('AddressDetails').value;
        this.form.get('PermanentAddress').setValue({
          address: currentAddress.Address,
          city: currentAddress.City,
          state: currentAddress.State,
          postalCode: currentAddress.PinCode
        });
      } else {
        this.form.get('PermanentAddress').reset();
      }
    });
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
    this.employeeDetails.employeeId = 0;

    this.addemployeeService.insertEmployeeData(this.employeeDetails).subscribe(
      (result: any) => {
        const serviceResponse = result.Value;
        if (serviceResponse === ResponseCode.Success) {
          this.alertService.ShowSuccessMessage(this.messageService.savedSuccessfully);
        } else if (serviceResponse === ResponseCode.Update) {
          this.alertService.ShowSuccessMessage(this.messageService.updateSuccessfully);
        } else {
          this.alertService.ShowErrorMessage(this.messageService.serviceError);
        }
      },
      (error: any) => {
        this.alertService.ShowErrorMessage(error);
      }
    );
    this.router.navigateByUrl('tds/hrd/employee');
}
}
