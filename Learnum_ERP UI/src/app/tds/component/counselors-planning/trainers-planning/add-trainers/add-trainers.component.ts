import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { AlertService } from 'src/app/core/services/alertService';
import { MessageService } from 'src/app/core/services/message.service';
import { FormGroup, FormBuilder,Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-add-trainers',
  templateUrl: './add-trainers.component.html',
  styleUrls: ['./add-trainers.component.scss']
})
export class AddTrainersComponent implements OnInit {

  form = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[];

  constructor(private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.setFields();
    this.createForm();
  }

  createForm(): void {
    this.form = this.formBuilder.group({
      courseName: ['', Validators.required],
      subjectName: ['', Validators.required],
      branchName: ['', Validators.required],
      batchName: ['', Validators.required],
      trainerName: ['', Validators.required],
      trainerBatchStatus: ['', Validators.required]
    });
  }

  setFields() {
    this.fields = [
      {
        fieldGroupClassName: 'row card-body p-2',
        fieldGroup: [
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
                { value: 'course3', label: 'Course 3' }
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
            key: 'subjectName',
            type: 'select',
            props: {
              label: 'Subject Name',
              placeholder: 'Select Subject Name',
              required: true,
              options: [
                { value: 'subject1', label: 'Subject 1' },
                { value: 'subject2', label: 'Subject 2' },
                { value: 'subject3', label: 'Subject 3' }
              ],
            },
            validation: {
              messages: {
                required: 'Subject Name is required',
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
                { value: 'branch3', label: 'Branch 3' }
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
            key: 'batchName',
            type: 'select',
            props: {
              label: 'Batch Name',
              placeholder: 'Select Batch Name',
              required: true,
              options: [
                { value: 'batch1', label: 'Batch 1' },
                { value: 'batch2', label: 'Batch 2' },
                { value: 'batch3', label: 'Batch 3' }
              ],
            },
            validation: {
              messages: {
                required: 'Batch Name is required',
              },
            },
          },
          {
            className: 'col-md-6',
            key: 'trainerName',
            type: 'select',
            props: {
              label: 'Trainer Name',
              placeholder: 'Select Trainer Name',
              required: true,
              options: [
                { value: 'trainer1', label: 'Trainer 1' },
                { value: 'trainer2', label: 'Trainer 2' },
                { value: 'trainer3', label: 'Trainer 3' }
              ],
            },
            validation: {
              messages: {
                required: 'Trainer Name is required',
              },
            },
          },
          {
            className: 'col-md-6',
            key: 'trainerBatchStatus',
            type: 'select',
            props: {
              label: 'Trainer Batch Status',
              placeholder: 'Select Trainer Batch Status',
              required: true,
              options: [
                { value: 'active', label: 'Active' },
                { value: 'inactive', label: 'Inactive' }
              ],
            },
            validation: {
              messages: {
                required: 'Trainer Batch Status is required',
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
    this.router.navigateByUrl('tds/counselors-planning/trainers-planning');
  }

}
