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
  StateList: any;


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
    this.getAllStates();
    this.editData = this.activateRoute.snapshot.queryParams;
    if (this.editData.source === 'edit' && this.editData.EmployeeId) {
      this.getEmployeeDetails(this.editData.EmployeeId);
    }
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
              pattern: "^[A-Za-z]+( [A-Za-z]+)*$",
              title: 'Only characters are allowed',
            },
            validation: {
              messages: {
                required: 'Name is required',
                pattern: 'Please enter a valid name ',
              },
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
            validators: {
              email: {
                expression: (control) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i.test(control.value),
                message: 'Please enter a valid email address',
              },
            },
            validation: {
              messages: {
                required: 'Email is required',
                pattern: 'Please enter a valid Email',
              },
            },
          },
          
          {
            className: 'col-md-4',
            type: 'input',
            key: 'EmployeePhone',
            templateOptions: {
              label: 'Mobile Number',
              placeholder: 'Enter Mobile Number',
              required: true,
              maxLength: 10,
              minLength: 10,
            },
            hooks: {
              onInit: (field) => {
                field.formControl.valueChanges.subscribe(value => {
                  const sanitizedValue = value.replace(/[^0-9]/g, '');
                  if (sanitizedValue !== value) {
                    field.formControl.setValue(sanitizedValue, { emitEvent: false });
                  }
                });
              },
            },
            validators: {
              phoneNumber: {
                expression: (c: AbstractControl) => {
                  const value = c.value;
                  // Ensure the value is exactly 10 digits long
                  return value && /^[0-9]{10}$/.test(value);
                },
                message: (error: any, field: FormlyFieldConfig) => {
                  return `"${field.formControl.value}" is not a valid 10-digit phone number`;
                },
              },
            },
            validation: {
              messages: {
                required: 'Phone Number is required',
                phoneNumber: 'The phone number must contain only numbers and be exactly 10 digits long',
              },
            },
          },
          {
            className: 'col-md-4',
            type: 'input',
            key: 'AadharNumber',
            templateOptions: {
              placeholder: 'Enter AADHAAR Number',
              label: 'AADHAAR Number',
              required: true,
              maxLength: 12,  // Maximum length set to 12
              minLength: 12,  // Minimum length set to 12
            },
            validators: {
              aadhaarNumber: {
                expression: (control) => /^[0-9]{12}$/.test(control.value),  // Ensure it's exactly 12 digits
                message: 'AADHAAR Number must be a 12-digit numeric value',
              },
            },
            validation: {
              messages: {
                required: 'AADHAAR Number is required',
                pattern: 'AADHAAR Number must be a 12-digit numeric value',
              },
            },
          }
          ,
          {
            className: 'col-md-4',
            type: 'input',
            key: 'DateofBirth',
            templateOptions: {
              label: 'Date of Birth',
              placeholder: 'Date',
              type: 'date',
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
            type: 'select',
            key: 'BloodGroup',
            templateOptions: {
              label: 'Blood Group',
              required: true,
              options: [
                { value: null, label: 'Select Blood Group', disabled: true },  
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
              required: true,
              options: [
                { value: null, label: 'Select Gender', disabled: true },  
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
              },
            },
          },
          {
            className: 'col-md-2',
            type: 'file',
            key: 'file', 
            props: {
              label: 'Employee Photo',
              placeholder: 'Choose file',
            },
          },
          {
            className: 'col-md-3',
            type: 'select',
            key: 'Role',
            templateOptions: {
             label: 'Employee Role',
              required: true,
              options: [
                { value: null, label: 'Select Role', disabled: true },  
                { value: 'developer', label: 'Developer' },
                { value: 'manager', label: 'Manager' }
              ]
            },
            defaultValue: null, 
            validators: {
              required: {
                expression: (c: AbstractControl) => c.value !== null && c.value !== '', 
                message: 'This field is required',
              },
            },
          },
          {
            className: 'col-md-3',
            type: 'select',
            key: 'IsActive',
            props: {
              label: 'Employee Status',
              required: true,
              options: [
                { value: true, label: 'Active' },
                { value: false, label: 'Inactive' }
              ],
              
            },
            defaultValue: true, 
            validation: {
              messages: {
                required: 'Please select a Employee status',
              },
            },
          }
        ],
      },
      {
        template: `
          <label class="row d-flex" style="margin-left: 5px;">
            <h6 class="p-3 mb-2">
            <span data-toggle="tooltip" title="Close">
            <i class="uil uil-multiply"></i> &nbsp;
          </span>
              <b>
                Address Details
              </b>
            </h6>
            <hr style="border: 1px solid rgb(230, 230, 230); margin-top: 10px; margin-bottom: 10px;">
          </label>
        `,
      },
      {
        template: `
        <label>
          <h6>
            <b>
              Current Address 
            </b>
          </h6>
          <hr>
        </label>
      `,
      },
      {
        fieldGroupClassName: 'row card-body p-2',
        fieldGroup: [
          {
            className: 'col-md-3',
            type: 'input',
            key: 'Address',
            templateOptions: {
              label: 'Address',
              placeholder: 'Enter Address',
              required: true,
            },
          },
          {
            className: 'col-md-3',
            key: 'City',
            type: 'input',
            templateOptions: {
              label: 'City / District',
              placeholder: 'Enter City',
              required: true,
              type:'text',
              pattern: '^[A-Za-z ]+$', 
            },
            validation: {
              messages: {
                required: 'City is required',
                pattern: 'Please Enter City'
              },
            },
            hooks: {
              onInit: (field) => {
                field.formControl.valueChanges.subscribe(value => {
                  const capitalizedValue = value.replace(/\b\w/g, char => char.toUpperCase());
                  if (value !== capitalizedValue) {
                    field.formControl.setValue(capitalizedValue, { emitEvent: false });
                  }
                });
              }
            }
          },
          {
            className: 'col-md-3',
            type: 'select',
            key: 'StateId',
            templateOptions: {
              label: "State Name",
             // placeholder: 'Select State',  // Placeholder for the dropdown
              required: true,
              options: [
                { value: null, label: 'Select State', disabled: true },  // Disabled placeholder option
                ...this.StateList ? this.StateList.map(state => ({
                  label: state.StateName,
                  value: state.StateId
                })) : [],
              ],
            },
            defaultValue: null,  // Optional: set a default value if needed
            validators: {
              required: {
                expression: (c: AbstractControl) => c.value !== null && c.value !== '', // Ensure a valid value is selected
                message: 'State is required',
              },
            },
            validation: {
              messages: {
                required: 'State is required',
              },
            },
          },
          {
            className: 'col-md-3',
            key: 'PostalCode',
            type: 'input',
            templateOptions: {
              label: 'Postal Code',
              placeholder: 'Enter Postal Code',
              required: true,
              type: 'tel',
              pattern: '^[0-9]{6}$',
              maxLength: 6,
              minLength: 6
            },
            hooks: {
              onInit: (field) => {
                field.formControl.valueChanges.subscribe(value => {
                  const sanitizedValue = value.replace(/[^0-9]/g, '');
                  if (sanitizedValue !== value) {
                    field.formControl.setValue(sanitizedValue, { emitEvent: false });
                  }
                });
              },
            },
            validators: {
              postalCode: {
                expression: (c: AbstractControl) => {
                  const value = c.value;
                  // Ensure the value is exactly 6 digits long
                  return value && /^[0-9]{6}$/.test(value);
                },
                message: (error: any, field: FormlyFieldConfig) => {
                  return `"${field.formControl.value}" is not a valid 6-digit Postal Code`;
                },
              },
            },
            validation: {
              messages: {
                required: 'Postal Code is required',
                postalCode: 'Please enter a valid 6-digit Postal Code',
              },
            },
          },
        ]
      },
      // Same As Current Address Checkbox
      {
        className: 'col-md-3',
        type: 'checkbox',
        key: 'SameAsCurrentAddress',
        templateOptions: {
          label: 'Same As Current Address',
          change: (field, $event) => this.sameAsCurrentAddressChanged($event),
        },
      },
      {
        template: `
        <label>
          <h6>
            <b>
              Permanent Address
            </b>
          </h6>
          <hr>
        </label>
      `,
      },
      // Permanent Address Fields
      {
        fieldGroupClassName: 'row card-body p-2',
        fieldGroup: [
          {
            className: 'col-md-3',
            type: 'input',
            key: 'Address',
            templateOptions: {
              label: 'Address',
              placeholder: 'Enter Address',
              required: true,
            },
          },
          {
            className: 'col-md-3',
            key: 'City',
            type: 'input',
            templateOptions: {
              label: 'City / District',
              placeholder: 'Enter City',
              required: true,
              type:'text',
              pattern: '^[A-Za-z ]+$', 
            },
            validation: {
              messages: {
                required: 'City is required',
                pattern: 'Please Enter City'
              },
            },
            hooks: {
              onInit: (field) => {
                field.formControl.valueChanges.subscribe(value => {
                  const capitalizedValue = value.replace(/\b\w/g, char => char.toUpperCase());
                  if (value !== capitalizedValue) {
                    field.formControl.setValue(capitalizedValue, { emitEvent: false });
                  }
                });
              }
            }
          },
          {
            className: 'col-md-3',
            type: 'select',
            key: 'StateId',
            templateOptions: {
              label: "State Name",
             // placeholder: 'Select State',  // Placeholder for the dropdown
              required: true,
              options: [
                { value: null, label: 'Select State', disabled: true },  // Disabled placeholder option
                ...this.StateList ? this.StateList.map(state => ({
                  label: state.StateName,
                  value: state.StateId
                })) : [],
              ],
            },
            defaultValue: null,  // Optional: set a default value if needed
            validators: {
              required: {
                expression: (c: AbstractControl) => c.value !== null && c.value !== '', // Ensure a valid value is selected
                message: 'State is required',
              },
            },
            validation: {
              messages: {
                required: 'State is required',
              },
            },
          },
          {
            className: 'col-md-3',
            key: 'PostalCode',
            type: 'input',
            templateOptions: {
              label: 'Postal Code',
              placeholder: 'Enter Postal Code',
              required: true,
              type: 'tel',
              pattern: '^[0-9]{6}$',
              maxLength: 6,
              minLength: 6
            },
            hooks: {
              onInit: (field) => {
                field.formControl.valueChanges.subscribe(value => {
                  const sanitizedValue = value.replace(/[^0-9]/g, '');
                  if (sanitizedValue !== value) {
                    field.formControl.setValue(sanitizedValue, { emitEvent: false });
                  }
                });
              },
            },
            validators: {
              postalCode: {
                expression: (c: AbstractControl) => {
                  const value = c.value;
                  // Ensure the value is exactly 6 digits long
                  return value && /^[0-9]{6}$/.test(value);
                },
                message: (error: any, field: FormlyFieldConfig) => {
                  return `"${field.formControl.value}" is not a valid 6-digit Postal Code`;
                },
              },
            },
            validation: {
              messages: {
                required: 'Postal Code is required',
                postalCode: 'Please enter a valid 6-digit Postal Code',
              },
            },
          },
        ]
      },
    ];
  }

  sameAsCurrentAddressChanged(event: any) {
    if (event.target.checked) {
      const currentAddress = this.form.get('CurrentAddress').value; // Fetch current address values
      this.form.patchValue({
        PermanentAddress: currentAddress,  // Copy current address to permanent address
      });
    } else {
      this.form.patchValue({
        PermanentAddress: {
          Address: '',
          City: '',
          StateId: null,
          PostalCode: ''
        }
      });
    }
  }

  

  onCancelClick() {
    this.router.navigateByUrl('erp/hrd/employees');
  }

  onResetClick() {
    this.form.reset();
  }

  onSubmit(): void {
   // this.form.markAllAsTouched();
    if (this.form.valid) {
      const formData = new FormData();
      // Append form fields and the file
      for (const key in this.form.value) {
        // Check if it's a file
        if (key === 'file') {
          formData.append(key, this.form.value[key]); // Append the file directly
        } else {
          formData.append(key, this.form.value[key]);
        }
      }
      this.insertEmployee(formData);
    } else {
      this.alertService.ShowErrorMessage('Please fill in all required fields.');
    }
  }
  



  insertEmployee(formData: FormData) {
    this.employeeDetails.AddedBy = 1;
    this.employeeDetails.AddedDate = new Date();
    this.employeeDetails.UpdatedBy = 1;
    this.employeeDetails.UpdatedDate = new Date();
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
getEmployeeDetails(EmployeeId: number) {
    this.employeeService.getEmployeeDetails(EmployeeId).subscribe(
      (result: any) => {
        if (result && result.Value && result.Value.Item1) {
          this.employeeDetails = result.Value.Item1;
          
          this.employeeDetails.DateofBirth = this.employeeService.formatDate(this.employeeDetails.DateofBirth);
          this.setParameter(); 
        } else {
          console.error('No data found for EmployeeDetailId: ' + EmployeeId);

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


  getAllStates() {
    this.employeeService.getAllStates().subscribe(
      (result) => {
        let data = result.Value;
        this.StateList = data
        this.setParameter();
      }, (error) => {

      });
  }

}