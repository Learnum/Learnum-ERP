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
  model: any = {};
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[];
  courseDetails: any;


  constructor(
    private router: Router,
    private alertService: AlertService,
    private messageService: MessageService,
    private activateRoute: ActivatedRoute,
    private websiteleadsService:WebsiteleadsService) { }

  ngOnInit(): void {
    this.setParameter();
    this.getCourseDetails();
  }

  setParameter() {
    this.fields = [
      {
        fieldGroupClassName: 'row card-body p-2',
        fieldGroup: [
          {
            className: 'col-md-6',
            key: 'studentName',
            type: 'input',
            props: {
              label: 'Student Name',
              placeholder: 'Enter Student Name',
              required: true,
            },
            validation: {
              messages: {
                required: 'Student Name is required',
              },
            },
          },
          {
            className: 'col-md-4',
            type: 'select',
            key: 'CourseId',
            templateOptions: {
              placeholder: 'Select',
              type: 'text',
              label: "Course Name",
              required: true,
              options: this.courseDetails ? this.courseDetails.map(course => ({ label: course.CourseName, value: course.CourseId })) : [],
            },
          },
          {
            className: 'col-md-6',
            key: 'phone',
            type: 'input',
            props: {
              label: 'Phone',
              placeholder: 'Enter Phone Number',
              type: 'tel',
              required: true,
            },
            validation: {
              messages: {
                required: 'Phone is required',
              },
            },
          },
          {
            className: 'col-md-6',
            key: 'email',
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
            className: 'col-md-6',
            key: 'yourLocation',
            type: 'input',
            props: {
              label: 'Your Location',
              placeholder: 'Enter Your Location',
              required: true,
            },
            validation: {
              messages: {
                required: 'Your Location is required',
              },
            },
          },
        ],
      },
    ];
  }
  onCancelClick() {
    this.router.navigateByUrl('tds/counsellor-dashboard/website-leads');
  }

  onSubmit(): void {
    this.insertWebsiteLeads();
    // this.form.markAllAsTouched();
    // if (this.form.valid) {
    //   // Handle form submission
    // } else {
    //   // Handle form errors
    // }
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
    this.websiteLeadDetails.studentId = 0;

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

}
