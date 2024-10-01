import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { AlertService } from 'src/app/core/services/alertService';
import { MessageService } from 'src/app/core/services/message.service';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';
import { AddstudentService } from './addstudent.service';
import { studentDetailsModel } from './addstudent.model';
import { ResponseCode } from 'src/app/core/models/responseObject.model';

@Component({
  selector: 'app-student-add',
  templateUrl: './student-add.component.html',
  styleUrls: ['./student-add.component.scss']
})
export class StudentAddComponent implements OnInit {

  studentDetails:studentDetailsModel = new studentDetailsModel();
  form = new FormGroup({});
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[];
  editData: any;

  constructor(
    private router: Router,
    private addstudentService: AddstudentService,
    private alertService: AlertService,
    private messageService: MessageService,
    private activateRoute: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.setFields();
    this.editData = this.activateRoute.snapshot.queryParams;
    if (this.editData.source === 'edit' && this.editData.StudentId) {
      this.getAddStudentDetails(this.editData.StudentId);
    }
  }


  setFields() {
    this.fields = [
      {
        fieldGroupClassName: 'row card-body p-2',
        fieldGroup: [
          {
            className: 'col-md-3',
            key: 'StudentName',
            type: 'input',
            props: {
              label: 'Student Name',
              placeholder: 'Enter Student Name',
              required: true,
            },
            validation: {
              messages: {
                required: 'Student Name is required',
              },
            },
          },
          {
            className: 'col-md-3',
            key: 'StudentEmail',
            type: 'input',
            props: {
              label: 'Student Email',
              placeholder: 'Enter Student Email',
              required: true,
            },
            validation: {
              messages: {
                required: 'Student Email is required',
              },
            },
          },
          {
            className: 'col-md-3',
            type: 'file',
            key: 'file',
            props: {
              placeholder: 'Student Photo',
             // type: 'text',
              label: "Student Photo",
              required: true,

            },
            // validation: {
            //   messages: {
            //     required: 'Upload Brochure is required',

            //   },
            // },
          },
          {
            className: 'col-md-3',
            key: 'StudentPhone',
            type: 'input',
            props: {
              label: 'Student Phone',
              placeholder: 'Enter Student Phone',
              required: true,
            },
            validation: {
              messages: {
                required: 'Student Phone is required',
              },
            },
          },
          {
            className: 'col-md-3',
            key: 'AadharNumber',
            type: 'input',
            props: {
              label: 'Aadhar Number',
              placeholder: 'Enter Aadhar Number',
              required: true,
            },
            validation: {
              messages: {
                required: 'Aadhar Number is required',
              },
            },
          },
          {
            className: 'col-md-3',
            key: 'DateofBirth',
            type: 'input',
            props: {
              label: 'Date of Birth',
              placeholder: 'Enter Date of Birth',
              type: 'date',
              required: true,
            },
            validation: {
              messages: {
                required: 'Date of Birth is required',
              },
            },
          },
          {
            className: 'col-md-3',
            key: 'Education',
            type: 'select',
            props: {
              label: 'Education',
              placeholder: 'Select Education Level',
              required: true,
              options: [
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
            validation: {
              messages: {
                required: 'Education Level is required',
              },
            },
          },
          {
            className: 'col-md-3',
            key: 'BloodGroup',
            type: 'select',
            props: {
              label: 'Blood Group',
              placeholder: 'Select Blood Group',
              required: true,
              options: [
                { value: 'A+', label: 'A+' },
                { value: 'A-', label: 'A-' },
                { value: 'B+', label: 'B+' },
                { value: 'B-', label: 'B-' },
                { value: 'AB+', label: 'AB+' },
                { value: 'AB-', label: 'AB-' },
                { value: 'O+', label: 'O+' },
                { value: 'O-', label: 'O-' },
                { value: 'HH', label: 'HH' },
              ],
            },
            validation: {
              messages: {
                required: 'Blood Group is required',
              },
            },
          },
          {
            className: 'col-md-3',
            key: 'Gender',
            type: 'select',
            props: {
              label: 'Gender',
              placeholder: 'Select Gender',
              required: true,
              options: [
                { value: 'male', label: 'Male' },
                { value: 'female', label: 'Female' },
                { value: 'other', label: 'Other' },
              ],
            },
            validation: {
              messages: {
                required: 'Gender is required',
              },
            },
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
                key: 'Town',
                templateOptions: {
                  label: 'Town',
                  placeholder: 'Enter Address',
                  required: true,
                },
                validation: {
                  messages: {
                    required: 'Address Line is required',
                  },
                },
              },
              {
                className: 'col-md-3',
                type: 'input',
                key: 'City',
                templateOptions: {
                  label: 'City / District',
                  placeholder: 'Enter Your City',
                  required: true,
                },
                validation: {
                  messages: {
                    required: 'city is required',
                  },
                },
              },
              {
                className: 'col-md-3',
                type: 'input',
                key: 'State',
                templateOptions: {
                  label: 'State / Province',
                  placeholder: 'Enter Your State',
                  required: true,
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
                  placeholder: 'Enter Your State',
                  required: true,
                },
                validation: {
                  messages: {
                    required: 'State is required',
                  },
                },
              },
            ]
          },
          {
            className: 'col-md-3',
            type: 'checkbox',
            key: 'SameAsCurrentAddress',
            templateOptions: {
              label: 'Same As Current Address',
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
          {
            fieldGroupClassName: 'row card-body p-2',
            fieldGroup: [
              {
                className: 'col-md-3',
                type: 'input',
                key: 'Town',
                templateOptions: {
                  label: 'Town',
                  placeholder: 'Enter Address',
                  required: true,
                },
                validation: {
                  messages: {
                    required: 'Address Line is required',
                  },
                },
              },
              {
                className: 'col-md-3',
                type: 'input',
                key: 'City',
                templateOptions: {
                  label: 'City / District',
                  placeholder: 'Enter Your City',
                  required: true,
                },
                validation: {
                  messages: {
                    required: 'city is required',
                  },
                },
              },
              {
                className: 'col-md-3',
                type: 'input',
                key: 'State',
                templateOptions: {
                  label: 'State / Province',
                  placeholder: 'Enter Your State',
                  required: true,
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
                  placeholder: 'Enter Your State',
                  required: true,
                },
                validation: {
                  messages: {
                    required: 'State is required',
                  },
                },
              },
            ]
          },
          {
            template: `
              <label class="row d-flex" style="margin-left: 5px;">
                <h6 class="p-3 mb-2">
                <span data-toggle="tooltip" title="Close">
                <i class="uil uil-multiply"></i> &nbsp;
              </span>
                  <b>
                    Parent's Detail
                  </b>
                </h6>
                <hr style="border: 1px solid rgb(230, 230, 230); margin-top: 10px; margin-bottom: 10px;">
              </label>
            `,
          },
          {
            fieldGroupClassName: 'row card-body p-2',
            fieldGroup: [
              {
                className: 'col-md-3',
                type: 'input',
                key: 'FatherName',
                templateOptions: {
                  label: 'Father Name',
                  placeholder: 'Enter Your Full Name',
                  required: true,
                },
                validation: {
                  messages: {
                    required: 'Name is required',
                  },
                },
              },
              {
                className: 'col-md-3',
                type: 'input',
                key: 'FatherOccupation',
                templateOptions: {
                  label: 'Father Occupation',
                  placeholder: 'Enter Your Occupation',
                  required: true,
                },
                validation: {
                  messages: {
                    required: 'Occupation is required',
                  },
                },
              },
              {
                className: 'col-md-3',
                type: 'input',
                key: 'FatherPhone',
                templateOptions: {
                  label: 'Father Phone',
                  placeholder: 'Enter Your Phone Number',
                  required: true,
                },
                validation: {
                  messages: {
                    required: 'Phone Number is required',
                  },
                },
              },
              {
                className: 'col-md-3',
                type: 'input',
                key: 'MotherName',
                templateOptions: {
                  label: 'Mother Name',
                  placeholder: 'Enter Your Full Name',
                  required: true,
                },
                validation: {
                  messages: {
                    required: 'Name is required',
                  },
                },
              },
              {
                className: 'col-md-3',
                type: 'input',
                key: 'MotherOccupation',
                templateOptions: {
                  label: 'Mother Occupation',
                  placeholder: 'Enter Your Occupation',
                  required: true,
                },
                validation: {
                  messages: {
                    required: 'Occupation is required',
                  },
                },
              },
              {
                className: 'col-md-3',
                type: 'input',
                key: 'MotherPhone',
                templateOptions: {
                  label: 'Mother Phone',
                  placeholder: 'Enter Your Phone Number',
                  required: true,
                },
                validation: {
                  messages: {
                    required: 'Phone Number is required',
                  },
                },
              },
              {
                className: 'col-md-3',
                key: 'StudentRole',
                type: 'select',
                props: {
                  label: 'Student Role',
                  placeholder: 'Select Role',
                  //required: true,
                  options: [
                    { value: 'Student', label: 'Student' },
                    { value: 'Intern', label: 'Intern'},
                  ],
                },
                validation: {
                  messages: {
                    required: 'Role is required',
                  },
                },
              },
              {
                className: 'col-md-3',
                type: 'select',
                key: 'IsActive',
                props: {
                  placeholder: 'Student Status',
                  required: true,
                  type: 'text',
                  label: "Student Status",
                  options: [
                    { label: 'Active', value: 'true' },
                    { label: 'Inactive', value: 'false' }
                  ]
                },
              },

            ]
          }

        ],
      },
    ];
  }
  onCancleClick() {
    this.router.navigateByUrl('erp/student-management/add-student');
  }
  onResetClick() {
    this.form.reset();
  }
  onSubmit(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.insertStudentDetails();
    } else {
      this.alertService.ShowErrorMessage('Please fill in all required fields.');
    }
  }
  insertStudentDetails() {
    this.addstudentService.insertStudentDetails(this.studentDetails).subscribe(
      (result: any) => {
        const serviceResponse = result.Value;
        if (serviceResponse === ResponseCode.Success) {
          this.alertService.ShowSuccessMessage(this.messageService.savedSuccessfully);
        } else if (serviceResponse === ResponseCode.Update) {
          this.alertService.ShowSuccessMessage(this.messageService.updateSuccessfully);
        } else {
          this.alertService.ShowErrorMessage(this.messageService.serviceError);
        }
        this.router.navigateByUrl('erp/student-management/add-student');
      },
      (error: any) => {
        this.alertService.ShowErrorMessage(error);
      }
    );
  }
  getAddStudentDetails(StudentId: number) {
    this.addstudentService.getStudentList(StudentId).subscribe(
      (result: any) => {
        if (result && result.Value) {
          this.studentDetails = result.Value.Item1;
          this.setFields();
          console.error('No data found for StudentId: ' + StudentId);
        }
      },
      (error: any) => {
        console.error('Error retrieving practical details:', error);
      }
    );
  }

}
