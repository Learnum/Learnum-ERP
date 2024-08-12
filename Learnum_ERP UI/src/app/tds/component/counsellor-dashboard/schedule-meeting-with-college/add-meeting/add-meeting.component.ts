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
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[];
  collegeDetails:any;
  editData: any;

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
    this.editData = this.activateRoute.snapshot.queryParams;
    if (this.editData.source === 'edit' && this.editData.MeetingId) {
      this.getMettingDetails(this.editData.MeetingId);
    }
  }


  setParameter() {
    this.fields = [
      {
        fieldGroupClassName: 'row card-body p-2',
        fieldGroup: [ 
          {
            key:'meetingId',
          },
          {
            className: 'col-md-3',
            type: 'select',
            key: 'CollegeId',
            templateOptions: {
              label: "College Name",
              //placeholder: 'Select College',  // Placeholder for the dropdown
              required: true,
              options: [
                { value: null, label: 'Select College', disabled: true },  // Disabled placeholder option
                ...this.collegeDetails ? this.collegeDetails.map(college => ({
                  label: college.CollegeName,
                  value: college.CollegeId
                })) : [],
              ],
            },
            defaultValue: null,  // Optional: set a default value if needed
            validators: {
              required: {
                expression: (c: AbstractControl) => c.value !== null && c.value !== '', // Ensure a valid value is selected
                message: 'College Name is required',
              },
            },
            validation: {
              messages: {
                required: 'College Name is required',
              },
            },
          },
          
          {
            className: 'col-md-3',
            type: 'input',
            key: 'Meetingwith',
            props: {
              placeholder: 'Meeting with',
              type: 'text',
              label: "Meeting with",
              required: true,
              pattern: '^[A-Za-z]+$',
            },
            validation: {
              messages: {
                required: 'Meeting Name is required',
                pattern: 'Please Enter Meeting with',
              },
            },
          },
          {
            className: 'col-md-3',
            key: 'MeetingDate',
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
            className: 'col-md-3',
            key: 'MeetingTime',
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
            className: 'col-md-3',
            key: 'MeetingLocation',
            type: 'input',
            props: {
              label: 'Meeting Location',
              placeholder: 'Enter Meeting Location',
              required: true,
              type:'text',
              pattern: '^[A-Za-z]+$',
            },
            validation: {
              messages: {
                required: 'Meeting Location is required',
                pattern: 'Please Enter Meeting location'
              },
            },
          },
          // {
          //   className: 'col-md-6',
          //   type: 'textarea',
          //   key: 'MeetingAgenda',
          //   templateOptions: {
          //     placeholder: 'Enter Meeting Agenda',
          //     label: 'Meeting Agenda',
          //     required: true,
          //     rows: 5,
             
          //   },
          //   validation: {
          //     messages: {
          //       required: 'Meeting Agenda is required',
          //     },
          //   },
          // },
          {
            className: 'col-md-6',
            key: 'MeetingAgenda',
            type: 'textarea',
            props: {
              label: 'Meeting Agenda',
              placeholder: 'Enter Meeting Agenda',
              required: true,
              attributes: {
                style: 'overflow:hidden; resize:none;',
                oninput: "this.style.height = 'auto'; this.style.height = this.scrollHeight + 'px';"
              }
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
  onSubmit(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
       this.InsertMeetingDetails();
    } else {
      this.alertService.ShowErrorMessage('Please fill in all required fields.');
    }
  }
  onCancleClick() {
    this.router.navigateByUrl('tds/counsellor-dashboard/schedule-meeting-with-college');
  }
  onResetClick() {
    this.form.reset();
  }
  
  InsertMeetingDetails() {
    this.meetingDetails.addedBy = 1;
    this.meetingDetails.addedDate = new Date();
    this.meetingDetails.updatedBy = 1;
    this.meetingDetails.updatedDate = new Date();
  //  this.meetingDetails.meetingId = 0;

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

	getMettingDetails(MeetingId: number) {
    this.collegemeetingService.getMettingDetails(MeetingId).subscribe(
      (result: any) => {
        if (result && result.Value) {
          this.meetingDetails = result.Value.Item1;
          this.setParameter();
          console.error('No data found for MeetingId: ' + MeetingId);
        }
      },
      (error: any) => {
        console.error('Error retrieving metting details:', error);
      }
    );
  }

}
