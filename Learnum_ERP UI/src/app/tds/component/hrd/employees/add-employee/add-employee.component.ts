import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  model: any = {};

  constructor(
    // private addEmployeeService: AddEmployeeService,
    private router: Router,
    private alertService: AlertService,
    private messageService: MessageService,
    private activateRoute: ActivatedRoute,
    private fb: FormBuilder,
    private http: HttpClient
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
      EmployeeName: ['', Validators.required],
      EmployeeEmail: ['', Validators.required],
      EmployeePhoto: ['', Validators.required],
      EmployeePhone: ['', Validators.required],
      AADHAARNumber: ['', Validators.required],
      DateofBirth: ['', Validators.required],
      BloodGroup: ['', Validators.required],
      Gender: ['', Validators.required],
      Qualification: ['', Validators.required],
      CurrentAddress: ['', Validators.required],
      PermanentAddress: ['', Validators.required],
      EmployeeRole: ['', Validators.required],
      EmployeeStatus: ['', Validators.required],
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
            type: 'input',
            key: 'EmployeeName',
            templateOptions: {
              placeholder: 'Enter Employee Name',
              type: 'text',
              label: "EmployeeName",
              required: true,
            },
          },
          {
            className: 'col-md-3',
            type: 'input',
            key: 'EmployeeEmail',
            props: {
              placeholder: 'Enter Email',
              type: 'text',
              label: "Employee Email",
              required: true,
              pattern: '^[A-Za-z]+$',
              title: 'Only characters are allowed',
            },
            validation: {
              messages: {
                required: 'Email is required',
                pattern: 'Please enter a valid Email ',
              },
            },
          },
          {
            className: 'col-md-3',
            type: 'input',
            key: 'EmployeePhoto',
            templateOptions: {
              placeholder: 'Upload Employee Photo',
              label: 'Employee Photo',
              description: 'Choose a photo to upload',
            },
            validation: {
              show: true,
              messages: {
                required: 'Employee photo is required',
              },
            },
          },
          {
            className: 'col-md-3',
            type: 'input',
            key: 'EmployeePhone',
            props: {
              placeholder: 'Enter Employee Phone',
              required: true,
              valueProp: 'value',
              labelProp: 'label',
              label: "Employee Phone",
            },
            // Disable manual input by setting the input type to 'select' explicitly
            //inputType: 'select'
          },
          {
            className: 'col-md-3',
            type: 'input',
            key: 'AADHAARNumber',
            props: {
              placeholder: 'Enter Adhar Number',
              required: true,
              valueProp: 'value',
              labelProp: 'label',
              label: "AADHAAR Number",
            },
            // Disable manual input by setting the input type to 'select' explicitly
            //inputType: 'select'
          },
          {
            className: 'col-md-3',
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
            className: 'col-md-3',
            type: 'input',
            key: 'BloodGroup',
            templateOptions: {
              label: "Blood Group",
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
            className: 'col-md-3',
            type: 'input',
            key: 'Gender',
            props: {
              placeholder: 'Enter Gender',
              required: true,
              type: 'text',
              label: "Gender",
            },
            validation: {
              messages: {
                required: 'This field is required',
              },
            },
          },
          {
            className: 'col-md-3',
            type: 'input',
            key: 'Qualification',
            props: {
              placeholder: 'Qualification',
              required: true,
              type: 'text',
              label: "Qualification",
              defaultValue: 0,
            },
            validation: {
              messages: {
                required: 'This field is required',
                tds: 'Please enter a Qualification',
              },
            },
          },

          {
            className: 'col-md-3',
            type: 'input',
            key: 'CurrentAddress',
            props: {
              placeholder: 'Enter CurrentAddress',
              required: true,
              type: 'text',
              label: "Current Address",
            },
            validation: {
              messages: {
                required: 'This field is required',
              },
            },
          },
          {
            className: 'col-md-3',
            type: 'input',
            key: 'PermanentAddress',
            props: {
              placeholder: 'enter Permanent Address',
              required: true,
              type: 'text',
              label: "Permanent Address",
            },
            validation: {
              messages: {
                required: 'This field is required',
              },
            },
          },

          {
            className: 'col-md-3',
            type: 'input',
            key: 'EmployeeRole',
            props: {
              placeholder: 'Enter EmployeeRole',
              required: true,
              type: 'text',
              label: "Employee Role",
            }
            , validation: {
              messages: {
                required: 'This field is required',
              },
            },
          },
          {
            className: 'col-md-3',
            type: 'input',
            key: 'EmployeeStatus',
            props: {
              placeholder: 'Enter Employee Status',
              required: true,
              type: 'text',
              label: "Employee Status",
            }
            , validation: {
              messages: {
                required: 'This field is required',
              },
            },
          },
        ],
      },
    ]
  }

  onCancleClick() {
    this.router.navigateByUrl('tds/hrd/employees');
  }

  get f() {
    return this.form.controls;
  }


  onSubmit(): void {
    if (this.form.valid) {
      // Handle form submission, including file upload
      const file: File = this.model.EmployeePhoto[0];
      if (file) {
        this.uploadFile(file);
      }
    }
  }

  uploadFile(file: File): void {
    const formData = new FormData();
    formData.append('employeePhoto', file, file.name);

    // Make an HTTP request to upload the file
    this.http.post('/upload', formData).subscribe(response => {
      console.log('Upload response', response);
      // Handle upload response if needed
    });
  }

}
