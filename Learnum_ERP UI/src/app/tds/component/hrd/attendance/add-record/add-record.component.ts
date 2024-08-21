import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { AlertService } from 'src/app/core/services/alertService';
import { MessageService } from 'src/app/core/services/message.service';
import { AttendenceSheetDetailsModel } from './attendanceDetails.model';
import { AddrecordService } from './addrecord.service';
import { ResponseCode } from 'src/app/core/models/responseObject.model';
import { BaseService } from 'src/app/core/services/baseService';

@Component({
  selector: 'app-add-record',
  templateUrl: './add-record.component.html',
  styleUrls: ['./add-record.component.scss']
})
export class AddRecordComponent implements OnInit {

  form = new FormGroup({});
  attendenceDetails: AttendenceSheetDetailsModel = new AttendenceSheetDetailsModel();
 fields: FormlyFieldConfig[];
  options: FormlyFormOptions = {};
  editData: any;
  NowDate: any = new Date();
  attendenceForm: any;

 
  constructor(
    private addrecordService: AddrecordService,
    private baseservice : BaseService,
    private router: Router,
    private alertService: AlertService,
    private messageService: MessageService,
    private activateRoute: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.setParameter();
 
    this.editData = this.activateRoute.snapshot.queryParams;
    if (this.editData.source === 'edit' && this.editData.AttendenceId) {
      this.getAttendanceDetails(this.editData.AttendenceId);
    }
    
  }

setParameter() {
    this.fields = [
      {
        fieldGroupClassName: 'row card-body p-2',
        // key: 'ITDPreEmploymentSalModel',
        fieldGroup: [

          {
            key:'AttendenceId',
           },
            {
            className: 'col-md-4',
            type: 'input',
            key: 'Name',
            templateOptions: {
              placeholder: 'Enter Name',
              type: 'text',
              label: "Name",
              required: true,
              pattern: "^[A-Za-z]+( [A-Za-z]+)*$",
              title: 'Only characters are allowed',
            },
            validation: {
              messages: {
                required: 'Name is required',
                pattern: 'Please enter a valid name ',
              },
            },
          },
          {
            className: 'col-md-4',
            type: 'input',
            key: 'Date',
            templateOptions: {
              label: 'Date',
              placeholder: 'Date',
              type: 'date',
              required: true,
              attributes: {
                max: formatDate(this.NowDate, 'YYYY-MM-dd', 'en-IN'),
              },
            },
            validation: {
              messages: {
                required: 'This field is required',
              },
            },
          },
          {
            className: 'col-md-4',
            type: 'input',
            key: 'Role',
            templateOptions: {
              label: 'Role',
              placeholder: 'Select Role',
              required: true,
             
            },
            validation: {
              messages: {
                required: 'Role is required',
              },
            },
          },
          
          {
            className: 'col-md-3',
            key: 'Time',
            type: 'input',
            props: {
              label: 'InTime',
              placeholder: 'Select InTime',
              type: 'time',
              required: true,
            },
            validation: {
              messages: {
                required: 'Phone InTime is required',
              },
            },
          },
         
         
        ],
      },
    ]
  }
       
  

  onCancleClick() {
    this.router.navigateByUrl('tds/hrd/attendance');
  }

  navigate()
  {
    this.router.navigateByUrl('tds/hrd/attendance');
  }

  get f()
  {
    return this.form.controls;
  }

  onSubmit():void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
     this.insertAddAttendence() ;
      }
    else {
      this.alertService.ShowErrorMessage('Please fill in all required fields.');
    }
  }

  insertAddAttendence() {
    this.attendenceDetails.addedBy = 1;
    this.attendenceDetails.addedDate = new Date();
    this.attendenceDetails.updatedBy = 1;
    this.attendenceDetails.updatedDate = new Date();
    //this.attendenceDetails.attendenceId = 0;

    this.addrecordService.insertrecordsData(this.attendenceDetails).subscribe(
      (result: any) => {
        let serviceResponse = result.Value;
        if (serviceResponse === ResponseCode.Success) {
          this.alertService.ShowSuccessMessage(this.messageService.savedSuccessfully);
          this.router.navigateByUrl('tds/hrd/attendance');
        }
         else if (serviceResponse == ResponseCode.Update) {
          this.alertService.ShowSuccessMessage(this.messageService.updateSuccessfully);
          this.router.navigateByUrl('tds/hrd/attendance');
        } 
        else {
          this.alertService.ShowErrorMessage(this.messageService.serviceError);
        }
      },
      (error: any) => {
        this.alertService.ShowErrorMessage("Enter all required fields");
      }
    );
    
  }

  getAttendanceDetails(AttendenceId: number) {
    this.addrecordService.getAttendenceDetails(AttendenceId).subscribe(
      (result: any) => {
        if (result && result.Value) {
          this.attendenceDetails = result.Value.Item1;

          this.attendenceDetails.Date = this.addrecordService.formatDate(this.attendenceDetails.Date);
 
          this.attendenceDetails.Time = this.baseservice.extractTime(this.attendenceDetails.Time);


          this.attendenceForm.patchValue({

            Time: this.attendenceDetails.Time
          });

          this.setParameter();
          console.error('No data found for BirthId: ' + AttendenceId);
        }
      },
      (error: any) => {
        console.error('Error retrieving birthday details:', error);

      }
    );
  }



}




