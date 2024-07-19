import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { AlertService } from 'src/app/core/services/alertService';
import { MessageService } from 'src/app/core/services/message.service';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { SyllabuscompletionService } from './syllabuscompletion.service';
import { syllabusDetails } from './syllabus.model';
import { ResponseCode } from 'src/app/core/models/responseObject.model';
@Component({
  selector: 'app-syllabus-completion',
  templateUrl: './syllabus-completion.component.html',
  styleUrls: ['./syllabus-completion.component.scss']
})
export class SyllabusCompletionComponent implements OnInit {

  SyllabusDetails: syllabusDetails = new syllabusDetails();
  form = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[];
  statusDetails: any;

  constructor(
    private router: Router,
    private alertService: AlertService,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private syllabuscompletionService: SyllabuscompletionService
  ) { }

  ngOnInit(): void {
    this.setParameter();
    this.getBranchDetails();
  }
  setParameter() {
    this.fields = [
      {
        fieldGroupClassName: 'row card-body p-2',
        fieldGroup: [
          {
            className: 'col-md-6',
            type: 'select',
            key: 'BranchId',
            templateOptions: {
              placeholder: 'Branch Name',
              type: 'text',
              label: "Branch Name",
              required: true,
              options: this.statusDetails ? this.statusDetails.map(status => ({ label: status.BranchName, value: status.BranchId })) : [],
            },
          }
        ],
      },
    ];
  }

  onSubmit(): void {
      this.InsertsyllabusDetails();
    // this.form.markAllAsTouched();
    // if (this.form.valid) {
    //   // Handle form submission
    // } else {
    //   // Handle form errors
    // }
  }

  onCancelClick() {
    this.router.navigateByUrl('tds/trainer-dashboard');
  }

  getBranchDetails() {
    this.syllabuscompletionService.getBranchList().subscribe(
      (data: any) => {
        this.statusDetails = data.Value;
        this.setParameter();  
      },
      (error: any) => {
        this.alertService.ShowErrorMessage(error);
      }
    );
  }

  InsertsyllabusDetails() {
    this.SyllabusDetails.addedBy = 1;
    this.SyllabusDetails.addedDate = new Date();
    this.SyllabusDetails.updatedBy = 1;
    this.SyllabusDetails.updatedDate = new Date();
    this.SyllabusDetails.trainerId = 0;

    this.syllabuscompletionService.insertProblemAnswer(this.SyllabusDetails).subscribe(
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
    this.router.navigateByUrl('tds/trainer-dashboard');
  }
}

