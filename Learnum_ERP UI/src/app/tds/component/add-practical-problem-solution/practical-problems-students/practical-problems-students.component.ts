import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { AlertService } from 'src/app/core/services/alertService';
import { MessageService } from 'src/app/core/services/message.service';
import { PracticalProblemsStudentsService } from './practical-problems-students.service';
import { problemDetailsModel } from './ProblemDetails.model';
import { ResponseCode } from 'src/app/core/models/responseObject.model';


@Component({
  selector: 'app-practical-problems-students',
  templateUrl: './practical-problems-students.component.html',
  styleUrls: ['./practical-problems-students.component.scss']
})
export class PracticalProblemsStudentsComponent implements OnInit {

  problemDetails: problemDetailsModel = new problemDetailsModel();
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
    private formBuilder: FormBuilder,
    private practicalProblemsStudentsService:PracticalProblemsStudentsService
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
            className: 'col-md-6',
            key: 'question',
            type: 'textarea',
            props: {
              label: 'Question',
              placeholder: 'Enter Question',
              required: true,
              rows: 6
            },
            validation: {
              messages: {
                required: 'Question is required',
              },
            },
          },
          {
            className: 'col-md-6',
            key: 'modelAnswer',
            type: 'textarea',
            props: {
              label: 'Model Answer',
              placeholder: 'Enter Model Answer',
              required: true,
              rows: 6
            },
            validation: {
              messages: {
                required: 'Model Answer is required',
              },
            },
          },
          {
            className: 'col-md-3',
            key: 'marks',
            type: 'input',
            props: {
              label: 'Marks',
              placeholder: 'Enter Marks',
              type: 'number',
              required: true,
              pattern: '^[0-9]+$'
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
            className: 'col-md-3',
            key: 'isActive',
            type: 'select',
            props: {
              label: 'Practical Problem Status',
              placeholder: 'Select Status',
              required: true,
              options: [
                { label: 'Active', value: 'true' },
                { label: 'Inactive', value: 'false' }
              ],
              
            },
            validation: {
              messages: {
                required: 'Practical Problem Status is required',
              },
            },
          },
          {
            className: 'col-md-3',
            key: 'file',
            type: 'file',
            props: {
              label: 'Attachment*',
              placeholder: 'Upload Attachment',
              type: 'number',
            },
            validation: {
              messages: {
                required: 'Attachment is required'
              },
            },
          },
          
        ],
      },
    ];
  }

  onSubmit(): void {
    this.InsertProblemDetails();
    // this.form.markAllAsTouched();
    // if (this.form.valid) {
    //   // Perform submission logic here
    // } else {
    //   this.alertService.ShowErrorMessage('Please fill in all required fields.');
    // }
  }

  onCancleClick() {
    this.router.navigateByUrl('tds/add-practical-problem-solution');
  }

  InsertProblemDetails() {
    this.practicalProblemsStudentsService.insertProblemDetails(this.problemDetails).subscribe(
      (result: any) => {
        const serviceResponse = result.Value;
        if (serviceResponse === ResponseCode.Success) {
          this.alertService.ShowSuccessMessage(this.messageService.savedSuccessfully);
        } else if (serviceResponse === ResponseCode.Update) {
          this.alertService.ShowSuccessMessage(this.messageService.updateSuccessfully);
        } else {
          this.alertService.ShowErrorMessage(this.messageService.serviceError);
        }
        this.router.navigateByUrl('tds/add-practical-problem-solution');
      },
      (error: any) => {
        this.alertService.ShowErrorMessage(error);
      }
    );
  }
}
