import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { AlertService } from 'src/app/core/services/alertService';
import { MessageService } from 'src/app/core/services/message.service';
import { FormGroup, FormBuilder,Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-schedule-practical-problem',
  templateUrl: './schedule-practical-problem.component.html',
  styleUrls: ['./schedule-practical-problem.component.scss']
})
export class SchedulePracticalProblemComponent implements OnInit {

  form = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[];

  constructor(
    private router: Router,
    private alertService: AlertService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.setParameter();
  }

  createForm(): void {
    this.form = this.formBuilder.group({
      courseName: ['', Validators.required],
      branchName: ['', Validators.required],
      batchName: ['', Validators.required],
      subjectName: ['', Validators.required],
      topicName: ['', Validators.required],
      paperSetNo: ['', Validators.required],
      dateOfExam: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      status: ['', Validators.required],
    });
  }

  setParameter(): void {
    this.fields = [
      {
        fieldGroupClassName: 'row card-body p-2',
        fieldGroup: [
          {
            className: 'col-md-6',
            key: 'courseName',
            type: 'select',
            templateOptions: {
              label: 'Course Name',
              placeholder: 'Select Course Name',
              required: true,
              options: [
                { value: 'course1', label: 'Course 1' },
                { value: 'course2', label: 'Course 2' },
                { value: 'course3', label: 'Course 3' }
              ]
            },
            validation: {
              messages: {
                required: 'Course Name is required',
              },
            },
          },
          {
            className: 'col-md-6',
            key: 'branchName',
            type: 'select',
            templateOptions: {
              label: 'Branch Name',
              placeholder: 'Select Branch Name',
              required: true,
              options: [
                { value: 'branch1', label: 'Branch 1' },
                { value: 'branch2', label: 'Branch 2' },
                { value: 'branch3', label: 'Branch 3' }
              ]
            },
            validation: {
              messages: {
                required: 'Branch Name is required',
              },
            },
          },
          {
            className: 'col-md-6',
            key: 'batchName',
            type: 'select',
            templateOptions: {
              label: 'Batch Name',
              placeholder: 'Select Batch Name',
              required: true,
              options: [
                { value: 'batch1', label: 'Batch 1' },
                { value: 'batch2', label: 'Batch 2' },
                { value: 'batch3', label: 'Batch 3' }
              ]
            },
            validation: {
              messages: {
                required: 'Batch Name is required',
              },
            },
          },
          {
            className: 'col-md-6',
            key: 'subjectName',
            type: 'select',
            templateOptions: {
              label: 'Subject Name',
              placeholder: 'Select Subject Name',
              required: true,
              options: [
                { value: 'subject1', label: 'Subject 1' },
                { value: 'subject2', label: 'Subject 2' },
                { value: 'subject3', label: 'Subject 3' }
              ]
            },
            validation: {
              messages: {
                required: 'Subject Name is required',
              },
            },
          },
          {
            className: 'col-md-6',
            key: 'topicName',
            type: 'select',
            templateOptions: {
              label: 'Topic Name',
              placeholder: 'Select Topic Name',
              required: true,
              options: [
                { value: 'topic1', label: 'Topic 1' },
                { value: 'topic2', label: 'Topic 2' },
                { value: 'topic3', label: 'Topic 3' }
              ]
            },
            validation: {
              messages: {
                required: 'Topic Name is required',
              },
            },
          },
          {
            className: 'col-md-6',
            key: 'paperSetNo',
            type: 'select',
            templateOptions: {
              label: 'Paper Set No',
              placeholder: 'Select Paper Set No',
              required: true,
              options: [
                { value: 'set1', label: 'Set 1' },
                { value: 'set2', label: 'Set 2' },
                { value: 'set3', label: 'Set 3' }
              ]
            },
            validation: {
              messages: {
                required: 'Paper Set No is required',
              },
            },
          },
          {
            className: 'col-md-6',
            key: 'dateOfExam',
            type: 'input',
            templateOptions: {
              type: 'date',
              label: 'Date of Exam',
              placeholder: 'Enter Date of Exam',
              required: true,
            },
            validation: {
              messages: {
                required: 'Date of Exam is required',
              },
            },
          },
          {
            className: 'col-md-6',
            key: 'startTime',
            type: 'input',
            templateOptions: {
              type: 'time',
              label: 'Start Time',
              placeholder: 'Enter Start Time',
              required: true,
            },
            validation: {
              messages: {
                required: 'Start Time is required',
              },
            },
          },
          {
            className: 'col-md-6',
            key: 'endTime',
            type: 'input',
            templateOptions: {
              type: 'time',
              label: 'End Time',
              placeholder: 'Enter End Time',
              required: true,
            },
            validation: {
              messages: {
                required: 'End Time is required',
              },
            },
          },
          {
            className: 'col-md-6',
            key: 'status',
            type: 'select',
            templateOptions: {
              label: 'Status',
              placeholder: 'Select Status',
              required: true,
              options: [
                { value: 'scheduled', label: 'Scheduled' },
                { value: 'completed', label: 'Completed' },
                { value: 'cancelled', label: 'Cancelled' }
              ]
            },
            validation: {
              messages: {
                required: 'Status is required',
              },
            },
          }
        ],
      },
    ];
  }

  onSubmit(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      // Process the form data
      console.log(this.model);
    } else {
      this.alertService.ShowErrorMessage('Please fill in all required fields.');
    }
  }

  onCancelClick(): void {
    this.router.navigateByUrl('tds/practical-problem-exams');
  }

}
