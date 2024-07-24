import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { AlertService } from 'src/app/core/services/alertService';
import { MessageService } from 'src/app/core/services/message.service';
import { ContentWriterDetailsModel } from '../addcontentWriter.model';
import { AddcontentWriterService } from './addcontent-writer.service';
import { ResponseCode } from 'src/app/core/models/responseObject.model';

@Component({
  selector: 'app-add-contentwriter',
  templateUrl: './add-contentwriter.component.html',
  styleUrls: ['./add-contentwriter.component.scss']
})
export class AddContentwriterComponent {

  form = new FormGroup({});
  ContentWriterDetails: ContentWriterDetailsModel = new ContentWriterDetailsModel();
  fields: FormlyFieldConfig[];
  options: FormlyFormOptions = {};
  editData: any;
  NowDate: any = new Date();
  courseDetails: any;
  subjectDetails: any;


  constructor(
    private addcontentWriterService: AddcontentWriterService,
    private router: Router,
    private alertService: AlertService,
    private messageService: MessageService,
    private activateRoute: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.setParameter();
    this.getCourseDetails();
    this.getSubjectDetails();
}

  setParameter() {
    this.fields = [
      {
        fieldGroupClassName: 'row card-body p-2',
        fieldGroup: [

          {
            className: 'col-md-6',
            type: 'select',
            key: 'CourseId',
            templateOptions: {
              placeholder: 'Course Name',
              type: 'text',
              label: "course Name",
              required: true,
              options: this.courseDetails ? this.courseDetails.map(course => ({ label: course.CourseName
                , value: course.CourseId })) : [],
              // options: [
              //   { value: 'tally', label: 'tally' },
              //   { value: 'cpat', label: 'cpat' }
              //
            },
            },

          
          {
            className: 'col-md-6',
            type: 'select',
            key: 'SubjectId',
            templateOptions: {
              placeholder: 'subject Name',
              type: 'subject Name',
              label: "Subject Name",
              required: true,
              options: this.subjectDetails ? this.subjectDetails.map(subject => ({ label: subject.SubjectName
                , value: subject.SubjectId
              })) : [],
              
            },

          },
          {
            className: 'col-md-6',
            type: 'select',
            key: 'contactwriterName',
            templateOptions: {
              placeholder: 'select',
              type: 'text',
              label: "Select Content Writer",
              required: true,
              options: [
                { value: 'john', label: 'John' },
                { value: 'Tom', label: 'Tom' }
              ]
            },
          },
          {
            className: 'col-md-4',
            type: 'select',
            key: 'isActive',
            templateOptions: {
              placeholder: 'Enter Status',
              type: 'text',
              label: "Status",
              required: true,
              options: [
                { value: 'true', label: 'active' },
                { value: 'false', label: 'inacative' }
              ]
             },
            },
        ],
      },
    ]
  }

  onCancleClick() {
    this.router.navigateByUrl('tds/hrd/content-writer');
  }

  get f() {
    return this.form.controls;
  }

  onSubmit(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.insertContentWriter();
    } else {
      this.alertService.ShowErrorMessage('Please fill in all required fields.');
    }
  }

  insertContentWriter() {
    this.ContentWriterDetails.addedBy = 1;
    this.ContentWriterDetails.addedDate = new Date();
    this.ContentWriterDetails.updatedBy = 1;
    this.ContentWriterDetails.updatedDate = new Date();
    this.ContentWriterDetails.isActive = true;

    this.addcontentWriterService.insertContentWriterData(this.ContentWriterDetails).subscribe(
      (result: any) => {
        let serviceResponse = result.Value
        if (result.Value === ResponseCode.Success) {
          this.alertService.ShowSuccessMessage(this.messageService.savedSuccessfully);

        }
        else if (serviceResponse == ResponseCode.Update) {
          this.alertService.ShowSuccessMessage(this.messageService.updateSuccessfully);
        }
        else {
          this.alertService.ShowErrorMessage(this.messageService.serviceError);
        }
      },
      (error: any) => {
        this.alertService.ShowErrorMessage("Enter all required fields");
      }
    )
    this.router.navigateByUrl('tds/hrd/content-writer');
  }

  getCourseDetails() {
    this.addcontentWriterService.getcourseList().subscribe(
      (data: any) => {
        this.courseDetails = data.Value;
        this.setParameter();  
      },
      (error: any) => {
        this.alertService.ShowErrorMessage(error);
      }
    );
  }

  getSubjectDetails() {
    this.addcontentWriterService.getsubjectList().subscribe(
      (data: any) => {
        this.subjectDetails = data.Value;
        this.setParameter();  
      },
      (error: any) => {
        this.alertService.ShowErrorMessage(error);
      }
    );
  }


}

