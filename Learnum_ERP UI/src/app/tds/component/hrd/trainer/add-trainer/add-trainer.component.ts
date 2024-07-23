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
  batchDetails:any;

 
  constructor(
    private addtrainerService: AddtrainerService,
    private router: Router,
    private alertService: AlertService,
    private messageService: MessageService,
    private activateRoute: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.setParameter();
    this.getCourseDetails();
    this.getSubjectDetails();
    this.getBranchDetails();
    this.getBatchDetails();

  }

setParameter() {
    this.fields = [
      {
        fieldGroupClassName: 'row card-body p-2',
        // key: 'ITDPreEmploymentSalModel',
        fieldGroup: [

          {
            className: 'col-md-6',
            type: 'select',
            key: 'CourseId',
            templateOptions: {
              placeholder: 'Course Name',
              type: 'text',
              label: "course Name",
              required: true,
              options: this.courseDetails ? this.courseDetails.map(course => ({ label: course.CourseName
                , value: course.CourseId })) : [],
             
            },
            },
          {
            className: 'col-md-6',
            type: 'select',
            key: 'SubjectId',
            templateOptions: {
              placeholder: 'subject Name',
              type: 'subject Name',
              label: "Subject Name",
              required: true,
              options: this.subjectDetails ? this.subjectDetails.map(subject => ({ label: subject.SubjectName
                , value: subject.SubjectId
              })) : [],
              
            },

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
              options: this.branchDetails ? this.branchDetails.map(branch => ({ label: branch.BranchName, value: branch.BranchId })) : [],
            },

          }, 
          {
            className: 'col-md-6',
            type: 'select',
            key: 'BatchId',
            templateOptions: {
              placeholder: 'Enter batch Name',
              required: true,
              type: ' Batch Name',
              label: "Batch Name",
              options: this.batchDetails ? this.batchDetails.map(batch => ({ label: batch.BatchName
                , value: batch.BatchId
              })) : [],
            
              },
            validation: {
              messages: {
                required: 'This field is required',
              },
            },
          },
          {
            className: 'col-md-6',
            type: 'select',
            key: 'trainerName',
            props: {
              placeholder: 'Trainer Name',
              required: true,
              type: 'text',
              label: "Trainer Name",
              options: [
                { label: 'Trainer-1', value: 'Trainer-1' },
                { label: 'Trainer-2', value: 'Trainer-2' }
              ],
             },
            
            validation: {
              messages: {
                required: 'This field is required',
                tds: 'Please enter a Trainer Name',
              },
            },
          },
          
          {
            className: 'col-md-4',
            type: 'select',
            key: 'isActive',
            templateOptions: {
              placeholder: 'Enter Status',
              type: 'text',
              label: "Status",
              required: true,
              options: [
                { value: 'true', label: 'active' },
                { value: 'false', label: 'inacative' }
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

  get f()
  {
    return this.form.controls;
  }

  onSubmit():void {
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
    this.TrainerDetails.TrainerId = 0;

    this.addtrainerService.insertTrainerData(this.TrainerDetails).subscribe(
      (result: any) => {
        let serviceResponse = result.Value
        if (result.Value === ResponseCode.Success) {
          this.alertService.ShowSuccessMessage(this.messageService.savedSuccessfully);

        }
        else if (serviceResponse == ResponseCode.Update) {
          this.alertService.ShowSuccessMessage(this.messageService.updateSuccessfully);
        }
        else {
          this.alertService.ShowErrorMessage(this.messageService.serviceError);
        }
      },
      (error: any) => {
        this.alertService.ShowErrorMessage("Enter all required fields");
      }
    )
    this.router.navigateByUrl('tds/hrd/trainer');
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
}
