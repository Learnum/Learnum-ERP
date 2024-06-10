import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { AlertService } from 'src/app/core/services/alertService';
import { MessageService } from 'src/app/core/services/message.service';
import { FormGroup, FormBuilder,Validators, AbstractControl } from '@angular/forms';
@Component({
  selector: 'app-counselling-student',
  templateUrl: './counselling-student.component.html',
  styleUrls: ['./counselling-student.component.scss']
})
export class CounsellingStudentComponent implements OnInit {

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
      phone: ['', [Validators.required, Validators.pattern(/^(\+\d{1,3}[- ]?)?\d{10}$/)]],
      counsellingDate: ['', Validators.required],
      counsellingTime: ['', Validators.required],
      counsellingStatus: ['', Validators.required],
      branchName: ['', Validators.required],
      counsellingConversation: ['', Validators.required],
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
            key: 'phone',
            type: 'input',
            props: {
              label: 'Phone',
              placeholder: 'Enter Phone Number',
              required: true,
              pattern: '^(\+\d{1,3}[- ]?)?\d{10}$',
            },
            validation: {
              messages: {
                required: 'Phone is required',
                pattern: 'Enter a valid phone number',
              },
            },
          },
          {
            className: 'col-md-6',
            key: 'counsellingDate',
            type: 'input',
            props: {
              label: 'Counselling Date',
              placeholder: 'Select Counselling Date',
              type: 'date',
              required: true,
            },
            validation: {
              messages: {
                required: 'Counselling Date is required',
              },
            },
          },
          {
            className: 'col-md-6',
            key: 'counsellingTime',
            type: 'input',
            props: {
              label: 'Counselling Time',
              placeholder: 'Select Counselling Time',
              type: 'time',
              required: true,
            },
            validation: {
              messages: {
                required: 'Counselling Time is required',
              },
            },
          },
          {
            className: 'col-md-6',
            key: 'counsellingStatus',
            type: 'select',
            props: {
              label: 'Counselling Status',
              placeholder: 'Select Counselling Status',
              required: true,
              options: [
                { value: 'qualified', label: 'Qualified' },
                { value: 'notQualified', label: 'Not Qualified' },
                { value: 'jnnkLead', label: 'Jnnk Lead' },
                { value: 'notInterested', label: 'Not Interested' },
                { value: 'willJoinInFuture', label: 'Will Join in Future' },
                { value: 'needToTalkWithParents', label: 'Need to Talk With Parents' },
              ],
            },
            validation: {
              messages: {
                required: 'Counselling Status is required',
              },
            },
          },
          {
            className: 'col-md-6',
            key: 'branchName',
            type: 'input',
            props: {
              label: 'Branch Name',
              placeholder: 'Enter Branch Name',
              required: true,
            },
            validation: {
              messages: {
                required: 'Branch Name is required',
              },
            },
          },
          {
            //className: 'col-md-6',
            key: 'counsellingConversation',
            type: 'textarea',
            props: {
              label: 'Counselling Conversation',
              placeholder: 'Enter Counselling Conversation',
              required: true,
              rows: 10,
            },
            validation: {
              messages: {
                required: 'Counselling Conversation is required',
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
    this.router.navigateByUrl('tds/counsellor-dashboard/counselling-with-student');
  }


}
