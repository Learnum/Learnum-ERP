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
  }

  setParameter() {
    this.fields = [
      {
        fieldGroupClassName: 'row card-body p-2',
        fieldGroup: [
          {
            className: 'col-md-6',
            type: 'select',
            key: 'collegeId',
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
            key: 'spockPerson',
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
            className: 'col-md-6',
            key: 'seminarDate',
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
            className: 'col-md-6',
            key: 'seminarTime',
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
            className: 'col-md-6',
            key: 'seminarLocation',
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
            className: 'col-md-6',
            key: 'seminarStatus',
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
          {
            className: 'col-md-',
            type: 'textarea',
            key: 'seminarAgenda',
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
  onCancelClick() {
    this.router.navigateByUrl('tds/counsellor-dashboard/schedule-seminar-with-college');
  }

  onSubmit(): void {
    this.InsertSeminarDetails();
    // this.form.markAllAsTouched();
    // if (this.form.valid) {
    //   // Handle form submission
    // } else {
    //   // Handle form errors
    // }
  }

  InsertSeminarDetails() {
    this.seminarDetailsModel.addedBy = 1;
    this.seminarDetailsModel.addedDate = new Date();
    this.seminarDetailsModel.updatedBy = 1;
    this.seminarDetailsModel.updatedDate = new Date();
    this.seminarDetailsModel.seminarId = 0;

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
}
