import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { AlertService } from 'src/app/core/services/alertService';
import { MessageService } from 'src/app/core/services/message.service';
import { FormGroup, FormBuilder,Validators, AbstractControl } from '@angular/forms';
@Component({
  selector: 'app-add-student-leads',
  templateUrl: './add-student-leads.component.html',
  styleUrls: ['./add-student-leads.component.scss']
})
export class AddStudentLeadsComponent implements OnInit {

  
  form = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[];

  constructor(
    private router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.setFields();
    this.createForm();
  }

  createForm(): void {
    this.form = this.formBuilder.group({
      studentName: ['', Validators.required],
      collegeName: ['', Validators.required],
      branchName: ['', Validators.required],
      studentPhone: ['', Validators.required],
      parentsPhone: ['', Validators.required],
      address: ['', Validators.required],
      leadSource: ['', Validators.required],
      studentEmail: ['', Validators.required],
      education: ['', Validators.required],
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
            key: 'collegeName',
            type: 'select',
            props: {
              label: 'College Name',
              placeholder: 'Select College Name',
              required: true,
              options: [
                { value: 'college1', label: 'College 1' },
                { value: 'college2', label: 'College 2' },
                { value: 'college3', label: 'College 3' },
              ],
            },
            validation: {
              messages: {
                required: 'College Name is required',
              },
            },
          },
          {
            className: 'col-md-6',
            key: 'branchName',
            type: 'select',
            props: {
              label: 'Branch Name',
              placeholder: 'Select Branch Name',
              required: true,
              options: [
                { value: 'branch1', label: 'Branch 1' },
                { value: 'branch2', label: 'Branch 2' },
                { value: 'branch3', label: 'Branch 3' },
              ],
            },
            validation: {
              messages: {
                required: 'Branch Name is required',
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
            key: 'parentsPhone',
            type: 'input',
            props: {
              label: "Parent's Phone",
              placeholder: "Enter Parent's Phone",
              required: true,
            },
            validation: {
              messages: {
                required: "Parent's Phone is required",
              },
            },
          },
          {
            className: 'col-md-6',
            key: 'address',
            type: 'input',
            props: {
              label: 'Address',
              placeholder: 'Enter Address',
              required: true,
            },
            validation: {
              messages: {
                required: 'Address is required',
              },
            },
          },
          {
            className: 'col-md-6',
            key: 'leadSource',
            type: 'select',
            props: {
              label: 'Lead Source',
              placeholder: 'Select Lead Source',
              required: true,
              options: [
                { value: 'collegeSeminar', label: 'College Seminar' },
                { value: 'friends', label: 'Friends' },
                { value: 'mailCampaign', label: 'Mail Campaign' },
                { value: 'onlineAd', label: 'Online Ad' },
                { value: 'direct', label: 'Direct' },
                { value: 'family', label: 'Family' },
                { value: 'other', label: 'Other' },
              ],
            },
            validation: {
              messages: {
                required: 'Lead Source is required',
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
    this.router.navigateByUrl('tds/counsellor-dashboard/student-leads');
  }

}
