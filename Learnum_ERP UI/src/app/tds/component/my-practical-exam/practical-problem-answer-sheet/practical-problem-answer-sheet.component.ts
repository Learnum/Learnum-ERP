import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { AlertService } from 'src/app/core/services/alertService';
import { MessageService } from 'src/app/core/services/message.service';
import { FormGroup, FormBuilder,Validators, AbstractControl } from '@angular/forms';
import { PracticalProblemAnswerSheetService } from './practical-problem-answer-sheet.service';
import { PracticalProblemDetails } from './practicalproblem.model';
import { ResponseCode } from 'src/app/core/models/responseObject.model';


@Component({
  selector: 'app-practical-problem-answer-sheet',
  templateUrl: './practical-problem-answer-sheet.component.html',
  styleUrls: ['./practical-problem-answer-sheet.component.scss']
})
export class PracticalProblemAnswerSheetComponent implements OnInit {

  PracticalDetails: PracticalProblemDetails = new PracticalProblemDetails();
  form = new FormGroup({});
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[];
  editData: any;

  constructor(
    private router: Router,
    private alertService: AlertService,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private activateRoute: ActivatedRoute,
    private practicalProblemAnswerSheetService:PracticalProblemAnswerSheetService
  ) {}

  ngOnInit(): void {
    this.setFields();
    this.editData = this.activateRoute.snapshot.queryParams;
    if (this.editData.source === 'edit' && this.editData.StudentId) {
      this.getPracticalAnswerDetails(this.editData.StudentId);
    }
  }

  setFields(): void {
    this.fields = [
      {
        fieldGroupClassName: 'row card-body p-2',
        fieldGroup: [
          {
            key:'studentId'
          },
          {
            className: 'col-md-6',
            key: 'Answer',
            type: 'textarea',
            props: {
              label: 'StudentAnswer',
              placeholder: 'StudentAnswer',
              required: true,
              rows:5,
            },
          },
        ],
      },
    ];
  }
  onSubmit(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.InsertProblemAnswer();
    } else {
      this.alertService.ShowErrorMessage('Please fill in all required fields.');
    }
  }
  onCancleClick() {
    this.router.navigateByUrl('tds/my-practical-exam');
  }
  onResetClick() {
    this.form.reset();
  }

  InsertProblemAnswer() {
    this.PracticalDetails.addedBy = 1;
    this.PracticalDetails.addedDate = new Date();
    this.PracticalDetails.updatedBy = 1;
    this.PracticalDetails.updatedDate = new Date();
   // this.PracticalDetails.studentId = 0;

    this.practicalProblemAnswerSheetService.insertProblemAnswer(this.PracticalDetails).subscribe(
      (result: any) => {
        const serviceResponse = result.Value;
        if (serviceResponse === ResponseCode.Success) {
          this.alertService.ShowSuccessMessage(this.messageService.savedSuccessfully);
        } else if (serviceResponse === ResponseCode.Update) {
          this.alertService.ShowSuccessMessage(this.messageService.updateSuccessfully);
        } else {
          this.alertService.ShowErrorMessage(this.messageService.serviceError);
        }
      },
      (error: any) => {
        this.alertService.ShowErrorMessage(error);
      }
    );
    this.router.navigateByUrl('tds/my-practical-exam');
  }

  getPracticalAnswerDetails(StudentId: number) {
    this.practicalProblemAnswerSheetService.getPracticalAnswerDetails(StudentId).subscribe(
      (result: any) => {
        if (result && result.Value) {
          this.PracticalDetails = result.Value.Item1;
          this.setFields();
          console.error('No data found for StudentId: ' + StudentId);
        }
      },
      (error: any) => {
        console.error('Error retrieving PracticalAnswer details:', error);
      }
    );
  }

}
