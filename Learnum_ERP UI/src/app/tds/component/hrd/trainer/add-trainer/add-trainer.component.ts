import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/core/services/alertService';
import { MessageService } from 'src/app/core/services/message.service';
import { formatDate } from '@angular/common';
import { TrainerDetailsModel } from './trainerdetails.model';
import { AddtrainerService } from './addtrainer.service';
import { ResponseCode } from 'src/app/core/models/responseObject.model';

@Component({
  selector: 'app-add-trainer',
  templateUrl: './add-trainer.component.html',
  styleUrls: ['./add-trainer.component.scss']
})
export class AddTrainerComponent implements OnInit {


  form = new FormGroup({});
  TrainerDetails: TrainerDetailsModel = new TrainerDetailsModel();
  fields: FormlyFieldConfig[];
  options: FormlyFormOptions = {};
  editData: any;
  NowDate: any = new Date();
  branchDetails: any;
  courseDetails: any;
  subjectDetails: any;
  batchDetails: any;


  constructor(
    private addtrainerService: AddtrainerService,
    private router: Router,
    private alertService: AlertService,
    private messageService: MessageService,
    private activateRoute: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {

    this.getCourseDetails();
    this.getSubjectDetails();
    this.getBranchDetails();
    this.getBatchDetails();
    this.setParameter();

    this.editData = this.activateRoute.snapshot.queryParams;
    if (this.editData.source === 'edit' && this.editData.TrainerId) {
      this.getTrainerDetails(this.editData.TrainerId);
    }
  }

  setParameter() {
    this.fields = [
      {
        fieldGroupClassName: 'row card-body p-2',
        // key: 'ITDPreEmploymentSalModel',
        fieldGroup: [
          {
            key: 'TrainerId'
          },
          {
            className: 'col-md-3',
            type: 'input',
            key: 'TrainerName',
            props: {
              placeholder: 'Trainer Name',
              required: true,
              type: 'text',
              label: "Trainer Name",
              pattern: "^[A-Za-z]+( [A-Za-z]+)*$",
             
            },
            validation: {
              messages: {
                required: 'Name is required',
                pattern: 'Please enter a valid name ',
              },
            },
          },

          {
            className: 'col-md-3',
            type: 'select',
            key: 'CourseId',
            templateOptions: {
              placeholder: 'Select Course',
              type: 'text',
              label: "Course Name",
              required: true,
              options: this.courseDetails ? this.courseDetails.map(course => ({
                label: course.CourseName
                , value: course.CourseId
              })) : [],

            },
          },
          {
            className: 'col-md-3',
            type: 'select',
            key: 'SubjectId',
            templateOptions: {
              placeholder: ' Select Subject',
              type: 'Text',
              label: "Subject Name",
              required: true,
              options: this.subjectDetails ? this.subjectDetails.map(subject => ({
                label: subject.SubjectName
                , value: subject.SubjectId
              })) : [],

            },

          },


          {
            className: 'col-md-3',
            type: 'select',
            key: 'BranchId',
            templateOptions: {
              placeholder: 'Select Branch ',
              type: 'text',
              label: "Branch Name",
              required: true,
              options: this.branchDetails ? this.branchDetails.map(branch => ({ label: branch.BranchName, value: branch.BranchId })) : [],
            },

          },
          {
            className: 'col-md-3',
            type: 'select',
            key: 'BatchId',
            templateOptions: {
              placeholder: 'Select Batch',
              required: true,
              type: 'text',
              label: "Batch Name",
              options: this.batchDetails ? this.batchDetails.map(batch => ({
                label: batch.BatchName
                , value: batch.BatchId
              })) : [],

            },
            validation: {
              messages: {
                required: 'This field is required',
              },
            },
          },
          ,

          {
            className: 'col-md-3',
            type: 'select',
            key: 'IsActive',
            templateOptions: {
              placeholder: 'Select Status',
              type: 'text',
              label: "Status",
              required: true,
              options: [
                { value: true, label: 'Active' },
                { value: false, label: 'Inactive' }
              ]
            },
          },

        ],
      },
    ]
  }


  onCancel() {
    this.router.navigateByUrl('tds/hrd/trainer')
  }

  get f() {
    return this.form.controls;
  }

  onSubmit(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {

      this.insertTrainer();
    }
    else {
      this.alertService.ShowErrorMessage('Please fill in all required fields.');
    }
  }

  insertTrainer() {
    this.TrainerDetails.addedBy = 1;
    this.TrainerDetails.addedDate = new Date();
    this.TrainerDetails.updatedBy = 1;
    this.TrainerDetails.updatedDate = new Date();
    // this.TrainerDetails.TrainerId = 0;

    this.addtrainerService.insertTrainerData(this.TrainerDetails).subscribe(
      (result: any) => {
        let serviceResponse = result.Value
        if (result.Value === ResponseCode.Success) {
          this.alertService.ShowSuccessMessage(this.messageService.savedSuccessfully);
          this.router.navigateByUrl('tds/hrd/trainer');

        }
        else if (serviceResponse == ResponseCode.Update) {
          this.alertService.ShowSuccessMessage(this.messageService.updateSuccessfully);
          this.router.navigateByUrl('tds/hrd/trainer');

        }
        else {
          this.alertService.ShowErrorMessage(this.messageService.serviceError);
        }

      },
      (error: any) => {
        this.alertService.ShowErrorMessage("Enter all required fields");
      }
    )
  }


  getCourseDetails() {
    this.addtrainerService.getcourseList().subscribe(
      (data: any) => {
        this.courseDetails = data.Value;
        this.setParameter();
      },
      (error: any) => {
        this.alertService.ShowErrorMessage(error);
      }
    );
  }

  getSubjectDetails() {
    this.addtrainerService.getsubjectList().subscribe(
      (data: any) => {
        this.subjectDetails = data.Value;
        this.setParameter();
      },
      (error: any) => {
        this.alertService.ShowErrorMessage(error);
      }
    );
  }

  getBranchDetails() {
    this.addtrainerService.getBranchList().subscribe(
      (data: any) => {
        this.branchDetails = data.Value;
        this.setParameter();
      },
      (error: any) => {
        this.alertService.ShowErrorMessage(error);
      }
    );
  }

  getBatchDetails() {
    this.addtrainerService.getBatchList().subscribe(
      (data: any) => {
        this.batchDetails = data.Value;
        this.setParameter();
      },
      (error: any) => {
        this.alertService.ShowErrorMessage(error);
      }
    );
  }

  getTrainerDetails(TrainerId: number) {
    this.addtrainerService.getTrainerDetails(TrainerId).subscribe(
      (result: any) => {
        if (result && result.Value) {
          this.TrainerDetails = result.Value.Item1;

          this.setParameter();
          console.error('No data found for BranchId: ' + TrainerId);
        }
      },
      (error: any) => {
        console.error('Error retrieving trainer details:', error);

      }
    );
  }
}
