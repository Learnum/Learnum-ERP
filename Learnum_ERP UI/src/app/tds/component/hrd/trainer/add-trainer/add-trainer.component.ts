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
    this.editData = this.activateRoute.snapshot.queryParams;
    if (this.editData.source === 'edit' && this.editData.trainerId) {
  }
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
            key: 'Course Name',
            props: { 
              placeholder: 'Enter Course Name',
             
              label: "Course Name",
              required: true,
              pattern: '^[A-Za-z]+$',
              title: 'Only characters are allowed',
              options: [
                { label: 'Tally', value: 'Tally' },
                { label: 'Tax', value: 'Tax' }
              ],
            },
            validation: {
              messages: {
                required: 'Name is required',
                pattern: 'Please enter a valid name ',
              },
            },
          },
          {
            className: 'col-md-6',
            type: 'select',
            key: 'Subject Name',
            props: {
              placeholder: 'Enter Subject Name',
              required: true,
              type: 'text',
              label: "Subject Name",
              options: [
                { label: 'Account', value: 'Account' },
                { label: 'tax', value: 'Tax' }
              ],
            },
            validation: {
              messages: {
                required: 'This field is required',
                ip: 'Please enter a valid Subject Name',
              },
            },
          },


          {
            className: 'col-md-6',
            type: 'select',
            key: 'Branch Name',
            props: {
              placeholder: 'Select Branch Name',
              required: true,
              valueProp: 'value',
              labelProp: 'label',
              label: "Branch Name",
              type:'text',
              options: [
                { label: 'cpat', value: 'cpat' },
                { label: 'taxblock', value: 'taxblock' }
              ],
            },
            validation: {
              messages: {
                required: 'Please select a Branch Name',
              },
            },
          }, 
         {
            className: 'col-md-6',
            type: 'select',
            key: 'Batch Name',
            props: {
              placeholder: 'Enter batch Name',
              required: true,
              type: 'number',
              label: "Batch Name",
              options: [
                { label: 'Batch-1', value: 'Batch-1' },
                { label: 'Batch-2', value: 'Batch-2' }
              ],
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
            key: 'Trainer Name',
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
            className: 'col-md-6',
            type: 'select',
            key: 'TrainerBatchStatus',
            props: {
              placeholder: ' select status',
              required: true,
              type: 'text',
              label: "Trainer Batch Status",
              options: [
                { value: true, label: 'Active' },
                { value: false, label: 'InActive' }
              ],
            },
            validation: {
              messages: {
                required: 'This field is required', 
              },
            },
          },
         
        ],
      },
    ]
  }

  onCancleClick() {
    this.router.navigateByUrl('tds/hrd/trainer');
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
    this.TrainerDetails.isActive = true;

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



}
