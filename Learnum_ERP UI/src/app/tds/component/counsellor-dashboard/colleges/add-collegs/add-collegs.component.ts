import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { AlertService } from 'src/app/core/services/alertService';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddcollegesService } from './addcolleges.service';
import { AddcollegesDetails, CollegeContactDetails, ContactDetails, DepartmentDetails } from './addcolleges.model';
import { ResponseCode } from 'src/app/core/models/responseObject.model';
import { MessageService } from 'src/app/core/services/message.service';

@Component({
  selector: 'app-add-collegs',
  templateUrl: './add-collegs.component.html',
  styleUrls: ['./add-collegs.component.scss']
})
export class AddCollegsComponent implements OnInit {
  [x: string]: any;

  collegeContactDetails: CollegeContactDetails = new CollegeContactDetails();

  //contactForm = new FormGroup({});
  collegeForm: FormGroup;
  form = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[];
  contactForm: FormGroup;
  departmentForm: FormGroup;
  collegeDetails: any;
  contactDetails: any[] = [];
  departmentDetails: any[] = [];
  contactFields: FormlyFieldConfig[];
  departmentFields: FormlyFieldConfig[];
  roleDetails: any;
  collegeroleDetails: any;
  StateList: any;

  constructor(
    private router: Router,
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private messageService: MessageService,
    private addcollegesService: AddcollegesService
  ) { }

  ngOnInit(): void {
    this.createContactForm();
    this.createDepartmentForm();
    this.setParameter();
    this.getBranchDetails();
    this.getJobroleList();
    this.getCollegeList();
    this.getAllStates();
  }

  setParameter() {
    this.fields = [
      {
        fieldGroupClassName: 'row card-body p-2',
        fieldGroup: [
          {
            className: 'col-md-3',
            type: 'input',
            key: 'CollegeName',
            props: {
              placeholder: 'College Name',
              type: 'text',
              label: 'College Name',
              required: true,
            },
            hooks: {
              onInit: (field) => {
                field.formControl.valueChanges.subscribe(value => {
                  // Remove any numbers from the input
                  const sanitizedValue = value.replace(/[^A-Za-z ]/g, '');
                  // Capitalize the first letter of each word
                  const capitalizedValue = sanitizedValue.replace(/\b\w/g, char => char.toUpperCase());

                  if (value !== capitalizedValue) {
                    field.formControl.setValue(capitalizedValue, { emitEvent: false });
                  }
                });
              }
            },
            validation: {
              messages: {
                required: 'College Name is required',
                pattern: 'Please enter a valid name with letters only.',
              },
            },
          },
          {
            className: 'col-md-3',
            key: 'CollegeAddress',
            type: 'input',
            props: {
              label: 'College Address',
              placeholder: 'Address Line 1',
              required: true,
            },
            hooks: {
              onInit: (field) => {
                const formControl = field.formControl;
                formControl.valueChanges.subscribe(value => {
                  const formattedValue = value.replace(/\b\w/g, char => char.toUpperCase());
                  if (formattedValue !== value) {
                    formControl.setValue(formattedValue, { emitEvent: false });
                  }
                });
              }
            },
            validation: {
              messages: {
                required: 'College Address is required',
              },
            },
          },
          {
            className: 'col-md-3',
            key: 'City',
            type: 'input',
            props: {
              label: 'City',
              placeholder: 'City',
              required: true,
            },
            hooks: {
              onInit: (field) => {
                field.formControl.valueChanges.subscribe(value => {
                  // Remove any numbers from the input
                  const sanitizedValue = value.replace(/[^A-Za-z ]/g, '');
                  // Capitalize the first letter of each word
                  const capitalizedValue = sanitizedValue.replace(/\b\w/g, char => char.toUpperCase());

                  if (value !== capitalizedValue) {
                    field.formControl.setValue(capitalizedValue, { emitEvent: false });
                  }
                });
              }
            },
            validation: {
              messages: {
                required: 'City is required',
              },
            },
          },
          {
            className: 'col-md-3',
            key: 'District',
            type: 'input',
            props: {
              label: 'District',
              placeholder: 'District',
              required: true,
            },
            hooks: {
              onInit: (field) => {
                field.formControl.valueChanges.subscribe(value => {
                  // Remove any numbers from the input
                  const sanitizedValue = value.replace(/[^A-Za-z ]/g, '');
                  // Capitalize the first letter of each word
                  const capitalizedValue = sanitizedValue.replace(/\b\w/g, char => char.toUpperCase());

                  if (value !== capitalizedValue) {
                    field.formControl.setValue(capitalizedValue, { emitEvent: false });
                  }
                });
              }
            },
            validation: {
              messages: {
                required: 'City is required',
              },
            },
          },
          {
            className: 'col-md-3',
            type: 'select',
            key: 'StateId',
            templateOptions: {
              label: "State Name",
              //  placeholder: 'Select State',  // Placeholder for the dropdown
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
            key: 'Pincode',
            type: 'input',
            templateOptions: {
              label: 'Postal Code',
              placeholder: 'Enter Postal Code',
              required: true,
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
              pincode: {
                expression: (c: AbstractControl) => {
                  const value = c.value;
                  // Ensure the value is exactly 6 digits long
                  return value && /^[0-9]{6}$/.test(value);
                },
                message: (error: any, field: FormlyFieldConfig) => {
                  return `"${field.formControl.value}" is not a valid 6-digit Pincode`;
                },
              },
            },
            validation: {
              messages: {
                required: 'Pincode is required',
                pincode: 'The Pincode must contain only numbers and be exactly 6 digits long',
              },
            },
          },
          {
            className: 'col-md-3',
            type: 'select',
            key: 'BranchId',
            templateOptions: {
              label: "Branch Name",
              //   placeholder: 'Select Branch',  // Placeholder for the dropdown
              required: true,
              options: [
                { value: null, label: 'Select Branch', disabled: true },  // Disabled placeholder option
                ...this.branchDetails ? this.branchDetails.map(branch => ({
                  label: branch.BranchName,
                  value: branch.BranchId
                })) : [],
              ]
            },
            defaultValue: null,  // Optional: set a default value if needed
            validators: {
              required: {
                expression: (c: AbstractControl) => c.value !== null && c.value !== '', // Ensure a valid value is selected
                message: 'Branch selection is required',
              },
            },
            validation: {
              messages: {
                required: 'Branch selection is required',
              },
            },
          },
          {
            className: 'col-md-3',
            key: 'CollegeWebsite',
            type: 'input',
            props: {
              label: 'College Website',
              placeholder: 'College Website',
              required: true,
              pattern: '^(https?:\\/\\/)?([\\da-z.-]+)\\.([a-z.]{2,6})([\\/\\w .-]*)*\\/?$', // Pattern to match website URL
              description: 'Enter a valid website URL.',
            },
            validation: {
              messages: {
                required: 'College Website is required',
                pattern: 'Please enter a valid website URL',
              },
            },
          },
          {
            className: 'col-md-3',
            key: 'BranchName1',
            type: 'input',
            props: {
              label: 'Branch Name 1',
              placeholder: 'Branch Name 1',
              required: true,
              pattern: '^[a-zA-Z0-9]+$', // Allows only letters and numbers, no spaces
            },
            validation: {
              messages: {
                required: 'Branch Name 1 is required',
                pattern: 'Branch Name 1 can only contain letters and numbers, without spaces',
              },
            },
          },
          {
            className: 'col-md-3',
            key: 'AboutCollege',
            type: 'textarea',
            props: {
              label: 'About College',
              placeholder: 'About College',
              required: true,
              attributes: {
                style: 'overflow:hidden; resize:none;',
                oninput: "this.style.height = 'auto'; this.style.height = this.scrollHeight + 'px';"
              }
            },
            validation: {
              messages: {
                required: 'About College is required',
              },
            },
          },
        ],
      },
    ];

    this.contactFields = [{
      fieldGroupClassName: 'row card-body p-2',
      fieldGroup: [
        {
          key: 'Name',
          className: 'col-4',
          // type: 'input',
          templateOptions: {
            placeholder: 'Enter Name',
            type: 'text',
            required: true,
          }
        },
        {
          className: 'col-md-3',
          key: 'Phone',
          type: 'input',
          templateOptions: {
            label: 'Phone Number',
            placeholder: 'Enter Phone Number',
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
        }, ,
        {
          key: 'Email',
          className: 'col-4',
          // type: 'input',
          templateOptions: {
            placeholder: 'Enter Email',
            type: 'text',
            required: true,
          }
        },
        {
          key: 'RoleId',
          className: 'col-4',
          // type: 'select',
          templateOptions: {
            placeholder: 'Enter Email',
            type: 'text',
            required: true,
          }
        },
      ]
    }];

    this.departmentFields = [{
      fieldGroupClassName: 'row card-body p-2',
      fieldGroup: [
        {
          key: 'Name',
          className: 'col-4',
          //type: 'input',
          templateOptions: {
            placeholder: 'Enter Name',
            type: 'text',
            required: true,
          }
        },
        {
          key: 'CollegeRoleId',
          className: 'col-4',
          //type: 'select',
          templateOptions: {
            placeholder: 'Select College',
            type: 'text',
            required: true,
          }
        },
      ]
    }]
  }

  createContactForm(): void {
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      jobRole: ['', Validators.required],
    });
  }

  addContact(): void {
    if (this.contactForm.valid) {
      this.contactDetails.push(this.contactForm.value);
      this.contactForm.reset();
      this.modalService.dismissAll();
    } else {
      this.alertService.ShowErrorMessage("Please fill all required fields.");
    }
  }

  createDepartmentForm(): void {
    this.departmentForm = this.formBuilder.group({
      coursename: ['', Validators.required],
      seats: ['', Validators.required],
    });
  }

  addDepartment(): void {
    if (this.departmentForm.valid) {
      this.departmentDetails.push(this.departmentForm.value);
      this.departmentForm.reset();
      this.modalService.dismissAll();
      this.router.navigateByUrl('tds/counsellor-dashboard/colleges/add-collegs');
    } else {
      this.alertService.ShowErrorMessage("Please fill all required fields.");
    }
  }

  onSubmit(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.insertCollegeDetails();
      //this.combineFormData();
      console.log(this.departmentDetails);
      console.log(this.contactDetails);
      console.log(this.collegeContactDetails)
    } else {
      this.alertService.ShowErrorMessage('Please fill in all required fields.');
    }
  }

  onCancelClick() {
    this.router.navigateByUrl('tds/counsellor-dashboard/colleges');
  }

  getBranchDetails() {
    this.addcollegesService.getBranchList().subscribe(
      (data: any) => {
        this.collegeDetails = data.Value;
        this.setParameter();
      },
      (error: any) => {
        this.alertService.ShowErrorMessage(error);
      }
    );
  }
  getJobroleList() {
    this.addcollegesService.getroleList().subscribe(
      (data: any) => {
        this.roleDetails = data.Value;
        this.setParameter();
      },
      (error: any) => {
        this.alertService.ShowErrorMessage(error);
      }
    );
  }
  getCollegeList() {
    this.addcollegesService.getCollegeList().subscribe(
      (data: any) => {
        this.collegeroleDetails = data.Value;
        this.setParameter();
      },
      (error: any) => {
        this.alertService.ShowErrorMessage(error);
      }
    );
  }
  getAllStates() {
    this.addcollegesService.getAllStates().subscribe(
      (result) => {
        let data = result.Value;
        this.StateList = data
        this.setParameter();
      }, (error) => {

      });
  }

  insertCollegeDetails() {
    this.collegeContactDetails.addcollegesDetails.addedBy = 1;
    this.collegeContactDetails.addcollegesDetails.addedDate = new Date();
    this.collegeContactDetails.addcollegesDetails.updatedBy = 1;
    this.collegeContactDetails.addcollegesDetails.updatedDate = new Date();
    this.collegeContactDetails.addcollegesDetails.collegeId = 0;

    this.addcollegesService.insertCollegesData(this.collegeContactDetails).subscribe(
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
    this.router.navigateByUrl('tds/counsellor-dashboard/colleges');
  }
}

// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
// import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { AddcollegesService } from './addcolleges.service';
// import { AddcollegesDetails, CollegeContactDetails, ContactDetails, DepartmentDetails } from './addcolleges.model';
// import { AlertService } from 'src/app/core/services/alertService';
// import { MessageService } from 'src/app/core/services/message.service';
// import { ResponseCode } from 'src/app/core/models/responseObject.model';

// @Component({
//   selector: 'app-add-collegs',
//   templateUrl: './add-collegs.component.html',
//   styleUrls: ['./add-collegs.component.scss']
// })
// export class AddCollegsComponent implements OnInit {
//   collegeContactDetails: CollegeContactDetails = new CollegeContactDetails();
//   collegeForm: FormGroup;
//   contactForm: FormGroup;
//   departmentForm: FormGroup;
//   form = new FormGroup({});
//   model: any = {};
//   options: FormlyFormOptions = {};
//   fields: FormlyFieldConfig[];
//   contactFields: FormlyFieldConfig[];
//   departmentFields: FormlyFieldConfig[];
//   branchDetails: any;
//   roleDetails: any;
//   StateList: any;
// contactDetails: any[] = [];
//departmentDetails: any[] = [];
// collegeroleDetails: any[] = [];
// contactDetails: ContactDetails[] = [];
// departmentDetails: DepartmentDetails[] = [];

// constructor(
//   private router: Router,
//   private formBuilder: FormBuilder,
//   private modalService: NgbModal,
//   private alertService: AlertService,
//   private messageService: MessageService,
//   private addcollegesService: AddcollegesService
// ) { }

// ngOnInit(): void {
//   this.createContactForm();
//   this.createDepartmentForm();
//   this.getBranchDetails();
//   this.getJobroleList();
//   this.getCollegeList();
//   this.getAllStates();
// }

// setParameter() {
//   this.fields = [
//     {
//       fieldGroupClassName: 'row card-body p-2',
//       fieldGroup: [
//         {
//           className: 'col-md-3',
//           type: 'input',
//           key: 'CollegeName',
//           props: {
//             placeholder: 'College Name',
//             type: 'text',
//             label: 'College Name',
//             required: true,
//           },
//           hooks: {
//             onInit: (field) => {
//               field.formControl.valueChanges.subscribe(value => {
//                 const sanitizedValue = value.replace(/[^A-Za-z ]/g, '');
//                 const capitalizedValue = sanitizedValue.replace(/\b\w/g, char => char.toUpperCase());
//                 if (value !== capitalizedValue) {
//                   field.formControl.setValue(capitalizedValue, { emitEvent: false });
//                 }
//               });
//             }
//           },
//           validation: {
//             messages: {
//               required: 'College Name is required',
//               pattern: 'Please enter a valid name with letters only.',
//             },
//           },
//         },
//         {
//           className: 'col-md-3',
//           key: 'CollegeAddress',
//           type: 'input',
//           props: {
//             label: 'College Address',
//             placeholder: 'Address Line 1',
//             required: true,
//           },
//           hooks: {
//             onInit: (field) => {
//               field.formControl.valueChanges.subscribe(value => {
//                 const formattedValue = value.replace(/\b\w/g, char => char.toUpperCase());
//                 if (formattedValue !== value) {
//                   field.formControl.setValue(formattedValue, { emitEvent: false });
//                 }
//               });
//             }
//           },
//           validation: {
//             messages: {
//               required: 'College Address is required',
//             },
//           },
//         },
//         {
//           className: 'col-md-3',
//           key: 'City',
//           type: 'input',
//           props: {
//             label: 'City',
//             placeholder: 'City',
//             required: true,
//           },
//           hooks: {
//             onInit: (field) => {
//               field.formControl.valueChanges.subscribe(value => {
//                 const sanitizedValue = value.replace(/[^A-Za-z ]/g, '');
//                 const capitalizedValue = sanitizedValue.replace(/\b\w/g, char => char.toUpperCase());
//                 if (value !== capitalizedValue) {
//                   field.formControl.setValue(capitalizedValue, { emitEvent: false });
//                 }
//               });
//             }
//           },
//           validation: {
//             messages: {
//               required: 'City is required',
//             },
//           },
//         },
//         {
//           className: 'col-md-3',
//           key: 'District',
//           type: 'input',
//           props: {
//             label: 'District',
//             placeholder: 'District',
//             required: true,
//           },
//           hooks: {
//             onInit: (field) => {
//               field.formControl.valueChanges.subscribe(value => {
//                 const sanitizedValue = value.replace(/[^A-Za-z ]/g, '');
//                 const capitalizedValue = sanitizedValue.replace(/\b\w/g, char => char.toUpperCase());
//                 if (value !== capitalizedValue) {
//                   field.formControl.setValue(capitalizedValue, { emitEvent: false });
//                 }
//               });
//             }
//           },
//           validation: {
//             messages: {
//               required: 'District is required',
//             },
//           },
//         },
//         {
//           className: 'col-md-3',
//           type: 'select',
//           key: 'StateId',
//           props: {
//             label: 'State Name',
//             required: true,
//             options: [
//               { value: null, label: 'Select State', disabled: true },
//               ...this.StateList ? this.StateList.map(state => ({
//                 label: state.StateName,
//                 value: state.StateId
//               })) : [],
//             ],
//           },
//           defaultValue: null,
//           validators: {
//             required: {
//               expression: (c: AbstractControl) => c.value !== null && c.value !== '',
//               message: 'State is required',
//             },
//           },
//           validation: {
//             messages: {
//               required: 'State is required',
//             },
//           },
//         },
//         {
//           className: 'col-md-3',
//           key: 'Pincode',
//           type: 'input',
//           props: {
//             label: 'Postal Code',
//             placeholder: 'Enter Postal Code',
//             required: true,
//             maxLength: 6,
//             minLength: 6
//           },
//           hooks: {
//             onInit: (field) => {
//               field.formControl.valueChanges.subscribe(value => {
//                 const sanitizedValue = value.replace(/[^0-9]/g, '');
//                 if (sanitizedValue !== value) {
//                   field.formControl.setValue(sanitizedValue, { emitEvent: false });
//                 }
//               });
//             },
//           },
//           validators: {
//             pincode: {
//               expression: (c: AbstractControl) => {
//                 const value = c.value;
//                 return value && /^[0-9]{6}$/.test(value);
//               },
//               message: (error: any, field: FormlyFieldConfig) => {
//                 return `"${field.formControl.value}" is not a valid 6-digit Pincode`;
//               },
//             },
//           },
//           validation: {
//             messages: {
//               required: 'Postal Code is required',
//             },
//           },
//         },
//       ],
//     }
//   ];

//   this.contactFields = [
//     {
//       fieldGroupClassName: 'row',
//       fieldGroup: [
//         {
//           className: 'col-md-3',
//           type: 'input',
//           key: 'Name',
//           props: {
//             label: 'Name',
//             required: true,
//           },
//           hooks: {
//             onInit: (field) => {
//               field.formControl.valueChanges.subscribe(value => {
//                 const sanitizedValue = value.replace(/[^A-Za-z ]/g, '');
//                 const capitalizedValue = sanitizedValue.replace(/\b\w/g, char => char.toUpperCase());
//                 if (value !== capitalizedValue) {
//                   field.formControl.setValue(capitalizedValue, { emitEvent: false });
//                 }
//               });
//             }
//           },
//           validation: {
//             messages: {
//               required: 'Name is required',
//             },
//           },
//         },
//         {
//           className: 'col-md-3',
//           type: 'input',
//           key: 'PhoneNumber',
//           props: {
//             label: 'Phone Number',
//             placeholder: 'Enter Phone Number',
//             required: true,
//             maxLength: 10,
//             minLength: 10
//           },
//           hooks: {
//             onInit: (field) => {
//               field.formControl.valueChanges.subscribe(value => {
//                 const sanitizedValue = value.replace(/[^0-9]/g, '');
//                 if (sanitizedValue !== value) {
//                   field.formControl.setValue(sanitizedValue, { emitEvent: false });
//                 }
//               });
//             },
//           },
//           validators: {
//             phone: {
//               expression: (c: AbstractControl) => {
//                 const value = c.value;
//                 return value && /^[0-9]{10}$/.test(value);
//               },
//               message: (error: any, field: FormlyFieldConfig) => {
//                 return `"${field.formControl.value}" is not a valid 10-digit phone number`;
//               },
//             },
//           },
//           validation: {
//             messages: {
//               required: 'Phone Number is required',
//             },
//           },
//         },
//         {
//           className: 'col-md-3',
//           type: 'input',
//           key: 'Email',
//           props: {
//             label: 'Email',
//             required: true,
//           },
//           validation: {
//             messages: {
//               required: 'Email is required',
//               email: 'Please enter a valid email address.',
//             },
//           },
//         },
//         {
//           className: 'col-md-3',
//           type: 'select',
//           key: 'RoleId',
//           props: {
//             label: 'Role Name',
//             required: true,
//             options: [
//               { value: null, label: 'Select Role', disabled: true },
//               ...this.roleDetails ? this.roleDetails.map(role => ({
//                 label: role.JobRoleName,
//                 value: role.RoleId
//               })) : [],
//             ],
//           },
//           defaultValue: null,
//           validators: {
//             required: {
//               expression: (c: AbstractControl) => c.value !== null && c.value !== '',
//               message: 'Role is required',
//             },
//           },
//           validation: {
//             messages: {
//               required: 'Role is required',
//             },
//           },
//         },
//       ]
//     }
//   ];

//   this.departmentFields = [
//     {
//       fieldGroupClassName: 'row',
//       fieldGroup: [
//         {
//           className: 'col-md-3',
//           type: 'select',
//           key: 'CourseId',
//           props: {
//             label: 'Course Name',
//             required: true,
//             options: [
//               { value: null, label: 'Select Course', disabled: true },
//               ...this.branchDetails ? this.branchDetails.map(branch => ({
//                 label: branch.BranchName,
//                 value: branch.BranchId
//               })) : [],
//             ],
//           },
//           defaultValue: null,
//           validators: {
//             required: {
//               expression: (c: AbstractControl) => c.value !== null && c.value !== '',
//               message: 'Course is required',
//             },
//           },
//           validation: {
//             messages: {
//               required: 'Course is required',
//             },
//           },
//         },
//         {
//           className: 'col-md-3',
//           type: 'input',
//           key: 'Seats',
//           props: {
//             label: 'Seats',
//             required: true,
//           },
//           validation: {
//             messages: {
//               required: 'Seats are required',
//             },
//           },
//         }
//       ]
//     }
//   ];
// }

// getBranchDetails() {
//   this.addcollegesService.getBranchList().subscribe(
//     (result: any) => {
//       this.branchDetails = result;
//       this.setParameter();
//     },
//     (error: any) => {
//       this.alertService.ShowErrorMessage(error);
//     }
//   );
// }

// getJobroleList() {
//   this.addcollegesService.getroleList().subscribe(
//     (result: any) => {
//       this.roleDetails = result;
//       this.setParameter();
//     },
//     (error: any) => {
//       this.alertService.ShowErrorMessage(error);
//     }
//   );
// }

// getCollegeList() {
//   this.addcollegesService.getCollegeList().subscribe(
//     (result: any) => {
//       this.setParameter();
//     },
//     (error: any) => {
//       this.alertService.ShowErrorMessage(error);
//     }
//   );
// }

// getAllStates() {
//   this.addcollegesService.getAllStates().subscribe(
//     (result) => {
//       let data = result.Value;
//       this.StateList = data
//       this.setParameter();
//     }, (error) => {

//     });
// }

// createContactForm() {
//   this.contactForm = this.formBuilder.group({
//     ContactArray: this.formBuilder.array([]),
//   });
// }

// addContact(): void {
//   if (this.contactForm.valid) {
//     this.contactDetails.push(this.contactForm.value);
//     this.contactForm.reset();
//     this.modalService.dismissAll();
//   } else {
//     this.alertService.ShowErrorMessage("Please fill all required fields.");
//   }
// }

// createDepartmentForm() {
//   this.departmentForm = this.formBuilder.group({
//     DepartmentArray: this.formBuilder.array([]),
//   });
// }

// addDepartment(): void {
//   if (this.departmentForm.valid) {
//     this.departmentDetails.push(this.departmentForm.value);
//     this.departmentForm.reset();
//     this.modalService.dismissAll();
//     this.router.navigateByUrl('tds/counsellor-dashboard/colleges/add-collegs');
//   } else {
//     this.alertService.ShowErrorMessage("Please fill all required fields.");
//   }
// }
// getJobroleList() {
//   this.addcollegesService.getroleList().subscribe(
//     (data: any) => {
//       this.roleDetails = data.Value;
//       this.setParameter();
//     },
//     (error: any) => {
//       this.alertService.ShowErrorMessage(error);
//     }
//   );
// }
// getCollegeList() {
//   this.addcollegesService.getCollegeList().subscribe(
//     (data: any) => {
//       this.collegeroleDetails = data.Value;
//       this.setParameter();
//     },
//     (error: any) => {
//       this.alertService.ShowErrorMessage(error);
//     }
//   );
// }

// onSubmit(): void {
//   this.form.markAllAsTouched();
//   if (this.form.valid) {
//     console.log(this.departmentDetails);
//     console.log( this.contactDetails);
//      console.log(this.collegeContactDetails)
//     this.insertCollegeDetails();
//   } else {
//     this.alertService.ShowErrorMessage('Please fill in all required fields.');
//   }
// }

// onCancelClick() {
//   this.router.navigateByUrl('tds/counsellor-dashboard/colleges');
// }
// insertCollegeDetails() {
//   // this.collegeContactDetails.addcollegesDetails = new AddcollegesDetails();
//   // this.collegeContactDetails.addcollegesDetails.addedBy = 1;
//   // this.collegeContactDetails.addcollegesDetails.addedDate = new Date();
//   // this.collegeContactDetails.addcollegesDetails.updatedBy = 1;
//   // this.collegeContactDetails.addcollegesDetails.updatedDate = new Date();
//   // this.collegeContactDetails.addcollegesDetails.collegeId = 0;

//   const addcollegesDetails = new AddcollegesDetails();
//   addcollegesDetails.addedBy = 1;
//   addcollegesDetails.addedDate = new Date();
//   addcollegesDetails.updatedBy = 1;
//   addcollegesDetails.updatedDate = new Date();
//   addcollegesDetails.collegeId = 0;

//   const collegeContactDetails = {
//     addcollegesDetails: addcollegesDetails,
//     contactDetails: this.contactDetails,
//     departmentDetails: this.departmentDetails,
//   };

//   this.addcollegesService.insertCollegesData(this.collegeContactDetails).subscribe(
//     (result: any) => {
//       const serviceResponse = result.Value;
//       if (serviceResponse === ResponseCode.Success) {
//         this.alertService.ShowSuccessMessage(this.messageService.savedSuccessfully);
//       } else {
//         this.alertService.ShowErrorMessage('An error occurred');
//       }
//     },
//     (error: any) => {
//       this.alertService.ShowErrorMessage(error);
//     }
//   );
// }

//   backToList() {
//     this.router.navigate(['institute/institute-list']);
//   }
// }
// }
