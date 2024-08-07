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
    this.editData = this.activateRoute.snapshot.queryParams;
    if (this.editData.source === 'edit' && this.editData.CourseId) {
      this.getCourseDetails(this.editData.CourseId);
    }
  }

  setParameter() {
    this.fields = [
      {
        fieldGroupClassName: 'row card-body p-2',
        // key: 'ITDPreEmploymentSalModel',
        fieldGroup: [
          {
            key: 'CourseId',
          },
          {
            className: 'col-md-3',
            type: 'input',
            key: 'CourseName',
            templateOptions: {
              placeholder: 'Enter Courses Name',
              type: 'text',
              label: "CoursesName",
              required: true,
              pattern: "^[A-Za-z]+( [A-Za-z]+)*$",
            },

          },
          {
            className: 'col-md-3',
            type: 'input',
            key: 'Description',
            props: {
              placeholder: 'Enter Description',
              type: 'text',
              label: "Description",
              required: true,
              pattern: "^[A-Za-z]+( [A-Za-z]+)*$",
            },
          },
         
          {
            className: 'col-md-3',
            type: 'select',
            key: 'IsActive',
            props: {
              placeholder: 'Course Status',
              required: true,
              label: 'Course Status',
              options: [
                { value: true, label: 'Active' },
                { value: false, label: 'InActive' }
              ],
            },
            validation: {
              messages: {
                required: 'Please select a course status',
              },
            },
          },
          {
            className: 'col-md-2',
            type: 'file',
            key: 'file',
            props: {
              placeholder: 'select File',
              // type: 'text',
              label: "Upload Brochure*",
              //required: true,

            },
          },
        ],
      },
    ];
  }

  onCancleClick() {
    this.router.navigateByUrl('tds/masters/courses');
  }
  onResetClick() {
    this.form.reset();
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
  getCourseDetails(CourseId: number) {
    this.addCoursesService.getCourseDetails(CourseId).subscribe(
      (result: any) => {
        if (result && result.Value) {
          this.coursesDetails = result.Value.Item1;
          this.setParameter();
          console.error('No data found for CourseId: ' + CourseId);
        }
      },
      (error: any) => {
        console.error('Error retrieving Course details:', error);

      }
    );
  }
}
