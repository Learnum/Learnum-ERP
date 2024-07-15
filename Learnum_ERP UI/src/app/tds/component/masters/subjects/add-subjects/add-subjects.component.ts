import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { ResponseCode } from 'src/app/core/models/responseObject.model';
import { AlertService } from 'src/app/core/services/alertService';
import { MessageService } from 'src/app/core/services/message.service';
import { AddSubjectsService } from './add-subjects.service';
import { SubjectModel } from './add-subject.model';

@Component({
  selector: 'app-add-subjects',
  templateUrl: './add-subjects.component.html',
  styleUrls: ['./add-subjects.component.scss']
})
export class AddSubjectsComponent implements OnInit {

  subjectModel:SubjectModel=new SubjectModel();
  
  fields: FormlyFieldConfig[];
  options: FormlyFormOptions = {};
  editData: any;
  tdsReturnList: any;
  form: any;
  branchDetails: any;
  courseDetails: any;

  constructor(
    private router: Router,
    private alertService: AlertService,
    private messageService: MessageService,
    private activateRoute: ActivatedRoute,
    private fb: FormBuilder,
    private addSubjectsService: AddSubjectsService

  ) { }

  ngOnInit(): void {
    this.setParameter();
   this.getCourseDetails();
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
            className: 'col-md-4',
            type: 'input',
            key: 'subjectName',
            props: {
              placeholder: 'Subject Name',
              type: 'text',
              label: "Subject Name",
              required: true,

            },
            validation: {
              messages: {
                required: 'Subject Name is required',

              },
            },
          },
          {
            className: 'col-md-4',
            type: 'select',
            key: 'isActive',
            props: {
              placeholder: 'Select Subject',
              required: true,
              type: 'text',
              label: 'Subject Status',
              options: [
                { value: true, label: 'Active' },
                { value: false, label: 'InActive' }
              ],
            },
          },
          {
            className: 'col-md-',
            type: 'textarea',
            key: 'subjectDescription',
            templateOptions: {
              placeholder: 'Enter Subject Description',
              label: 'Subject Description',
              required: true,
              rows: 10,
             
            },
            validation: {
              messages: {
                required: 'Subject Description is required',
              },
            },
          },
          
        ],
      },
    ];
  }

  onCancleClick() {
    this.router.navigateByUrl('tds/masters/subjects');
  }

  // get f() {
  //   return this.form.controls;
  // }

  onSubmit(): void {
    // this.form.markAllAsTouched();
    // if (this.form.valid) {
    //   this.insertSubject();
    // }
    // else {
    //   this.alertService.ShowErrorMessage('Please fill in all required fields.');
    // }

    this.insertSubject();
  }

  getCourseDetails() {
    this.addSubjectsService.getClassroomList().subscribe(
      (data: any) => {
        this.courseDetails = data.Value;
        this.setParameter();  
      },
      (error: any) => {
        this.alertService.ShowErrorMessage(error);
      }
    );
  }

  insertSubject() {
    this.subjectModel.addedBy = 1;
    this.subjectModel.addedDate = new Date();
    this.subjectModel.updatedBy = 1;
    this.subjectModel.updatedDate = new Date();
    this.subjectModel.subjectId = 0;

    this.addSubjectsService.insertSubjectDetails(this.subjectModel).subscribe(
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
    this.router.navigateByUrl('tds/masters/subjects');
  }
}
  





