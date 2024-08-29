import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, AbstractControl, FormGroup } from '@angular/forms';
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

  subjectModel: SubjectModel = new SubjectModel();
  fields: FormlyFieldConfig[];
  options: FormlyFormOptions = {};
  editData: any;
  form = new FormGroup({});
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
    this.editData = this.activateRoute.snapshot.queryParams;
    if (this.editData.source === 'edit' && this.editData.SubjectId) {
      this.getSubjectDetails(this.editData.SubjectId);
    }
  }

  setParameter() {
    this.fields = [
      {
        fieldGroupClassName: 'row card-body p-2',
        fieldGroup: [
          {
            key: 'SubjectId'
          },
          {
            className: 'col-md-4',
            type: 'select',
            key: 'CourseId',
            props: {
              placeholder: 'Select Course',
              label: "Course Name",
              required: true,
              options: this.courseDetails ? this.courseDetails.map(course => ({ label: course.CourseName, value: course.CourseId })) : [],
            },
            validation: {
              messages: {
                required: 'Course Name is required',
              },
            },
          },
          {
            className: 'col-md-4',
            type: 'input',
            key: 'SubjectName',
            props: {
              placeholder: 'Subject Name',
              type: 'text',
              label: "Subject Name",
              pattern: '^[A-Za-z ]+$', // Only letters and spaces are allowed
              required: true,
            },
            validation: {
              messages: {
                required: 'Subject Name is required',
              },
            },
            hooks: {
              onInit: (field) => {
                const formControl = field.formControl;
                formControl.valueChanges.subscribe(value => {
                  if (value) {
                    // Remove any non-letter characters except spaces
                    let sanitizedValue = value.replace(/[^A-Za-z\s]/g, '');
                    // Capitalize the first letter of each word
                    sanitizedValue = sanitizedValue.replace(/\b\w/g, char => char.toUpperCase());
                    formControl.setValue(sanitizedValue, { emitEvent: false });
                  }
                });
              }
            }
          },
          {
            className: 'col-md-3',
            type: 'select',
            key: 'IsActive',
            templateOptions: {
              label: 'Subject Status',
              //placeholder: 'Select Suject Status',
              options: [
                { value: true, label: 'Active' }, 
                { value: false, label: 'Inactive' }
              ],
            },
            defaultValue: true,
            validation: {
              messages: {
                required: 'Please select a subject status',
              },
            },
          },
          {
            className: 'col-md-3',
            type: 'textarea',
            key: 'SubjectDescription',
            props: {
              placeholder: 'Enter Subject Description',
              label: 'Subject Description',
              required: true,
              attributes: {
                style: 'overflow:hidden; resize:none;',
                oninput: "this.style.height = 'auto'; this.style.height = this.scrollHeight + 'px';"
              }
            },
            hooks: {
              onInit: (field) => {
                const formControl = field.formControl;
          
                setTimeout(() => {
                  const textarea = document.querySelector(`[name="${field.key}"]`) as HTMLTextAreaElement;
                  if (textarea) {
                    textarea.style.height = 'auto'; // Reset height
                    textarea.style.height = textarea.scrollHeight + 'px'; // Adjust height based on content
                  }
                }, 0);
              }
            },
            validation: {
              messages: {
                required: 'Subject Description is required',
              },
            },
          }        
        ],
      },
    ];
  }

  onCancleClick() {
    this.router.navigateByUrl('tds/masters/subjects');
  }

  onResetClick() {
    this.form.reset();
  }

  navigate()
  {
    this.router.navigateByUrl('tds/masters/subjects');
  }

  onSubmit() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.insertSubject();
    } else {
      this.alertService.ShowErrorMessage('Please fill in all required fields.');
    }
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
    this.subjectModel.AddedBy = 1;
    this.subjectModel.AddedDate = new Date();
    this.subjectModel.UpdatedBy = 1;
    this.subjectModel.UpdatedDate = new Date();

    this.addSubjectsService.insertSubjectDetails(this.subjectModel).subscribe(
      (result: any) => {
        const serviceResponse = result.Value;
        if (serviceResponse === ResponseCode.Success) {
          this.alertService.ShowSuccessMessage(this.messageService.savedSuccessfully);
          this.router.navigateByUrl('tds/masters/subjects');
        } else if (serviceResponse === ResponseCode.Update) {
          this.alertService.ShowSuccessMessage(this.messageService.updateSuccessfully);
          this.router.navigateByUrl('tds/masters/subjects');
        } else {
          this.alertService.ShowErrorMessage(this.messageService.serviceError);
        }
      },
      (error: any) => {
        this.alertService.ShowErrorMessage(error);
      }
    );
    
  }

  getSubjectDetails(SubjectId: number) {
    this.addSubjectsService.getSubjectDetails(SubjectId).subscribe(
      (result: any) => {
        if (result && result.Value) {
          this.subjectModel = result.Value.Item1;
          this.setParameter();
        } else {
          console.error('No data found for SubjectId: ' + SubjectId);
        }
      },
      (error: any) => {
        console.error('Error retrieving subject details:', error);
      }
    );
  }
}
