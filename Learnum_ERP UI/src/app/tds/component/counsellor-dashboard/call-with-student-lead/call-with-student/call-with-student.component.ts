import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { AlertService } from 'src/app/core/services/alertService';
import { MessageService } from 'src/app/core/services/message.service';
import { FormGroup, FormBuilder,Validators, AbstractControl } from '@angular/forms';
@Component({
  selector: 'app-call-with-student',
  templateUrl: './call-with-student.component.html',
  styleUrls: ['./call-with-student.component.scss']
})
export class CallWithStudentComponent implements OnInit {

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
      phone: ['', Validators.required],
      phoneCallDate: ['', Validators.required],
      phoneCallTime: ['', Validators.required],
      branchName: ['', Validators.required],
      leadStatus: ['', Validators.required],
      callConversation: ['', Validators.required],
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
              type: 'tel',
              required: true,
            },
            validation: {
              messages: {
                required: 'Phone is required',
              },
            },
          },
          {
            className: 'col-md-6',
            key: 'phoneCallDate',
            type: 'input',
            props: {
              label: 'Phone Call Date',
              placeholder: 'Select Phone Call Date',
              type: 'date',
              required: true,
            },
            validation: {
              messages: {
                required: 'Phone Call Date is required',
              },
            },
          },
          {
            className: 'col-md-6',
            key: 'phoneCallTime',
            type: 'input',
            props: {
              label: 'Phone Call Time',
              placeholder: 'Select Phone Call Time',
              type: 'time',
              required: true,
            },
            validation: {
              messages: {
                required: 'Phone Call Time is required',
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
            className: 'col-md-6',
            key: 'leadStatus',
            type: 'select',
            props: {
              label: 'Lead Status',
              placeholder: 'Select Lead Status',
              required: true,
              options: [
                { value: 'notConnected', label: 'Not Connected' },
                { value: 'connectInFuture', label: 'Connect In Future' },
                { value: 'junkLead', label: 'Junk Lead' },
                { value: 'prequalified', label: 'Prequalified' },
                { value: 'notQualified', label: 'Not Qualified' },
                { value: 'needCounselling', label: 'Need Counselling' },
                { value: 'needToTalkToParents', label: 'Need To Talk To Parents' },
              ],
            },
            validation: {
              messages: {
                required: 'Lead Status is required',
              },
            },
          },
          {
            //className: 'col-md-6',
            key: 'callConversation',
            type: 'textarea',
            props: {
              label: 'Call Conversation',
              placeholder: 'Enter Call Conversation',
              required: true,
              rows:10
            },
            validation: {
              messages: {
                required: 'Call Conversation is required',
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
    this.router.navigateByUrl('tds/counsellor-dashboard/call-with-student-lead');
  }


}
