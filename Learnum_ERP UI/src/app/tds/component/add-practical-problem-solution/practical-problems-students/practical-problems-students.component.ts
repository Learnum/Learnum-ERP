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
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[];
  coOwners: any;
  NowDate: any = new Date();
  editData: any;
 

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
    this.editData = this.activateRoute.snapshot.queryParams;
    if (this.editData.source === 'edit' && this.editData.QuestionId) {
      this.getPracticalDetails(this.editData.QuestionId);
    }
  }

  setParameter() {
    this.fields = [
      {
        fieldGroupClassName: 'row card-body p-2',
        fieldGroup: [
          {
            className: 'col-md-6',
            key: 'Question',
            type: 'textarea',
            props: {
              label: 'Question',
              placeholder: 'Enter Question',
              required: true,
              attributes: {
                style: 'overflow:hidden; resize:none;',
                oninput: "this.style.height = 'auto'; this.style.height = this.scrollHeight + 'px';"
              }
            },
            validation: {
              messages: {
                required: 'Question is required',
              },
            },
          },
          {
            className: 'col-md-6',
            key: 'ModelAnswer',
            type: 'textarea',
            props: {
              label: 'Model Answer',
              placeholder: 'Enter Model Answer',
              required: true,
              attributes: {
                style: 'overflow:hidden; resize:none;',
                oninput: "this.style.height = 'auto'; this.style.height = this.scrollHeight + 'px';"
              }
            },
            validation: {
              messages: {
                required: 'Model Answer is required',
              },
            },
          },
          {
            className: 'col-md-3',
            key: 'Marks',
            type: 'input',
            props: {
              label: 'Marks',
              placeholder: 'Enter Marks',
              type: 'text',
              required: true,
              pattern: '^([1-9][0-9]|100)(\\.00)?%?$'  // Matches numbers like 99, 99.00, 90.00%, etc.
            },
            validation: {
              messages: {
                required: 'Marks are required',
                pattern: 'Please enter a valid mark (e.g., 99, 99.00, 90.00%, etc.)'
              },
            },
          },                
          {
            className: 'col-md-3',
            key: 'IsActive',
            type: 'select',
            templateOptions: {  // Use templateOptions instead of props
              label: 'Practical Problem Status',
             // placeholder: 'Select Status',
              required: true,
              options: [
                { value: null, label: 'Select Status', disabled: true },
                { label: 'Active', value: true },
                { label: 'Inactive', value: false }
              ],
            },
            defaultValue: null, 
            validators: {
              required: {
                expression: (c: AbstractControl) => c.value !== null && c.value !== '', // Ensure a status is selected
                message: 'Practical Problem Status is required',
              },
            },
            validation: {
              messages: {
                required: 'Practical Problem Status is required',
              },
            },
          },
          
          {
            className: 'col-md-2',
            key: 'FilePath',
            type: 'file',
            props: {
              label: 'Attachment*',
              placeholder: 'Upload Attachment',
              type: 'number', 
              required: true,
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
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.InsertProblemDetails();
    } else {
      this.alertService.ShowErrorMessage('Please fill in all required fields.');
    }
  }

  onCancleClick() {
    this.router.navigateByUrl('tds/add-practical-problem-solution');
  }

  navigate()
  {
    this.router.navigateByUrl('tds/add-practical-problem-solution');
  }
  onResetClick() {
    this.form.reset();
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

  getPracticalDetails(QuestionId: number) {
    this.practicalProblemsStudentsService.getPracticalDetails(QuestionId).subscribe(
      (result: any) => {
        if (result && result.Value) {
          this.problemDetails = result.Value.Item1;
          this.setParameter();
          console.error('No data found for QuestionId: ' + QuestionId);
        }
      },
      (error: any) => {
        console.error('Error retrieving practical details:', error);
      }
    );
  }
}
