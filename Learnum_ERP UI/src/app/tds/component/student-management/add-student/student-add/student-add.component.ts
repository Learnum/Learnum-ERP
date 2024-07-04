import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { AlertService } from 'src/app/core/services/alertService';
import { MessageService } from 'src/app/core/services/message.service';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-student-add',
  templateUrl: './student-add.component.html',
  styleUrls: ['./student-add.component.scss']
})
export class StudentAddComponent implements OnInit {

  form = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[];

  constructor(
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.setFields();
  }


  setFields() {
    this.fields = [
      {
        fieldGroupClassName: 'row card-body p-2',
        fieldGroup: [
          {
            className: 'col-md-4',
            key: 'studentName',
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
            className: 'col-md-4',
            key: 'studentEmail',
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
            className: 'col-md-2',
            key: 'file',
            type: 'file',
            props: {
              label: 'Student Photo',
              placeholder: 'Upload or Choose Photo',
              required: true,
            },
            validation: {
              messages: {
                required: 'Student Photo is required',
              },
            },
          },
          {
            className: 'col-md-4',
            key: 'studentPhone',
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
            className: 'col-md-4',
            key: 'aadharNumber',
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
            className: 'col-md-4',
            key: 'dateOfBirth',
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
            className: 'col-md-4',
            key: 'education',
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
            className: 'col-md-4',
            key: 'bloodGroup',
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
            className: 'col-md-4',
            key: 'gender',
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
                key: 'City',
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
            className: 'col-md-6',
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
                key: 'City',
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
                className: 'col-md-4',
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
                className: 'col-md-4',
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
                className: 'col-md-4',
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
                className: 'col-md-4',
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
                className: 'col-md-4',
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
                className: 'col-md-4',
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
                className: 'col-md-4',
                key: 'StudentRole',
                type: 'select',
                props: {
                  label: 'Student Role',
                  placeholder: 'Select Role',
                  required: true,
                },
                validation: {
                  messages: {
                    required: 'Role is required',
                  },
                },
              },

              {
                className: 'col-md-4',
                key: 'StudentStatus',
                type: 'select',
                props: {
                  label: 'Student Status',
                  placeholder: 'Select Status',
                  required: true,
                  options: [
                    { value: 'active', label: 'Active' },
                    { value: 'inactive', label: 'Inactive' },
                  ],
                },
                validation: {
                  messages: {
                    required: 'Status is required',
                  },
                },
              },

            ]
          }

        ],
      },
    ];
  }



  onSubmit(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      // Handle form submission
    } else {
      // Handle form errors
    }
  }

  onCancelClick() {
    this.router.navigateByUrl('tds/student-management/add-student');
  }

}
