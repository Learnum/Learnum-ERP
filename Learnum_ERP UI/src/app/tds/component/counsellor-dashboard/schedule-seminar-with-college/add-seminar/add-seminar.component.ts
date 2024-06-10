import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { AlertService } from 'src/app/core/services/alertService';
import { MessageService } from 'src/app/core/services/message.service';
import { FormGroup, FormBuilder,Validators, AbstractControl } from '@angular/forms';
@Component({
  selector: 'app-add-seminar',
  templateUrl: './add-seminar.component.html',
  styleUrls: ['./add-seminar.component.scss']
})
export class AddSeminarComponent implements OnInit {

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
      spockPerson: ['', Validators.required],
      seminarDate: ['', Validators.required],
      seminarTime: ['', Validators.required],
      seminarLocation: ['', Validators.required],
      seminarStatus: ['', Validators.required],
      seminarAgenda: ['', Validators.required],
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
            key: 'spockPerson',
            type: 'select',
            props: {
              label: 'Spock Person',
              placeholder: 'Select Spock Person',
              required: true,
              options: [
                { value: 'person1', label: 'Person 1' },
                { value: 'person2', label: 'Person 2' },
                { value: 'person3', label: 'Person 3' },
              ],
            },
            validation: {
              messages: {
                required: 'Spock Person is required',
              },
            },
          },
          {
            className: 'col-md-6',
            key: 'seminarDate',
            type: 'input',
            props: {
              label: 'Seminar Date',
              placeholder: 'Select Seminar Date',
              type: 'date',
              required: true,
            },
            validation: {
              messages: {
                required: 'Seminar Date is required',
              },
            },
          },
          {
            className: 'col-md-6',
            key: 'seminarTime',
            type: 'input',
            props: {
              label: 'Seminar Time',
              placeholder: 'Select Seminar Time',
              type: 'time',
              required: true,
            },
            validation: {
              messages: {
                required: 'Seminar Time is required',
              },
            },
          },
          {
            className: 'col-md-6',
            key: 'seminarLocation',
            type: 'input',
            props: {
              label: 'Seminar Location',
              placeholder: 'Enter Seminar Location',
              required: true,
            },
            validation: {
              messages: {
                required: 'Seminar Location is required',
              },
            },
          },
          {
            className: 'col-md-6',
            key: 'seminarStatus',
            type: 'select',
            props: {
              label: 'Seminar Status',
              placeholder: 'Select Seminar Status',
              required: true,
              options: [
                { value: 'scheduled', label: 'Scheduled' },
                { value: 'inProgress', label: 'In Progress' },
                { value: 'confirmed', label: 'Confirmed' },
                { value: 'completed', label: 'Completed' },
                { value: 'canceled', label: 'Canceled' },
              ],
            },
            validation: {
              messages: {
                required: 'Seminar Status is required',
              },
            },
          },
          {
            className: 'col-md-6',
            key: 'seminarAgenda',
            type: 'input',
            props: {
              label: 'Seminar Agenda',
              placeholder: 'Enter Seminar Agenda',
              required: true,
            },
            validation: {
              messages: {
                required: 'Seminar Agenda is required',
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
    this.router.navigateByUrl('tds/counsellor-dashboard/schedule-seminar-with-college');
  }

}
