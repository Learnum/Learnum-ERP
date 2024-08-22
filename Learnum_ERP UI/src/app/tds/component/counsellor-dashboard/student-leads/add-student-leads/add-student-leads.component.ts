import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { AlertService } from 'src/app/core/services/alertService';
import { MessageService } from 'src/app/core/services/message.service';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { StudentleadsService } from './studentleads.service';
import { StudentLeadDetails } from './studentleads.model';
import { ResponseCode } from 'src/app/core/models/responseObject.model';
@Component({
  selector: 'app-add-student-leads',
  templateUrl: './add-student-leads.component.html',
  styleUrls: ['./add-student-leads.component.scss']
})
export class AddStudentLeadsComponent implements OnInit {

  studentLeadDetails: StudentLeadDetails = new StudentLeadDetails();
  form = new FormGroup({});
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[];
  branchDetails: any;
  collegeDetails: any;
  editData: any;
  StateList: any;

  constructor(
    private router: Router,
    private alertService: AlertService,
    private messageService: MessageService,
    private activateRoute: ActivatedRoute,
    private studentleadsService: StudentleadsService) { }

  ngOnInit(): void {
    this.setParameter();
    this.getBranchDetails();
    this.getCollegeDetails();
    this.getAllStates();
    this.editData = this.activateRoute.snapshot.queryParams;
    if (this.editData.source === 'edit' && this.editData.StudentId) {
      this.getStudentDetails(this.editData.StudentId);
    }
   
  }

  setParameter() {
    this.fields = [
      {
        fieldGroupClassName: 'row card-body p-2',
        fieldGroup: [
          {
            key: 'studentId',
          },
          {
            className: 'col-md-3',
            key: 'StudentName',
            type: 'input',
            props: {
              label: 'Student Name',
              placeholder: 'Enter Student Name',
              pattern: '^[A-Za-z ]+$',
              required: true,
            },
            hooks: {
              onInit: (field) => {
                field.formControl.valueChanges.subscribe(value => {
                  let sanitizedValue = value.replace(/[0-9]/g, '').replace(/\b\w/g, char => char.toUpperCase());
                  if (value !== sanitizedValue) {
                    field.formControl.setValue(sanitizedValue, { emitEvent: false });
                  }
                });
              }
            },
            validation: {
              messages: {
                required: 'Student Name is required',
                pattern: 'Please enter a valid Student Name',
              },
            },
          },   
          {
            className: 'col-md-3',
            type: 'select',
            key: 'CollegeId',
            templateOptions: {
              label: "College Name",
             // placeholder: 'Select College',  // Placeholder for the dropdown
              required: true,
              options: [
                { value: null, label: 'Select College', disabled: true },  // Disabled placeholder option
                ...this.collegeDetails ? this.collegeDetails.map(college => ({
                  label: college.CollegeName,
                  value: college.CollegeId
                })) : [],
              ]
            },
            defaultValue: null,  // Optional: set a default value if needed
            validators: {
              required: {
                expression: (c: AbstractControl) => c.value !== null && c.value !== '', // Ensure a valid value is selected
                message: 'College selection is required',
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
            type: 'select',
            key: 'BranchId',
            templateOptions: {
              label: "Branch Name",
              //placeholder: 'Select Branch Name',  // Placeholder for the dropdown
              required: true,
              options: [
                { value: null, label: 'Select Branch Name', disabled: true },  // Disabled placeholder option
                ...this.branchDetails ? this.branchDetails.map(branch => ({ label: branch.BranchName, value: branch.BranchId })) : [],
              ]
            },
            defaultValue: null,  // Optional: set a default value if needed
            validators: {
              required: {
                expression: (c: AbstractControl) => c.value !== null && c.value !== '', // Ensure a valid value is selected
                message: 'Branch Name is required',
              },
            },
            validation: {
              messages: {
                required: 'Branch Name is required',
              },
            },
          },
          
          {
            className: 'col-md-3',
            key: 'StudentPhone',
            type: 'input',
            templateOptions: {
              label: 'Student Phone',
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
          },
          {
            className: 'col-md-3',
            key: 'ParentPhone',
            type: 'input',
            templateOptions: {
              label: 'Parent Phone',
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
          },
          {
            className: 'col-md-3',
            type: 'input',
            key: 'Address',
            props: {
              placeholder: 'Enter Your Address',
              type: 'text',
              label: "Address",
              required: true,
              pattern: '^[A-Za-z0-9\\s.,#-]*$',
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
            },
            validation: {
              messages: {
                required: 'Address is required',
                pattern: 'Please enter a valid Address',
              },
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
          // {
          //   className: 'col-md-3',
          //   type: 'input',
          //   key: 'PostalCode',
          //   props: {
          //     label: 'PIN code',
          //     required: true,
          //     type: 'number',
          //     placeholder: 'Postal Code',
          //   },
          //   validators: {
          //     ip: {
          //       expression: (c: AbstractControl) => !c.value || /^[1-9][0-9]{5}$/.test(c.value),
          //       message: (error: any, field: FormlyFieldConfig) => `"${field.formControl.value}" is not a valid Pincode`,
          //     },
          //   },
          // },
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
          {
            className: 'col-md-3',
            type: 'select',
            key: 'LeadSource',
            templateOptions: {
              label: 'Lead Source',
              // placeholder: 'Select Lead Source',
              required: true,
              options: [
                { value: null, label: 'Select Lead Source', disabled: true }, // Disabled placeholder option
                { value: 'collegeSeminar', label: 'College Seminar' },
                { value: 'friends', label: 'Friends' },
                { value: 'mailCampaign', label: 'Mail Campaign' },
                { value: 'onlineAd', label: 'Online Ad' },
                { value: 'direct', label: 'Direct' },
                { value: 'family', label: 'Family' },
                { value: 'other', label: 'Other' },
              ],
            },
            defaultValue: null,
            validators: {
              required: {
                expression: (c: AbstractControl) => c.value !== null && c.value !== '', // Ensure a valid value is selected
                message: 'Lead Source is required',
              },
            },
            validation: {
              messages: {
                required: 'Lead Source is required',
              },
            },
          },
          // {
          //   className: 'col-md-3',
          //   key: 'StudentEmail',
          //   type: 'input',
          //   props: {
          //     label: 'Student Email',
          //     placeholder: 'Enter Student Email',
          //     required: true,
             
          //   },
          //   validation: {
          //     messages: {
          //       required: 'Student Email is required',
          //     },
          //   },
          // },
          {
            className: 'col-md-3',
            key: 'StudentEmail',
            type: 'input',
            props: {
              label: 'Student Email',
              placeholder: 'Enter Student Email',
              required: true,
              pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // Regex pattern for validating email
            },
            validation: {
              messages: {
                required: 'Student Email is required',
                pattern: 'Please enter a valid email address', // Custom message for invalid email
              },
            },
          },
          {
            className: 'col-md-3',
            type: 'select',
            key: 'Education',
            templateOptions: {
              label: 'Education',
              //placeholder: 'Select Education Level',
              required: true,
              options: [
                { value: null, label: 'Select Education Level', disabled: true }, // Disabled placeholder option
                { value: 'FYBcom', label: 'F.Y.Bcom' },
                { value: 'SYBcom', label: 'S.Y.Bcom' },
                { value: 'TYBcom', label: 'T.Y.Bcom' },
                { value: 'Bcom', label: 'B.com' },
                { value: '11th', label: '11th' },
                { value: '12th', label: '12th' },
                { value: 'Mcom', label: 'M.com' },
                { value: 'MBA', label: 'MBA' },
                { value: 'BBA', label: 'BBA' },
                { value: 'BCA', label: 'BCA' },
                { value: 'BCS', label: 'BCS' },
                { value: 'BSC', label: 'BSC' },
                { value: 'other', label: 'Other' },
              ],
            },
            defaultValue: null,
            validators: {
              required: {
                expression: (c: AbstractControl) => c.value !== null && c.value !== '', // Ensure a valid value is selected
                message: 'Education Level is required',
              },
            },
            validation: {
              messages: {
                required: 'Education Level is required',
              },
            },
          },

          {
            className: 'col-md-3',
            type: 'select',
            key: 'Gender',
            templateOptions: {
              label: 'Gender',
              //placeholder: 'Select Gender',
              required: true,
              options: [
                { value: null, label: 'Select Gender', disabled: true }, // Disabled placeholder option
                { value: 'male', label: 'Male' },
                { value: 'female', label: 'Female' },
                { value: 'other', label: 'Other' },
              ],
            },
            defaultValue: null,
            validators: {
              required: {
                expression: (c: AbstractControl) => c.value !== null && c.value !== '', // Ensure a valid value is selected
                message: 'Gender is required',
              },
            },
            validation: {
              messages: {
                required: 'Gender is required',
              },
            },
          }
          ,
        ],
      },
    ];
  }

  onSubmit(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.InsertStudentLeads();
    } else {
      this.alertService.ShowErrorMessage('Please fill in all required fields.');
    }
  }
  onCancleClick() {
    this.router.navigateByUrl('tds/counsellor-dashboard/student-leads');
  }
  onResetClick() {
    this.form.reset();
  }

  navigate()
  {
    this.router.navigateByUrl('tds/counsellor-dashboard/student-leads');
  }

  InsertStudentLeads() {
    this.studentLeadDetails.addedBy = 1;
    this.studentLeadDetails.addedDate = new Date();
    this.studentLeadDetails.updatedBy = 1;
    this.studentLeadDetails.updatedDate = new Date();
    //this.studentLeadDetails.studentId = 0;

    this.studentleadsService.insertStudentLeads(this.studentLeadDetails).subscribe(
      (result: any) => {
        const serviceResponse = result.Value;
        if (serviceResponse === ResponseCode.Success) {
          this.alertService.ShowSuccessMessage(this.messageService.savedSuccessfully);
          this.router.navigateByUrl('tds/counsellor-dashboard/student-leads');

        } else if (serviceResponse === ResponseCode.Update) {
          this.alertService.ShowSuccessMessage(this.messageService.updateSuccessfully);
          this.router.navigateByUrl('tds/counsellor-dashboard/student-leads');

        } else {
          this.alertService.ShowErrorMessage(this.messageService.serviceError);
        }
      },
      (error: any) => {
        this.alertService.ShowErrorMessage(error);
      }
    );
  }

  getBranchDetails() {
    this.studentleadsService.getBranchList().subscribe(
      (data: any) => {
        this.branchDetails = data.Value;
        this.setParameter();
      },
      (error: any) => {
        this.alertService.ShowErrorMessage(error);
      }
    );
  }
  getCollegeDetails() {
    this.studentleadsService.getCollegeList().subscribe(
      (data: any) => {
        this.collegeDetails = data.Value;
        this.setParameter();
      },
      (error: any) => {
        this.alertService.ShowErrorMessage(error);
      }
    );
  }
  getStudentDetails(StudentId: number) {
    this.studentleadsService.getStudentDetails(StudentId).subscribe(
      (result: any) => {
        if (result && result.Value) {
          this.studentLeadDetails = result.Value.Item1;
          this.setParameter();
          console.error('No data found for StudentId: ' + StudentId);
        }
      },
      (error: any) => {
        console.error('Error retrieving student details:', error);
      }
    );
  }

  getAllStates() {
    this.studentleadsService.getAllStates().subscribe(
      (result) => {
        let data = result.Value;
        this.StateList = data
        this.setParameter();
      }, (error) => {

      });
  }
}
