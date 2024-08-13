import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { AlertService } from 'src/app/core/services/alertService';
import { MessageService } from 'src/app/core/services/message.service';
import { FormGroup, FormBuilder,Validators, AbstractControl } from '@angular/forms';
import { WebsiteleadsService } from './websiteleads.service';
import { WebsiteLeadDetails } from './websiteleads.model';
import { ResponseCode } from 'src/app/core/models/responseObject.model';

@Component({
  selector: 'app-add-website',
  templateUrl: './add-website.component.html',
  styleUrls: ['./add-website.component.scss']
})
export class AddWebsiteComponent implements OnInit {

  websiteLeadDetails:WebsiteLeadDetails = new WebsiteLeadDetails();
  form = new FormGroup({});
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[];
  courseDetails: any;
  editData: any;


  constructor(
    private router: Router,
    private alertService: AlertService,
    private messageService: MessageService,
    private activateRoute: ActivatedRoute,
    private websiteleadsService:WebsiteleadsService) { }

  ngOnInit(): void {
    this.setParameter();
    this.getCourseDetails();
    this.editData = this.activateRoute.snapshot.queryParams;
    if (this.editData.source === 'edit' && this.editData.StudentId) {
      this.getWebsiteLeadsDetails(this.editData.StudentId);
    }
  }

  setParameter() {
    this.fields = [
      {
        fieldGroupClassName: 'row card-body p-2',
        fieldGroup: [
          {
            key:'studentId'
          },
          {
            className: 'col-md-3',
            key: 'StudentName',
            type: 'input',
            props: {
              label: 'Student Name',
              placeholder: 'Enter Student Name',
              type: 'text',
              required: true,
              pattern: '^[A-Za-z]+$',
            },
            validation: {
              messages: {
                required: 'Student Name is required',
                pattern: 'Please Enter Student FullName',
              },
            },
          },
          {
            className: 'col-md-3',
            type: 'select',
            key: 'CourseId',
            templateOptions: {
              label: "Course Name",
             // placeholder: 'Select Course',  // Placeholder for the dropdown
              required: true,
              options: [
                { value: null, label: 'Select Course', disabled: true },  // Disabled placeholder option
                ...this.courseDetails ? this.courseDetails.map(course => ({ label: course.CourseName, value: course.CourseId })) : [],
              ]
            },
            defaultValue: null,  // Optional: set a default value if needed
            validators: {
              required: {
                expression: (c: AbstractControl) => c.value !== null && c.value !== '', // Ensure a valid value is selected
                message: 'Course selection is required',
              },
            },
            validation: {
              messages: {
                required: 'Course selection is required',
              },
            },
          }
          ,
          {
            className: 'col-md-3',
            key: 'Phone',
            type: 'input',
            templateOptions: {
              label: 'parent Phone',
              placeholder: 'Enter Phone Number',
              required: true,
              maxLength: 10,
              minLength: 10,
            },
            hooks: {
              onInit: (field) => {
                field.formControl.valueChanges.subscribe(value => {
                  const sanitizedValue = value.replace(/[^0-9]/g, '');
                  if (sanitizedValue !== value) {
                    field.formControl.setValue(sanitizedValue, { emitEvent: false });
                  }
                });
              },
            },
            validators: {
              phoneNumber: {
                expression: (c: AbstractControl) => {
                  const value = c.value;
                  // Ensure the value is exactly 10 digits long
                  return value && /^[0-9]{10}$/.test(value);
                },
                message: (error: any, field: FormlyFieldConfig) => {
                  return `"${field.formControl.value}" is not a valid 10-digit phone number`;
                },
              },
            },
            validation: {
              messages: {
                required: 'Phone Number is required',
                phoneNumber: 'The phone number must contain only numbers and be exactly 10 digits long',
              },
            },
          },
          {
            className: 'col-md-3',
            key: 'Email',
            type: 'input',
            props: {
              label: 'Email',
              placeholder: 'Enter Email Address',
              type: 'email',
              required: true,
            },
            validation: {
              messages: {
                required: 'Email is required',
              },
            },
          },
          {
            className: 'col-md-3',
            key: 'YourLocation',
            type: 'input',
            props: {
              label: 'Your Location',
              placeholder: 'Enter Your Location',
              required: true,
              pattern: '^[A-Za-z]+$',
            },
            validation: {
              messages: {
                required: 'Your Location is required',
                pattern: 'Please Enter Your Location',
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
      this. insertWebsiteLeads();
    } else {
      this.alertService.ShowErrorMessage('Please fill in all required fields.');
    }
  }
  onCancleClick() {
    this.router.navigateByUrl('tds/counsellor-dashboard/website-leads');
  }
  onResetClick() {
    this.form.reset();
  }
  getCourseDetails() {
    this.websiteleadsService.getClassroomList().subscribe(
      (data: any) => {
        this.courseDetails = data.Value;
        this.setParameter();  
      },
      (error: any) => {
        this.alertService.ShowErrorMessage(error);
      }
    );
  }

  insertWebsiteLeads() {
    this.websiteLeadDetails.addedBy = 1;
    this.websiteLeadDetails.addedDate = new Date();
    this.websiteLeadDetails.updatedBy = 1;
    this.websiteLeadDetails.updatedDate = new Date();
    //this.websiteLeadDetails.studentId = 0;

    this.websiteleadsService.insertWebsiteDetails(this.websiteLeadDetails).subscribe(
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
    this.router.navigateByUrl('tds/counsellor-dashboard/website-leads');
  }
  getWebsiteLeadsDetails(StudentId: number) {
    this.websiteleadsService.getWebsiteLeadList(StudentId).subscribe(
      (result: any) => {
        if (result && result.Value) {
          this.websiteLeadDetails = result.Value.Item1;
          this.setParameter();
          console.error('No data found for StudentId: ' + StudentId);
        }
      },
      (error: any) => {
        console.error('Error retrieving practical details:', error);
      }
    );
  }

}
