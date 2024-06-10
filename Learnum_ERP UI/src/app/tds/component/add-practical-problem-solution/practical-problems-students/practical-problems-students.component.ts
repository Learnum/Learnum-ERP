import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { AlertService } from 'src/app/core/services/alertService';
import { MessageService } from 'src/app/core/services/message.service';


@Component({
  selector: 'app-practical-problems-students',
  templateUrl: './practical-problems-students.component.html',
  styleUrls: ['./practical-problems-students.component.scss']
})
export class PracticalProblemsStudentsComponent implements OnInit {

  form = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[];
  coOwners: any;
  NowDate: any = new Date();
 

  constructor(
    private router: Router,
    private alertService: AlertService,
    private messageService: MessageService,
    private activateRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.setParameter();
    this.createForm();
  }

  createForm(): void {
    this.form = this.formBuilder.group({
      question: ['', Validators.required],
      modelAnswer: ['', Validators.required],
      attachment: [Validators.required],
      marks: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      practicalProblemStatus: ['', Validators.required],
    });
  }

  setParameter() {
    this.fields = [
      {
        fieldGroupClassName: 'row card-body p-2',
        fieldGroup: [
          {
            //className: 'col-md-6',
            key: 'question',
            type: 'textarea',
            props: {
              label: 'Question',
              placeholder: 'Enter Question',
              required: true,
              rows: 10
            },
            validation: {
              messages: {
                required: 'Question is required',
              },
            },
          },
          {
            //className: 'col-md-6',
            key: 'modelAnswer',
            type: 'textarea',
            props: {
              label: 'Model Answer',
              placeholder: 'Enter Model Answer',
              required: true,
              rows: 10
            },
            validation: {
              messages: {
                required: 'Model Answer is required',
              },
            },
          },
          // {
          //   className: 'col-md-6',
          //   key: 'attachment',
          //   type: 'file', 
          //   props: {
          //     label: 'Attachment',
          //     placeholder: 'Upload Attachment',
          //     required: true,
          //   },
          //   validation: {
          //     messages: {
          //       required: 'Attachment is required',
          //     },
          //   },
          // },
          {
            //className: 'col-md-6',
            key: 'file',
            type: 'input',
            props: {
              label: 'Attachment',
              placeholder: 'Upload Attachment',
              type: 'number',
            },
            validation: {
              messages: {
                required: 'Attachment is required'
              },
            },
          },
          {
            className: 'col-md-6',
            key: 'marks',
            type: 'input',
            props: {
              label: 'Marks',
              placeholder: 'Enter Marks',
              type: 'number',
              required: true,
            },
            validation: {
              messages: {
                required: 'Marks are required',
                min: 'Marks must be at least 0',
                max: 'Marks cannot be more than 100',
              },
            },
          },
          {
            className: 'col-md-6',
            key: 'practicalProblemStatus',
            type: 'select',
            props: {
              label: 'Practical Problem Status',
              placeholder: 'Select Status',
              options: [
                { label: 'Active', value: 'active' },
                { label: 'Inactive', value: 'inactive' },
              ],
              required: true,
            },
            validation: {
              messages: {
                required: 'Practical Problem Status is required',
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
      // Perform submission logic here
    } else {
      this.alertService.ShowErrorMessage('Please fill in all required fields.');
    }
  }

  onCancleClick() {
    this.router.navigateByUrl('tds/add-practical-problem-solution');
  }
}
