import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { AlertService } from 'src/app/core/services/alertService';
import { MessageService } from 'src/app/core/services/message.service';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { CollegeseminarService } from './collegeseminar.service';
import { ResponseCode } from 'src/app/core/models/responseObject.model';
import { SeminarDetailsModel } from './collegeseminar.model';
import { formatDate } from '@angular/common';
import { BaseService } from 'src/app/core/services/baseService';




@Component({
  selector: 'app-add-seminar',
  templateUrl: './add-seminar.component.html',
  styleUrls: ['./add-seminar.component.scss']
})
export class AddSeminarComponent implements OnInit {


  seminarDetailsModel: SeminarDetailsModel = new SeminarDetailsModel();
  form = new FormGroup({});
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[];
  collegeDetails: any;
  editData: any;
  NowDate: any = new Date();
  seminarForm: any;

  constructor(
    private router: Router,
    private alertService: AlertService,
    private messageService: MessageService,
    private activateRoute: ActivatedRoute,
    private fb: FormBuilder,
    private collegeseminarService: CollegeseminarService,
    private baseservice: BaseService) { }

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
            key: 'seminarId'
          },
          {
            className: 'col-md-3',
            type: 'select',
            key: 'CollegeId',
            templateOptions: {
              label: "College Name",
              // placeholder: 'Select College',  // Placeholder for the dropdown
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
            key: 'SpockPerson',
            type: 'input',
            props: {
              label: 'Spock Person',
              placeholder: 'Enter Spock Person Name',
              required: true,
              type: 'text',
            }, hooks: {
              onInit: (field) => {
                field.formControl.valueChanges.subscribe(value => {
                  // Remove any numbers from the input
                  const sanitizedValue = value.replace(/[^A-Za-z ]/g, '');
                  // Capitalize the first letter of each word
                  const capitalizedValue = sanitizedValue.replace(/\b\w/g, char => char.toUpperCase());
                  if (value !== capitalizedValue) {
                    field.formControl.setValue(capitalizedValue, { emitEvent: false });
                  }
                });
              }
            },
            validation: {
              messages: {
                required: 'Spock Person is required',
                pattern: 'Please Enter Spock Person name',
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
              attributes: {
                min: formatDate(new Date(), 'yyyy-MM-dd', 'en-IN'), // Sets today's date as the minimum
              },
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
              defaultValue: '12:00',
            },
            validators: {
              timeValidation: {
                expression: (control: AbstractControl) => control.value !== '00:00', // Custom validation to block '00:00'
                message: '00:00 is not a valid time. Please select a different time.',
              },
            },
            validation: {
              messages: {
                required: 'Seminar Time is required',
              },
            },
          },
          
          {
            className: 'col-md-3',
            key: 'SeminarLocation',
            type: 'input',
            props: {
              label: 'Seminar Location',
              placeholder: 'Enter Seminar Location',
              required: true,
              type: 'text',
            },
            hooks: {
              onInit: (field) => {
                field.formControl.valueChanges.subscribe(value => {
                  // Remove any numbers from the input
                  const sanitizedValue = value.replace(/[^A-Za-z ]/g, '');
                  // Capitalize the first letter of each word
                  const capitalizedValue = sanitizedValue.replace(/\b\w/g, char => char.toUpperCase());

                  if (value !== capitalizedValue) {
                    field.formControl.setValue(capitalizedValue, { emitEvent: false });
                  }
                });
              }
            },
            validation: {
              messages: {
                required: 'Seminar Location is required',
                pattern: 'Please Enter Seminar Location',
              },
            },
          },
          {
            className: 'col-md-3',
            type: 'select',
            key: 'SeminarStatus',
            templateOptions: {
              label: 'Seminar Status',
              //placeholder: 'Select Seminar Status',
              required: true,
              options: [
                { value: null, label: 'Select Seminar Status', disabled: true }, // Disabled placeholder option
                { value: 'scheduled', label: 'Scheduled' },
                { value: 'inProgress', label: 'In Progress' },
                { value: 'confirmed', label: 'Confirmed' },
                { value: 'completed', label: 'Completed' },
                { value: 'canceled', label: 'Canceled' },
              ],
            },
            defaultValue: null,
            validators: {
              required: {
                expression: (c: AbstractControl) => c.value !== null && c.value !== '', // Ensure a valid value is selected
                message: 'Seminar Status is required',
              },
            },
            validation: {
              messages: {
                required: 'Seminar Status is required',
              },
            },
          },
          {
            className: 'col-md-6',
            type: 'textarea',
            key: 'SeminarAgenda',
            templateOptions: {
              placeholder: 'Enter Seminar Agenda',
              label: 'Seminar Agenda',
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
      this.InsertSeminarDetails();
    } else {
      this.alertService.ShowErrorMessage('Please fill in all required fields.');
    }
  }
  onCancleClick() {
    this.router.navigateByUrl('erp/counsellor-dashboard/schedule-seminar-with-college');
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
          this.router.navigateByUrl('erp/counsellor-dashboard/schedule-seminar-with-college');
        } else if (serviceResponse === ResponseCode.Update) {
          this.alertService.ShowSuccessMessage(this.messageService.updateSuccessfully);
          this.router.navigateByUrl('erp/counsellor-dashboard/schedule-seminar-with-college');
        } else {
          this.alertService.ShowErrorMessage(this.messageService.serviceError);
        }
      },
      (error: any) => {
        this.alertService.ShowErrorMessage(error);
      }
    );

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

          this.seminarDetailsModel.SeminarDate = this.baseservice.formatDate(this.seminarDetailsModel.SeminarDate);

          this.seminarDetailsModel.SeminarTime = this.baseservice.extractTime(this.seminarDetailsModel.SeminarTime);


          this.seminarForm.patchValue({

            SeminarTime: this.seminarDetailsModel.SeminarTime
          });
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
