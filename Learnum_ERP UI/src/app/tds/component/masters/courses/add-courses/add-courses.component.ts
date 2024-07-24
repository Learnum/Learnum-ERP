import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { AlertService } from 'src/app/core/services/alertService';
import { MessageService } from 'src/app/core/services/message.service';
import { coursesDetailsModel } from './coursesDetails.model';
import { FormGroup } from '@angular/forms';
import { AddCoursesService } from './add-courses.service';
import { ResponseCode } from 'src/app/core/models/responseObject.model';

@Component({
  selector: 'app-add-courses',
  templateUrl: './add-courses.component.html',
  styleUrls: ['./add-courses.component.scss']
})
export class AddCoursesComponent implements OnInit {

  coursesDetails: coursesDetailsModel = new coursesDetailsModel();
  fields: FormlyFieldConfig[];
  options: FormlyFormOptions = {};
  editData: any;
  tdsReturnList: any;
  branchDetails: any;
  form = new FormGroup({});

  constructor(
    private router: Router,
    private addCoursesService: AddCoursesService,
    private alertService: AlertService,
    private messageService: MessageService,
    private activateRoute: ActivatedRoute,
    private fb: FormBuilder

  ) { }

  ngOnInit(): void {
    this.setParameter();
   
  }

  
  reset() {
    throw new Error('Method not implemented.');
  }

  setParameter() {
    this.fields = [
      {
        fieldGroupClassName: 'row card-body p-2',
        // key: 'ITDPreEmploymentSalModel',
        fieldGroup: [

          {
            className: 'col-md-6',
            type: 'input',
            key: 'courseName',
            templateOptions: {
              placeholder: 'Enter Courses Name',
              type: 'text',
              label: "CoursesName",
              required: true,

            },

          },
          {
            className: 'col-md-6',
            type: 'input',
            key: 'description',
            props: {
              placeholder: 'Enter Description',
              type: 'text',
              label: "Description",
              required: true,

            },
            // validation: {
            //   messages: {
            //     required: 'Description is required',

            //   },
            // },
          },
          {
            className: 'col-md-6',
            type: 'select',
            key: 'isActive',
            props: {
              placeholder: 'Course Status',
              required: true,
              type: 'text',
              label: "Course Status",
              options: [
                { label: 'Active', value: 'true' },
                { label: 'Inactive', value: 'false' }
              ]
            },
          },
          {
            className: 'col-md-1',
            type: 'file',
            key: 'file',
            props: {
              placeholder: 'select File',
             // type: 'text',
              label: "Upload Brochure",
              required: true,

            },
            // validation: {
            //   messages: {
            //     required: 'Upload Brochure is required',

            //   },
            // },
          }
        ],
      },
    ];
  }

  onCancleClick() {
    this.router.navigateByUrl('tds/masters/courses');
  }
  onSubmit(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.insertCourse();
    } else {
      this.alertService.ShowErrorMessage('Please fill in all required fields.');
    }
  }
   insertCourse() {
    this.addCoursesService.insertCourseData(this.coursesDetails).subscribe(
      (result: any) => {
        const serviceResponse = result.Value;
        if (serviceResponse === ResponseCode.Success) {
          this.alertService.ShowSuccessMessage(this.messageService.savedSuccessfully);
        } else if (serviceResponse === ResponseCode.Update) {
          this.alertService.ShowSuccessMessage(this.messageService.updateSuccessfully);
        } else {
          this.alertService.ShowErrorMessage(this.messageService.serviceError);
        }
        this.router.navigateByUrl('tds/masters/courses');
      },
      (error: any) => {
        this.alertService.ShowErrorMessage(error);
      }
    );
  }


}
