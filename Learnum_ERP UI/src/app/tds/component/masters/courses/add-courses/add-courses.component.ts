import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { AlertService } from 'src/app/core/services/alertService';
import { MessageService } from 'src/app/core/services/message.service';
import { coursesDetails } from './coursesDetails.model';

@Component({
  selector: 'app-add-courses',
  templateUrl: './add-courses.component.html',
  styleUrls: ['./add-courses.component.scss']
})
export class AddCoursesComponent implements OnInit {

  coursesDetails: coursesDetails = new coursesDetails();
  fields: FormlyFieldConfig[];
  options: FormlyFormOptions = {};
  editData: any;
  tdsReturnList: any;
  form: any;
  branchDetails: any;

  constructor(
    private router: Router,

    //private addclassroomService: AddClassroomsService,
    private alertService: AlertService,
    private messageService: MessageService,
    private activateRoute: ActivatedRoute,
    private fb: FormBuilder

  ) { }

  ngOnInit(): void {
    this.setParameter();
    this.createForm();
  }

  createForm(): void {
    this.form = this.fb.group({
      CourseName: ['', Validators.required],
      Description: ['', Validators.required],
      CourseStatus: ['', Validators.required],
      UploadBrochure: ['', Validators.required],
   });
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
            className: 'col-md-4',
            type: 'input',
            key: 'Courses Name',
            templateOptions: {
              placeholder: 'Enter Courses Name',
              type: 'text',
              label: "Courses Name",
              required: true,

            },

          },
          {
            className: 'col-md-4',
            type: 'input',
            key: 'Description',
            props: {
              placeholder: 'Enter Description',
              type: 'text',
              label: "Description",
              required: true,

            },
            validation: {
              messages: {
                required: 'Description is required',

              },
            },
          },
          {
            className: 'col-md-4',
            type: 'input',
            key: 'Course Status',
            props: {
              placeholder: 'Enter SCourse Status',
              required: true,
              type: 'text',
              label: "Course Status",

            },

            validation: {
              messages: {
                required: 'Course Status is required',

              },
            },
          },
          {
            className: 'col-md-4',
            type: 'input',
            key: 'Upload Brochure',
            props: {
              placeholder: 'select File',
              type: 'text',
              label: "Upload Brochure",
              required: true,

            },
            validation: {
              messages: {
                required: 'Classroom Status is required',

              },
            },
          }
        ],
      },
    ];
  }

  onCancleClick() {
    this.router.navigateByUrl('tds/masters/courses');
  }

  get f() {
    return this.form.controls;
  }

  onSubmit(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      
    }
    else {
      this.alertService.ShowErrorMessage('Please fill in all required fields.');
    }
  }

}
