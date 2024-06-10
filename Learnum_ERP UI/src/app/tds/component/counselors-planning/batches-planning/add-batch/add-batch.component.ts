import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { AlertService } from 'src/app/core/services/alertService';
import { MessageService } from 'src/app/core/services/message.service';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-add-batch',
  templateUrl: './add-batch.component.html',
  styleUrls: ['./add-batch.component.scss']
})
export class AddBatchComponent implements OnInit {

  form = new FormGroup({});
  model: any = {};
  options: any = {};
  fields: FormlyFieldConfig[] = [];

  installmentform = new FormGroup({});
  installmentmodel: any = {
    tasks: [null],
  };
  installmentoptions: FormlyFormOptions = {};
  installmentfields: FormlyFieldConfig[] = [
    {
      key: 'tasks',
      type: 'repeat',
      props: {
        addText: 'Add New',
        label: 'Installments',
      },
      fieldArray: {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            key: 'number',
            className: 'col-4',
            type: 'input',
            props: {
              placeholder: 'Installment Number',
              type: 'number',
              required: true,
            },
          },
          {
            key: 'installment',
            className: 'col-4',
            type: 'input',
            props: {
              placeholder: 'Due Date',
              type: 'date',
              required: true,
            },
          },
          {
            key: 'amount',
            className: 'col-4',
            type: 'input',
            props: {
              placeholder: 'Installment Amount',
              type: 'number',
              required: true,
            },
          }
        ],
      },
    },
  ];

  submit() {
    alert(JSON.stringify(this.model));
  }

  constructor(private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.setFields();
    this.createForm();
  }

  createForm(): void {
    this.form = this.formBuilder.group({
      batchName: ['', Validators.required],
      branchName: ['', Validators.required],
      classroom: ['', Validators.required],
      courseName: ['', Validators.required],
      courseFeesInstallment: ['', Validators.required],
      oneTimeCourseFees: ['', Validators.required],
      startOn: ['', Validators.required],
      endOn: ['', Validators.required],
      batchStatus: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required]
    });
  }

  setFields() {
    this.fields = [
      {
        fieldGroupClassName: 'row ',
        fieldGroup: [
          {
            className: 'col-md-3',
            key: 'batchName',
            type: 'input',
            props: {
              label: 'Batch Name',
              placeholder: 'Enter Batch Name',
              required: true,
            },
            validation: {
              messages: {
                required: 'Batch Name is required',
              },
            },
          },
          {
            className: 'col-md-3',
            key: 'branchName',
            type: 'select',
            props: {
              label: 'Branch Name',
              placeholder: 'Select Branch Name',
              required: true,
              options: [
                { value: 'branch1', label: 'Branch 1' },
                { value: 'branch2', label: 'Branch 2' }
              ],
            },
            validation: {
              messages: {
                required: 'Branch Name is required',
              },
            },
          },
          {
            className: 'col-md-3',
            key: 'classroom',
            type: 'select',
            props: {
              label: 'Classroom',
              placeholder: 'Select Classroom',
              required: true,
              options: [
                { value: 'classroom1', label: 'Classroom 1' },
                { value: 'classroom2', label: 'Classroom 2' }
              ],
            },
            validation: {
              messages: {
                required: 'Classroom is required',
              },
            },
          },
          {
            className: 'col-md-3',
            key: 'courseName',
            type: 'select',
            props: {
              label: 'Course Name',
              placeholder: 'Select Course Name',
              required: true,
              options: [
                { value: 'course1', label: 'Course 1' },
                { value: 'course2', label: 'Course 2' }
              ],
            },
            validation: {
              messages: {
                required: 'Course Name is required',
              },
            },
          },
          {
            className: 'col-md-3',
            key: 'courseFeesInstallment',
            type: 'input',
            props: {
              label: 'Course Fees in Installment',
              placeholder: 'Enter Course Fees in Installment',
              type: 'number',
              required: true,
            },
            validation: {
              messages: {
                required: 'Course Fees in Installment is required',
              },
            },
          },
          {
            className: 'col-md-3',
            key: 'oneTimeCourseFees',
            type: 'input',
            props: {
              label: 'One Time Course Fees',
              placeholder: 'Enter One Time Course Fees',
              type: 'number',
              required: true,
            },
            validation: {
              messages: {
                required: 'One Time Course Fees is required',
              },
            },
          },
          {
            className: 'col-md-3',
            key: 'startOn',
            type: 'input',
            props: {
              label: 'Start On',
              placeholder: 'Enter Start Date',
              type: 'date',
              required: true,
            },
            validation: {
              messages: {
                required: 'Start Date is required',
              },
            },
          },
          {
            className: 'col-md-3',
            key: 'endOn',
            type: 'input',
            props: {
              label: 'End On',
              placeholder: 'Enter End Date',
              type: 'date',
              required: true,
            },
            validation: {
              messages: {
                required: 'End Date is required',
              },
            },
          },
          {
            className: 'col-md-3',
            key: 'batchStatus',
            type: 'select',
            props: {
              label: 'Batch Status',
              placeholder: 'Select Batch Status',
              required: true,
              options: [
                { value: 'active', label: 'Active' },
                { value: 'inactive', label: 'Inactive' }
              ],
            },
            validation: {
              messages: {
                required: 'Batch Status is required',
              },
            },
          },
          {
            className: 'col-md-3',
            key: 'startTime',
            type: 'input',
            props: {
              label: 'Start Time',
              placeholder: 'Enter Start Time',
              type: 'time',
              required: true,
            },
            validation: {
              messages: {
                required: 'Start Time is required',
              },
            },
          },
          {
            className: 'col-md-3',
            key: 'endTime',
            type: 'input',
            props: {
              label: 'End Time',
              placeholder: 'Enter End Time',
              type: 'time',
              required: true,
            },
            validation: {
              messages: {
                required: 'End Time is required',
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
    this.router.navigateByUrl('tds/counselors-planning/batches-planning');
  }

}
