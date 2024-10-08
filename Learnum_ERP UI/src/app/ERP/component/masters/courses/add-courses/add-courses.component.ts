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
        fieldGroup: [
          {
            key: 'CourseId',
          },
          {
            className: 'col-md-3',
            type: 'input',
            key: 'CourseName',
            templateOptions: {
              placeholder: 'Enter Course Name',
              type: 'text',
              label: 'Course Name',
              required: true,
              pattern: '^[A-Za-z ]+$', 
            },
            validation: {
              messages: {
                required: 'Course Name is required',
                pattern: 'Course Name must contain only letters and spaces', 
              },
            },
            hooks: {
              onInit: (field) => {
                const formControl = field.formControl;
                formControl.valueChanges.subscribe(value => {
                  if (value) {
                    let sanitizedValue = value.replace(/[^A-Za-z\s]/g, '');
                    sanitizedValue = sanitizedValue.replace(/\b\w/g, char => char.toUpperCase());
                    formControl.setValue(sanitizedValue, { emitEvent: false });
                  }
                });
              }
            }
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
            templateOptions: {
              label: 'Course Status',
              //placeholder: 'Select Course Status',
              required: true,
              options: [
                { value: null, label: 'Select Course Status', disabled: true },
                { value: true, label: 'Active' },
                { value: false, label: 'Inactive' }
              ],
            },
            defaultValue: null,  
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
              label: "Upload Brochure*",
             },
          },
        ],
      },
    ];
  }

  navigate() {
    this.router.navigateByUrl('erp/masters/courses');
  }

  onCancleClick() {
    this.router.navigateByUrl('erp/masters/courses');
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

    this.coursesDetails.AddedBy = 1;
    this.coursesDetails.AddedDate = new Date();
    this.coursesDetails.UpdatedBy = 1;
    this.coursesDetails.UpdatedDate = new Date();

    this.addCoursesService.insertCourseData(this.coursesDetails).subscribe(
      (result: any) => {
        const serviceResponse = result.Value;
        if (serviceResponse === ResponseCode.Success) {
          this.alertService.ShowSuccessMessage(this.messageService.savedSuccessfully);
          this.router.navigateByUrl('erp/masters/courses');

        } else if (serviceResponse === ResponseCode.Update) {
          this.alertService.ShowSuccessMessage(this.messageService.updateSuccessfully);
          this.router.navigateByUrl('erp/masters/courses');

        } else {
          this.alertService.ShowErrorMessage(this.messageService.serviceError);
        }
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
