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
  departmentFields:FormlyFieldConfig[];
  roleDetails: any;
  collegeroleDetails:any;
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
            key: 'CollegeName',
            type: 'input',
            props: {
              label: 'College Name',
              placeholder: 'College Name',
              required: true,
            },
            validation: {
              messages: {
                required: 'College Name is required',
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
          }
          ,
          {
            className: 'col-md-3',
            key: 'Pincode',
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
          },,
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
          }
          ,
          
          {
            className: 'col-md-3',
            key: 'CollegeWebsite',
            type: 'input',
            props: {
              label: 'College Website',
              placeholder: 'College Website',
              required: true,
            },
            validation: {
              messages: {
                required: 'College Website is required',
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
            },
            validation: {
              messages: {
                required: 'Branch Name 1 is required',
              },
            },
          },
          {
            className: 'col-md-6',
            key: 'AboutCollege',
            type: 'textarea',
            props: {
              label: 'About College',
              placeholder: 'About College',
              required: true,
              rows: 5
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
        },,
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

    this.departmentFields =[{
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
      console.log( this.contactDetails);
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
    this.collegeContactDetails.addcollegesDetails.collegeId=0;

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
