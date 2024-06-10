import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { AlertService } from 'src/app/core/services/alertService';
import { MessageService } from 'src/app/core/services/message.service';
import { FormGroup, FormBuilder,Validators, AbstractControl } from '@angular/forms';
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
    this.createForm();
  }

  createForm(): void {
    this.form = this.formBuilder.group({
      studentName: ['', Validators.required],
      studentEmail: ['', [Validators.required, Validators.email]],
      studentPhoto: ['', Validators.required],
      studentPhone: ['', Validators.required],
      aadharNumber: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      education: ['', Validators.required],
      bloodGroup: ['', Validators.required],
      gender: ['', Validators.required],
    });
  }

  setFields() {
    this.fields = [
      {
        fieldGroupClassName: 'row card-body p-2',
        fieldGroup: [
          {
            className: 'col-md-6',
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
            className: 'col-md-6',
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
            className: 'col-md-6',
            key: 'file',
            type: 'input',
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
            className: 'col-md-6',
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
            className: 'col-md-6',
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
            className: 'col-md-6',
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
            className: 'col-md-6',
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
            className: 'col-md-6',
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
            className: 'col-md-6',
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
