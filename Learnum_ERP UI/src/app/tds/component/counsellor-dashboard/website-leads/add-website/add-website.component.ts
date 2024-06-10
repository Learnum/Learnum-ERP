import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { AlertService } from 'src/app/core/services/alertService';
import { MessageService } from 'src/app/core/services/message.service';
import { FormGroup, FormBuilder,Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-add-website',
  templateUrl: './add-website.component.html',
  styleUrls: ['./add-website.component.scss']
})
export class AddWebsiteComponent implements OnInit {

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
      courseName: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      email: ['', [Validators.required, Validators.email]],
      yourLocation: ['', Validators.required],
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
            key: 'courseName',
            type: 'select',
            props: {
              label: 'Course Name',
              placeholder: 'Select Course Name',
              required: true,
              options: [
                { value: 'course1', label: 'Course 1' },
                { value: 'course2', label: 'Course 2' },
                { value: 'course3', label: 'Course 3' },
              ],
            },
            validation: {
              messages: {
                required: 'Course Name is required',
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
                pattern: 'Phone must be a valid 10-digit number',
              },
            },
          },
          {
            className: 'col-md-6',
            key: 'email',
            type: 'input',
            props: {
              label: 'Email',
              placeholder: 'Enter Email Address',
              type: 'email',
              required: true,
            },
            validation: {
              messages: {
                required: 'Email is required',
                email: 'Email must be a valid email address',
              },
            },
          },
          {
            className: 'col-md-6',
            key: 'yourLocation',
            type: 'input',
            props: {
              label: 'Your Location',
              placeholder: 'Enter Your Location',
              required: true,
            },
            validation: {
              messages: {
                required: 'Your Location is required',
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
    this.router.navigateByUrl('tds/counsellor-dashboard/website-leads');
  }

}
