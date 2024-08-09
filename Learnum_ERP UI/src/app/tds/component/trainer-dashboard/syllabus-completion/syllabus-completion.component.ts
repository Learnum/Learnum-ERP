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
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[];
  statusDetails: any;
  editData: any;

  constructor(
    private router: Router,
    private alertService: AlertService,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private activateRoute: ActivatedRoute,
    private syllabuscompletionService: SyllabuscompletionService
  ) { }

  ngOnInit(): void {
    this.setParameter();
    this.getBranchDetails();
    this.editData = this.activateRoute.snapshot.queryParams;
    if (this.editData.source === 'edit' && this.editData.TrainerId) {
      this.getSyllabusDetails(this.editData.TrainerId);
    }
  }
  setParameter() {
    this.fields = [
      {
        fieldGroupClassName: 'row card-body p-2',
        fieldGroup: [
          {
            key:'trainerId',
          },
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
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.InsertsyllabusDetails();
    } else {
      this.alertService.ShowErrorMessage('Please fill in all required fields.');
    }
  }
  onCancleClick() {
    this.router.navigateByUrl('tds/trainer-dashboard');
  }

  navigate()
  {
    this.router.navigateByUrl('tds/trainer-dashboard');
  }
  onResetClick() {
    this.form.reset();
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
    //this.SyllabusDetails.trainerId = 0;

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
	getSyllabusDetails(TrainerId: number) {
    this.syllabuscompletionService.getSyllabus(TrainerId).subscribe(
      (result: any) => {
        if (result && result.Value) {
          this.SyllabusDetails = result.Value.Item1;
          this.setParameter();
          console.error('No data found for TrainerId: ' + TrainerId);
        }
      },
      (error: any) => {
        console.error('Error retrieving syllabus details:', error);
      }
    );
  }
}

