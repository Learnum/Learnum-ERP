import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { AlertService } from 'src/app/core/services/alertService';
import { MessageService } from 'src/app/core/services/message.service';
import { FormGroup, FormBuilder,Validators, AbstractControl } from '@angular/forms';
import { CollegemeetingService } from './collegemeeting.service';
import { MeetingDetails } from './collegemeeting.model';
import { ResponseCode } from 'src/app/core/models/responseObject.model';

@Component({
  selector: 'app-add-meeting',
  templateUrl: './add-meeting.component.html',
  styleUrls: ['./add-meeting.component.scss']
})
export class AddMeetingComponent implements OnInit {

  meetingDetails:MeetingDetails=new MeetingDetails();
  form = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[];
  collegeDetails:any;

  constructor(
    private router: Router,
    private alertService: AlertService,
    private messageService: MessageService,
    private activateRoute: ActivatedRoute,
    private fb: FormBuilder,
    private collegemeetingService:CollegemeetingService
  ) { }

  ngOnInit(): void {
    this.setParameter();
    this.getCollegeDetails();
    
  }


  setParameter() {
    this.fields = [
      {
        fieldGroupClassName: 'row card-body p-2',
        fieldGroup: [ 
          {
            className: 'col-md-6',
            type: 'select',
            key: 'CollegeId',
            templateOptions: {
              placeholder: 'College Name',
              type: 'text',
              label: "College Name",
              required: true,
              options: this.collegeDetails ? this.collegeDetails.map(college => ({ label: college.CollegeName, value: college.CollegeId })) : [],
            },

          },
          {
            className: 'col-md-6',
            type: 'input',
            key: 'meetingwith',
            props: {
              placeholder: 'Meeting with',
              type: 'text',
              label: "Meeting with",
              required: true,
            },
            validation: {
              messages: {
                required: 'Meeting Name is required',

              },
            },
          },
          {
            className: 'col-md-6',
            key: 'meetingDate',
            type: 'input',
            props: {
              label: 'Meeting Date',
              placeholder: 'Select Meeting Date',
              type: 'date',
              required: true,
            },
            validation: {
              messages: {
                required: 'Meeting Date is required',
              },
            },
          },
          {
            className: 'col-md-6',
            key: 'meetingTime',
            type: 'input',
            props: {
              label: 'Meeting Time',
              placeholder: 'Select Meeting Time',
              type: 'time',
              required: true,
            },
            validation: {
              messages: {
                required: 'Meeting Time is required',
              },
            },
          },
          {
            className: 'col-md-6',
            key: 'meetingLocation',
            type: 'input',
            props: {
              label: 'Meeting Location',
              placeholder: 'Enter Meeting Location',
              required: true,
            },
            validation: {
              messages: {
                required: 'Meeting Location is required',
              },
            },
          },
          {
            className: 'col-md-',
            type: 'textarea',
            key: 'meetingAgenda',
            templateOptions: {
              placeholder: 'Enter Meeting Agenda',
              label: 'Meeting Agenda',
              required: true,
              rows: 10,
             
            },
            validation: {
              messages: {
                required: 'Meeting Agenda is required',
              },
            },
          },
        ],
      },
    ];
  }

  onCancelClick() {
    this.router.navigateByUrl('tds/counsellor-dashboard/schedule-meeting-with-college');
  }

  onSubmit(): void {
    this.InsertMeetingDetails();
    // this.form.markAllAsTouched();
    // if (this.form.valid) {
    //   // Handle form submission
    // } else {
    //   // Handle form errors
    // }
  }
  
  InsertMeetingDetails() {
    this.meetingDetails.addedBy = 1;
    this.meetingDetails.addedDate = new Date();
    this.meetingDetails.updatedBy = 1;
    this.meetingDetails.updatedDate = new Date();
    this.meetingDetails.meetingId = 0;

    this.collegemeetingService.insertMeetingDetails(this.meetingDetails).subscribe(
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
    this.router.navigateByUrl('tds/counsellor-dashboard/schedule-meeting-with-college');
  }

  getCollegeDetails() {
    this.collegemeetingService.getCollegeList().subscribe(
      (data: any) => {
        this.collegeDetails = data.Value;
        this.setParameter();  
      },
      (error: any) => {
        this.alertService.ShowErrorMessage(error);
      }
    );
  }

}
