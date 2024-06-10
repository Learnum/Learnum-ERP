import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { AlertService } from 'src/app/core/services/alertService';
import { MessageService } from 'src/app/core/services/message.service';
import { FormGroup, FormBuilder,Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-add-meeting',
  templateUrl: './add-meeting.component.html',
  styleUrls: ['./add-meeting.component.scss']
})
export class AddMeetingComponent implements OnInit {

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
      collegeName: ['', Validators.required],
      meetingWith: ['', Validators.required],
      meetingDate: ['', Validators.required],
      meetingTime: ['', Validators.required],
      meetingLocation: ['', Validators.required],
      meetingAgenda: ['', Validators.required],
    });
  }

  setFields() {
    this.fields = [
      {
        fieldGroupClassName: 'row card-body p-2',
        fieldGroup: [
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
            key: 'meetingWith',
            type: 'select',
            props: {
              label: 'Meeting with',
              placeholder: 'Select Person',
              required: true,
              options: [
                { value: 'person1', label: 'Person 1' },
                { value: 'person2', label: 'Person 2' },
                { value: 'person3', label: 'Person 3' },
              ],
            },
            validation: {
              messages: {
                required: 'Meeting with is required',
              },
            },
          },
          {
            className: 'col-md-6',
            key: 'meetingDate',
            type: 'input',
            props: {
              label: 'Meeting Date',
              placeholder: 'Select Meeting Date',
              type: 'date',
              required: true,
            },
            validation: {
              messages: {
                required: 'Meeting Date is required',
              },
            },
          },
          {
            className: 'col-md-6',
            key: 'meetingTime',
            type: 'input',
            props: {
              label: 'Meeting Time',
              placeholder: 'Select Meeting Time',
              type: 'time',
              required: true,
            },
            validation: {
              messages: {
                required: 'Meeting Time is required',
              },
            },
          },
          {
            className: 'col-md-6',
            key: 'meetingLocation',
            type: 'input',
            props: {
              label: 'Meeting Location',
              placeholder: 'Enter Meeting Location',
              required: true,
            },
            validation: {
              messages: {
                required: 'Meeting Location is required',
              },
            },
          },
          {
            className: 'col-md-6',
            key: 'meetingAgenda',
            type: 'input',
            props: {
              label: 'Meeting Agenda',
              placeholder: 'Enter Meeting Agenda',
              required: true,
              // attributes: {
              //   class: 'square-input'
              // }
            },
            validation: {
              messages: {
                required: 'Meeting Agenda is required',
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
    this.router.navigateByUrl('tds/counsellor-dashboard/schedule-meeting-with-college');
  }

}
