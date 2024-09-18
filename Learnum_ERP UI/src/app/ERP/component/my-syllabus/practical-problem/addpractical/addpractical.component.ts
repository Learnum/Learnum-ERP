import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { AlertService } from 'src/app/core/services/alertService';
import { MessageService } from 'src/app/core/services/message.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as bootstrap from 'bootstrap';
import { PracticalService } from './practical.service';
import { ResponseCode } from 'src/app/core/models/responseObject.model';
import { PracticalListModel,QuestionDetailsModel } from './PracticalDetailsModel';


@Component({
  selector: 'app-addpractical',
  templateUrl: './addpractical.component.html',
  styleUrls: ['./addpractical.component.scss']
})
export class AddpracticalComponent implements OnInit {

  PracticalDetails: QuestionDetailsModel = new QuestionDetailsModel();
  practicalListModel: PracticalListModel = new PracticalListModel();

  fields: FormlyFieldConfig[];
  options: FormlyFormOptions = {};
  editData: any;
  tdsReturnList: any;
  form: any;
  branchDetails: any;
  subjectDetails: any;
  formBuilder: any;
  practicalProblemForm: FormGroup;
  practicalProblemDetails: any[] = [];
  courseDetails: any;
  topicDetails: any;

  constructor(
    private router: Router,
    private alertService: AlertService,
    private messageService: MessageService,
    private activateRoute: ActivatedRoute,
    private practicalService: PracticalService,
     private fb: FormBuilder,
    private modalService: NgbModal

  ) { }

  ngOnInit(): void {
    this.setParameter();
    this.createPracticalProblemForm();
    this.getCourseDetails();
    this.getSubjectDetails();
    this.getTopicDetails();
    this.editData = this.activateRoute.snapshot.queryParams;
    // if (this.editData.source === 'edit' && this.editData.syllabusId) {
    //   this.getAddSyllabusDetailsById(this.editData.syllabusId);
    // }
  }

 
  createPracticalProblemForm(): void {
    this.practicalProblemForm = this.fb.group({
      question: ['', Validators.required],
      modelAnswer: ['', Validators.required],
      attachment: [null],
      marks: ['', Validators.required],
      practicalProblemStatus: ['', Validators.required]
    });
  }

setParameter() {
    this.fields = [
      {
        fieldGroupClassName: 'row card-body p-2',
       
        fieldGroup: [

          {
            className: 'col-md-3',
            type: 'select',
            key: 'CourseId',
            templateOptions: {
              label: "Course Name",
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
                message: 'Course Name is required',
              },
            },
            validation: {
              messages: {
                required: 'Course Name is required',
              },
            },
          },
          
          
          {
            className: 'col-md-3',
            type: 'select',
            key: 'SubjectId',
            templateOptions: {
              label: "Subject Name",
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
                message: 'Subject Name is required',
              },
            },
            validation: {
              messages: {
                required: 'Subject Name is required',
              },
            },
          },
          {
            className: 'col-md-3',
            key: 'TopicId',
            type: 'select',
            templateOptions: {
              label: 'Topic Name',
              required: true,
              options: [
                { value: null, label: 'Select Topic', disabled: true },  
                ...this.topicDetails ? this.topicDetails.map(topic => ({
                  label: topic.TopicName,
                  value: topic.TopicId
                })) : [],
              ]
            },
            defaultValue: null, 
            validators: {
              required: {
                expression: (c: AbstractControl) => c.value !== null && c.value !== '', 
                message: 'Topic Name is required',
              },
            },
            validation: {
              messages: {
                required: 'Topic Name is required',
              },
            },
          }
          ,
          {
            className: 'col-md-3',
            type: 'select',
            key: 'IsActive',
            props: {
              label: 'Practical Problem Status',
              required: true,
              options: [
                { value: true, label: 'Active' },
                { value: false, label: 'Inactive' }
              ],
              
            },
            defaultValue: true, 
            validation: {
              messages: {
                required: 'Please select a  status',
              },
            },
          }

        ],
      },
    ];
  }

  onCancleClick() {
    this.router.navigateByUrl('erp/my-syllabus/practical-problem');
  }

  onnavigate() {
    this.router.navigateByUrl('erp/my-syllabus/practical-problem');
  }


  get f() {
    return this.form.controls;
  }
  
  
  reset() {
    throw new Error('Method not implemented.');
  }

  onSubmit(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
       this.insertPracticalDetails();
    }
    else {
      this.alertService.ShowErrorMessage('Please fill in all required fields.');
    }
  }
  
  insertPracticalDetails() {
    this.PracticalDetails.AddedBy = 1;
    this.PracticalDetails.AddedDate = new Date();
    this.PracticalDetails.UpdatedBy = 1;
    this.PracticalDetails.UpdatedDate = new Date();

    const practicalListModel: PracticalListModel = {
      questionDetailsModel: this.form.value,
      practicalProblemsMasterModel: this.practicalProblemDetails,
      
    };

    this.practicalService.insertPracticalproblemData(practicalListModel).subscribe(
      (result: any) => {
        const serviceResponse = result.Value;
        if (serviceResponse === ResponseCode.Success) {
          this.alertService.ShowSuccessMessage(this.messageService.savedSuccessfully);
          this.router.navigateByUrl('erp/my-syllabus/practical-problem/addpractical');
        } else if (serviceResponse === ResponseCode.Update) {
          this.alertService.ShowSuccessMessage(this.messageService.updateSuccessfully);
          this.router.navigateByUrl('erp/my-syllabus/practical-problem/addpractical');
        } else {
          this.alertService.ShowErrorMessage(this.messageService.serviceError);
        }
      },
      (error: any) => {
        this.alertService.ShowErrorMessage(error);
      }
    );
  }

  addPracticalProblem(): void {
    if (this.practicalProblemForm.valid) {
      this.practicalProblemDetails.push(this.practicalProblemForm.value);
      this.practicalProblemForm.reset();
      this.modalService.dismissAll();
    } else {
      this.practicalProblemForm.markAllAsTouched();
    }
  }

  onCloseModal(): void {
          
    const practicalProblemForm = document.getElementById('practicalProblemForm');
    if (practicalProblemForm) {
      const modalInstance = bootstrap.Modal.getInstance(practicalProblemForm);
      modalInstance?.hide(); 
    }
  }

  getCourseDetails() {
    this.practicalService.getcourseList().subscribe(
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
    this.practicalService.getsubjectList().subscribe(
      (data: any) => {
        this.subjectDetails = data.Value;
        this.setParameter();  
      },
      (error: any) => {
        this.alertService.ShowErrorMessage(error);
      }
    );
  }

  
  getTopicDetails() {
    this.practicalService.getTopicList().subscribe(
      (data: any) => {
        this.topicDetails = data.Value;
        this.setParameter();  
      },
      (error: any) => {
        this.alertService.ShowErrorMessage(error);
      }
    );
  }
}

