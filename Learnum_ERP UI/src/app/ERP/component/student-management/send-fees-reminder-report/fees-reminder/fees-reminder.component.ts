import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { AlertService } from 'src/app/core/services/alertService';
import { MessageService } from 'src/app/core/services/message.service';
import { FormGroup, FormBuilder,Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-fees-reminder',
  templateUrl: './fees-reminder.component.html',
  styleUrls: ['./fees-reminder.component.scss']
})
export class FeesReminderComponent implements OnInit {

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
      branchName: ['', Validators.required],
      courseName: ['', Validators.required],
      batchName: ['', Validators.required],
      dueDate: ['', Validators.required],
      installmentAmount: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
    });
  }

  setFields() {
    this.fields = [
      {
        fieldGroupClassName: 'row card-body p-2',
        fieldGroup: [
          {
            className: 'col-md-4',
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
            className: 'col-md-4',
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
            className: 'col-md-4',
            key: 'batchName',
            type: 'select',
            props: {
              label: 'Batch Name',
              placeholder: 'Select Batch Name',
              required: true,
              options: [
                { value: 'batch1', label: 'Batch 1' },
                { value: 'batch2', label: 'Batch 2' },
                { value: 'batch3', label: 'Batch 3' },
              ],
            },
            validation: {
              messages: {
                required: 'Batch Name is required',
              },
            },
          },
          {
            className: 'col-md-4',
            key: 'dueDate',
            type: 'input',
            props: {
              label: 'Due Date',
              placeholder: 'Enter Due Date',
              type: 'date',
              required: true,
            },
            validation: {
              messages: {
                required: 'Due Date is required',
              },
            },
          },
          {
            className: 'col-md-4',
            key: 'installmentAmount',
            type: 'input',
            props: {
              label: 'Installment Amount',
              placeholder: 'Enter Installment Amount',
              type: 'number',
              required: true,
            },
            validation: {
              messages: {
                required: 'Installment Amount is required',
                pattern: 'Installment Amount must be a valid number',
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
    this.router.navigateByUrl('erp/student-management/send-fees-reminder-report');
  }


}
