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

    this.editData = this.activateRoute.snapshot.queryParams;
    if (this.editData.source === 'edit' && this.editData.ContentWriterId) {
      this.getContentWriterDetails(this.editData.ContentWriterId);
    }
}

  setParameter() {
    this.fields = [
      {
        fieldGroupClassName: 'row card-body p-2',
        fieldGroup: [

          {
            key: 'ContentWriterId'

          },

          {
            className: 'col-md-3',
            type: 'input',
            key: 'ContentWriterName',
            templateOptions: {
              placeholder: 'Content Writer',
              type: 'text',
              label: "Content Writer",
              required: true,
              pattern: "^[A-Za-z]+( [A-Za-z]+)*$", 
              title: 'Only characters are allowed',
             
            },
            validation: {
              messages: {
                required: 'Name is required',
                pattern: 'Please enter a valid name ',
              },
            },
          },

          {
            className: 'col-md-3',
            type: 'select',
            key: 'CourseId',
            templateOptions: {
              label: "Course Name",
            //  placeholder: 'Select Course',  
              required: true,
              options: [
                { value: null, label: 'Select Course', disabled: true },  
                ...this.courseDetails ? this.courseDetails.map(course => ({ label: course.CourseName, value: course.CourseId })) : [],
              ]
            },
            defaultValue: null,  
            validators: {
              required: {
                expression: (c: AbstractControl) => c.value !== null && c.value !== '', 
                message: 'Course selection is required',
              },
            },
            validation: {
              messages: {
                required: 'Course selection is required',
              },
            },
          },
          
          
          {
            className: 'col-md-3',
            type: 'select',
            key: 'SubjectId',
            templateOptions: {
              label: "Subject Name",
            //  placeholder: 'Select Subject',  
              required: true,
              options: [
                { value: null, label: 'Select Subject', disabled: true },  
                ...this.subjectDetails ? this.subjectDetails.map(subject => ({
                  label: subject.SubjectName,
                  value: subject.SubjectId
                })) : [],
              ]
            },
            defaultValue: null,  
            validators: {
              required: {
                expression: (c: AbstractControl) => c.value !== null && c.value !== '', // Ensure a valid value is selected
                message: 'Subject selection is required',
              },
            },
            validation: {
              messages: {
                required: 'Subject selection is required',
              },
            },
          },
          
          {
            className: 'col-md-3',
            type: 'select',
            key: 'IsActive',
            templateOptions: {
              label: 'ContentWriter Status',
              //placeholder: 'Select ContentWriter Status',
              required: true,
              options: [
                { value: null, label: 'Select ContentWriter Status', disabled: true }, 
                { value: true, label: 'Active' },
                { value: false, label: 'Inactive' }
              ],
            },
            defaultValue: null,  
            validation: {
              messages: {
                required: 'Please select a ContentWriter status',
              },
            },
          },
        ],
      },
    ]
  }

  onCancleClick() {
    this.router.navigateByUrl('erp/hrd/content-writer');
  }

  navigate()
  {
    this.router.navigateByUrl('erp/hrd/content-writer');
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
    //this.ContentWriterDetails.isActive = true;

    this.addcontentWriterService.insertContentWriterData(this.ContentWriterDetails).subscribe(
      (result: any) => {
        let serviceResponse = result.Value
        if (result.Value === ResponseCode.Success) {
          this.alertService.ShowSuccessMessage(this.messageService.savedSuccessfully);
          this.router.navigateByUrl('erp/hrd/content-writer');

        }
        else if (serviceResponse == ResponseCode.Update) {
          this.alertService.ShowSuccessMessage(this.messageService.updateSuccessfully);
          this.router.navigateByUrl('erp/hrd/content-writer');
        }
        else {
          this.alertService.ShowErrorMessage(this.messageService.serviceError);
        }
      },
      (error: any) => {
        this.alertService.ShowErrorMessage("Enter all required fields");
      }
    )
    this.router.navigateByUrl('erp/hrd/content-writer');
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


  getContentWriterDetails(ContentWriterId: number) {
    this.addcontentWriterService.getContentWriterDetails(ContentWriterId).subscribe(
      (result: any) => {
        if (result && result.Value) {
          this.ContentWriterDetails = result.Value.Item1;

          this.setParameter();
          console.error('No data found for ContentWriterId: ' + ContentWriterId);
        }
      },
      (error: any) => {
        console.error('Error retrieving Content Writer details:', error);

      }
    );
  }

}

