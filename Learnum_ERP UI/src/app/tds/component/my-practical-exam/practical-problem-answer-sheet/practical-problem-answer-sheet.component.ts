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
  model: any = {};
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[];

  constructor(
    private router: Router,
    private alertService: AlertService,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private practicalProblemAnswerSheetService:PracticalProblemAnswerSheetService
  ) {}

  ngOnInit(): void {
    this.setFields();
  }

  createForm(): void {
    this.form = this.formBuilder.group({});
  }

  setFields(): void {
    this.fields = [
      {
        fieldGroupClassName: 'row card-body p-2',
        fieldGroup: [
          {
            key: 'Answer',
            type: 'textarea',
            props: {
              label: 'StudentAnswer',
              placeholder: 'StudentAnswer',
              required: true,
              rows:10,
            },
          },
        ],
      },
    ];
  }

  onSubmit(): void {
    this.InsertProblemAnswer();
    // this.form.markAllAsTouched();
    // if (this.form.valid) {
    //   // Handle valid form submission
    //   console.log(this.model);
    // } else {
    //   this.alertService.ShowErrorMessage('Please fill in all required fields.');
    // }
  }

  onCancelClick(): void {
    this.router.navigateByUrl('tds/my-practical-exam');  // Adjust the URL as necessary
  }

  InsertProblemAnswer() {
    this.PracticalDetails.addedBy = 1;
    this.PracticalDetails.addedDate = new Date();
    this.PracticalDetails.updatedBy = 1;
    this.PracticalDetails.updatedDate = new Date();
    this.PracticalDetails.studentId = 0;

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

}
