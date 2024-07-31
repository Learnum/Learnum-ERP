import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { AlertService } from 'src/app/core/services/alertService';
import { MessageService } from 'src/app/core/services/message.service';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { CollegeseminarService } from './collegeseminar.service';
import { ResponseCode } from 'src/app/core/models/responseObject.model';
import { SeminarDetailsModel } from './collegeseminar.model';



@Component({
  selector: 'app-add-seminar',
  templateUrl: './add-seminar.component.html',
  styleUrls: ['./add-seminar.component.scss']
})
export class AddSeminarComponent implements OnInit {


  seminarDetailsModel: SeminarDetailsModel= new SeminarDetailsModel();
  form = new FormGroup({});
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[];
  collegeDetails: any;
  editData: any;

  constructor(
    private router: Router,
    private alertService: AlertService,
    private messageService: MessageService,
    private activateRoute: ActivatedRoute,
    private fb: FormBuilder,
    private collegeseminarService: CollegeseminarService) { }

  ngOnInit(): void {
    this.setParameter();
    this.getCollegeDetails();
    this.editData = this.activateRoute.snapshot.queryParams;
    if (this.editData.source === 'edit' && this.editData.SeminarId) {
      this.getSeminarDetails(this.editData.SeminarId);
    }
  }

  setParameter() {
    this.fields = [
      {
        fieldGroupClassName: 'row card-body p-2',
        fieldGroup: [
          {
            key:'seminarId'
          },
          {
            className: 'col-md-3',
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
            className: 'col-md-3',
            key: 'SpockPerson',
            type: 'input',
            props: {
              label: 'Spock Person',
              placeholder: 'Enter Spock Person Name',
              required: true,
              type: 'text'
            },
            validation: {
              messages: {
                required: 'Spock Person is required',
              },
            },
          },
          {
            className: 'col-md-3',
            key: 'SeminarDate',
            type: 'input',
            props: {
              label: 'Seminar Date',
              placeholder: 'Select Seminar Date',
              type: 'date',
              required: true,
            },
            validation: {
              messages: {
                required: 'Seminar Date is required',
              },
            },
          },
          {
            className: 'col-md-3',
            key: 'SeminarTime',
            type: 'input',
            props: {
              label: 'Seminar Time',
              placeholder: 'Select Seminar Time',
              type: 'time',
              required: true,
            },
            validation: {
              messages: {
                required: 'Seminar Time is required',
              },
            },
          },
          {
            className: 'col-md-2',
            key: 'SeminarLocation',
            type: 'input',
            props: {
              label: 'Seminar Location',
              placeholder: 'Enter Seminar Location',
              required: true,
            },
            validation: {
              messages: {
                required: 'Seminar Location is required',
              },
            },
          },
          {
            className: 'col-md-3',
            key: 'SeminarStatus',
            type: 'select',
            props: {
              label: 'Seminar Status',
              placeholder: 'Select Seminar Status',
              required: true,
              options: [
                { value: 'scheduled', label: 'Scheduled' },
                { value: 'inProgress', label: 'In Progress' },
                { value: 'confirmed', label: 'Confirmed' },
                { value: 'completed', label: 'Completed' },
                { value: 'canceled', label: 'Canceled' },
              ],
            },
            validation: {
              messages: {
                required: 'Seminar Status is required',
              },
            },
          },
          // {
          //   className: 'col-md-3',
          //   type: 'select',
          //   key: 'seminarStatus',
          //   props: {
          //     label: 'Seminar Status',
          //     placeholder: 'Select Seminar Status',
          //     required: true,
          //     options: [
          //       { label: 'Select Seminar Status', value: '', disabled: true }, // Default disabled option
          //       { value: 'scheduled', label: 'Scheduled' },
          //       { value: 'inProgress', label: 'In Progress' },
          //       { value: 'confirmed', label: 'Confirmed' },
          //       { value: 'completed', label: 'Completed' },
          //       { value: 'canceled', label: 'Canceled' },
          //     ],
          //   },
          //   validation: {
          //     messages: {
          //       required: 'Seminar Status is required',
          //     },
          //   },
          // },
          {
            className: 'col-md-7',
            type: 'textarea',
            key: 'SeminarAgenda',
            templateOptions: {
              placeholder: 'Enter Seminar Agenda',
              label: 'Seminar Agenda',
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
  onSubmit(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.InsertSeminarDetails();
    } else {
      this.alertService.ShowErrorMessage('Please fill in all required fields.');
    }
  }
  onCancleClick() {
    this.router.navigateByUrl('tds/counsellor-dashboard/schedule-seminar-with-college');
  }
  onResetClick() {
    this.form.reset();
  }
  InsertSeminarDetails() {
    this.seminarDetailsModel.addedBy = 1;
    this.seminarDetailsModel.addedDate = new Date();
    this.seminarDetailsModel.updatedBy = 1;
    this.seminarDetailsModel.updatedDate = new Date();
   // this.seminarDetailsModel.seminarId = 0;

    this.collegeseminarService.insertSeminarDetails(this.seminarDetailsModel).subscribe(
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
    this.router.navigateByUrl('tds/counsellor-dashboard/schedule-seminar-with-college');
  }

  getCollegeDetails() {
    this.collegeseminarService.getCollegeList().subscribe(
      (data: any) => {
        this.collegeDetails = data.Value;
        this.setParameter();
      },
      (error: any) => {
        this.alertService.ShowErrorMessage(error);
      }
    );
  }
  getSeminarDetails(SeminarId: number) {
    this.collegeseminarService.getSeminarDetails(SeminarId).subscribe(
      (result: any) => {
        if (result && result.Value) {
          this.seminarDetailsModel = result.Value.Item1;
          this.setParameter();
          console.error('No data found for SeminarId: ' + SeminarId);
        }
      },
      (error: any) => {
        console.error('Error retrieving seminar details:', error);
      }
    );
  }
}
