import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { AlertService } from 'src/app/core/services/alertService';
import { MessageService } from 'src/app/core/services/message.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {
  form = new FormGroup({});
  reasonList: any[] = [];
  fields: FormlyFieldConfig[];
  options: FormlyFormOptions = {};
  editData: any;
  tdsReturnList: any;
  GetEmployeeList: any;
  coOwners: any;
  NowDate: any = new Date();
  employeeDetails: any;
  model = {};
  coursesDetails: any;

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
    this.createForm();
  }

  createForm(): void {
    this.form = this.fb.group({
      EmployeeName: ['', Validators.required],
      EmployeeEmail: ['', [Validators.required, Validators.email]],
      EmployeePhoto: ['', Validators.required],
      EmployeePhone: ['', Validators.required],
      AADHAARNumber: ['', Validators.required],
      DateofBirth: ['', Validators.required],
      BloodGroup: ['', Validators.required],
      Gender: ['', Validators.required],
      Qualification: ['', Validators.required],
      AddressDetails: this.fb.group({
        Address: ['', Validators.required],
        City: ['', Validators.required],
        District: ['', Validators.required],
        State: ['', Validators.required],
        PinCode: ['', Validators.required]
      }),
      PermanentAddress: this.fb.group({
        Address: ['', Validators.required],
        City: ['', Validators.required],
        District: ['', Validators.required],
        State: ['', Validators.required],
        PinCode: ['', Validators.required]
      }),
    });
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
            className: 'col-md-2',
            key: 'EmployeePhoto',
            type: 'file',
            templateOptions: {
              placeholder: 'Select File',
              label: 'Employee Photo',
              required: true,
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
            type: 'input',
            key: 'BloodGroup',
            templateOptions: {
              label: 'Blood Group',
              placeholder: 'Enter Blood Group',
              required: true,
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
            key: 'Gender',
            templateOptions: {
              placeholder: 'Enter Gender',
              required: true,
              type: 'text',
              label: 'Gender',
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
        ],
      },
      {
        template: '<label class="form-label"><b>Current Address</b></label>',
      },
      {
        key: 'AddressDetails',
        fieldGroupClassName: 'row card-body p-2',
        fieldGroup: [
          {
            className: 'col-md-6',
            type: 'input',
            key: 'Address',
            templateOptions: {
              label: 'Address Line',
              placeholder: 'Enter Address Line 1',
              required: true,
            },
            validation: {
              messages: {
                required: 'Address Line is required',
              },
            },
          },
          {
            className: 'col-md-6',
            type: 'input',
            key: 'City',
            templateOptions: {
              label: 'City / District',
              placeholder: 'Enter City / District',
              required: true,
            },
            validation: {
              messages: {
                required: 'City / District is required',
              },
            },
          },
          {
            className: 'col-md-6',
            type: 'input',
            key: 'State',
            templateOptions: {
              label: 'State / Province',
              placeholder: 'Enter State / Province',
              required: true,
            },
            validation: {
              messages: {
                required: 'State / Province is required',
              },
            },
          },
          {
            className: 'col-md-6',
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
        template: '<label class="form-label"><b>Permanent Address</b></label>',
      },
      {
        key: 'PermanentAddress',
        fieldGroupClassName: 'row card-body p-2',
        fieldGroup: [
          {
            className: 'col-md-6',
            type: 'input',
            key: 'Address',
            templateOptions: {
              label: 'Address Line',
              placeholder: 'Enter Address Line 1',
              required: true,
            },
            validation: {
              messages: {
                required: 'Address Line is required',
              },
            },
          },
          {
            className: 'col-md-6',
            type: 'input',
            key: 'City',
            templateOptions: {
              label: 'City / District',
              placeholder: 'Enter City / District',
              required: true,
            },
            validation: {
              messages: {
                required: 'City / District is required',
              },
            },
          },
          {
            className: 'col-md-6',
            type: 'input',
            key: 'State',
            templateOptions: {
              label: 'State / Province',
              placeholder: 'Enter State / Province',
              required: true,
            },
            validation: {
              messages: {
                required: 'State / Province is required',
              },
            },
          },
          {
            className: 'col-md-6',
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
          },
        }
      ]
    }
    ];
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
