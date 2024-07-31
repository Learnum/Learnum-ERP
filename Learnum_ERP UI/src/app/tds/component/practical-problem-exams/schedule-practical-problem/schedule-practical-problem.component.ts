import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { AlertService } from 'src/app/core/services/alertService';
import { MessageService } from 'src/app/core/services/message.service';
import { FormGroup, FormBuilder,Validators, AbstractControl } from '@angular/forms';
import { SchedulePracticalProblemService } from './schedule-practical-problem.service';
import { schedulepracticalmodel } from './schedulepracticalmodel';
import { ResponseCode } from 'src/app/core/models/responseObject.model';

@Component({
  selector: 'app-schedule-practical-problem',
  templateUrl: './schedule-practical-problem.component.html',
  styleUrls: ['./schedule-practical-problem.component.scss']
})
export class SchedulePracticalProblemComponent implements OnInit {

  form = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[];
  courseDetails: any;
  branchDetails: any;
  batchDetails: any;
  subjectDetails: any;
  editData: any;
  SchedulePracticalProblemDetails: schedulepracticalmodel = new schedulepracticalmodel();



  constructor(
    private schedulePracticalProblemService: SchedulePracticalProblemService,
    private router: Router,
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    private activateRoute: ActivatedRoute,
    private messageService: MessageService,

  ) {}

  ngOnInit(): void {
    
    this.setParameter();
    this.getSubjectDetails();
    this.getCourseDetails();
    this.getBatchDetails();
    this.getBranchDetails();

   this.editData = this.activateRoute.snapshot.queryParams;
    if (this.editData.source === 'edit' && this.editData.SchedulePracticalExamId) {
      this.getSchedulePracticalProblemDetails(this.editData.SchedulePracticalExamId);
    }
  }

 

  setParameter(): void {
    this.fields = [
      {
        fieldGroupClassName: 'row card-body p-2',
        fieldGroup: [

          {

             key:'schedulePracticalExamId',
          },
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
             
            },
            },
            {
              className: 'col-md-6',
              type: 'select',
              key: 'BranchId',
              templateOptions: {
                placeholder: 'Branch Name',
                type: 'text',
                label: "Branch Name",
                required: true,
                options: this.branchDetails ? this.branchDetails.map(branch => ({ label: branch.BranchName, value: branch.BranchId })) : [],
              },
  
            },
            {
              className: 'col-md-6',
              type: 'select',
              key: 'BatchId',
              templateOptions: {
                placeholder: 'Enter batch Name',
                required: true,
                type: ' Batch Name',
                label: "Batch Name",
                options: this.batchDetails ? this.batchDetails.map(batch => ({ label: batch.BatchName
                  , value: batch.BatchId
                })) : [],
              
                },
              validation: {
                messages: {
                  required: 'This field is required',
                },
              },
            },
            {
              className: 'col-md-6',
              type: 'select',
              key: 'SubjectId',
              templateOptions: {
                placeholder: 'Subject Name',
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
            key: 'TopicName',
            type: 'select',
            templateOptions: {
              label: 'Topic Name',
              placeholder: 'Select Topic Name',
              required: true,
              options: [
                { value: 'topic1', label: 'Topic 1' },
                { value: 'topic2', label: 'Topic 2' },
                { value: 'topic3', label: 'Topic 3' }
              ]
            },
            validation: {
              messages: {
                required: 'Topic Name is required',
              },
            },
          },
          {
            className: 'col-md-6',
            key: 'PaperSetNo',
            type: 'select',
            templateOptions: {
              label: 'Paper Set No',
              placeholder: 'Select Paper Set No',
              required: true,
              options: [
                { value: 1, label: 'Set 1' },
                { value: 2, label: 'Set 2' },
                { value: 3, label: 'Set 3' }
              ]
            },
            validation: {
              messages: {
                required: 'Paper Set No is required',
              },
            },
          },
          {
            className: 'col-md-6',
            key: 'dateofExam',
            type: 'input',
            templateOptions: {
              type: 'date',
              label: 'Date of Exam',
              placeholder: 'Enter Date of Exam',
              required: true,
            },
            validation: {
              messages: {
                required: 'Date of Exam is required',
              },
            },
          },
          {
            className: 'col-md-6',
            key: 'startTime',
            type: 'input',
            templateOptions: {
              type: 'time',
              label: 'Start Time',
              placeholder: 'Enter Start Time',
              required: true,
            },
            validation: {
              messages: {
                required: 'Start Time is required',
              },
            },
          },
          {
            className: 'col-md-6',
            key: 'endTime',
            type: 'input',
            templateOptions: {
              type: 'time',
              label: 'End Time',
              placeholder: 'Enter End Time',
              required: true,
            },
            validation: {
              messages: {
                required: 'End Time is required',
              },
            },
          },
          {
            className: 'col-md-6',
            key: 'PracticalProblemStatus',
            type: 'select',
            templateOptions: {
              label: 'Status',
              placeholder: 'Select Status',
              required: true,
              options: [
                { value: 1, label: 'Scheduled' },
                { value: 2, label: 'Completed' },
                { value: 3, label: 'Cancelled' }
              ]
            },
            validation: {
              messages: {
                required: 'Status is required',
              },
            },
          }
        ],
      },
    ];
  }

  onSubmit(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.insertScheduleProblem();
    } else {
      this.alertService.ShowErrorMessage('Please fill in all required fields.');
    }
  }
 

  insertScheduleProblem() {
    this.SchedulePracticalProblemDetails.addedBy = 1;
    this.SchedulePracticalProblemDetails.addedDate = new Date();
    this.SchedulePracticalProblemDetails.updatedBy = 1;
    this.SchedulePracticalProblemDetails.updatedDate = new Date();
   // this.branchManagerDetails.branchManagerId = 0;

    this.schedulePracticalProblemService.insertScheduleProblemData(this.SchedulePracticalProblemDetails).subscribe(
      (result: any) => {
        let serviceResponse = result.Value
        if (result.Value === ResponseCode.Success) {
          this.alertService.ShowSuccessMessage(this.messageService.savedSuccessfully);
          this.router.navigateByUrl('tds/practical-problem-exams');

        }
        else if (serviceResponse == ResponseCode.Update) {
          this.alertService.ShowSuccessMessage(this.messageService.updateSuccessfully);
          this.router.navigateByUrl('tds/practical-problem-exams');
        }
        else {
          this.alertService.ShowErrorMessage(this.messageService.serviceError);
        }
      },
      (error: any) => {
        this.alertService.ShowErrorMessage("Enter all required fields");
      }
    )
    
  }


  onCancelClick(): void {
    this.router.navigateByUrl('tds/practical-problem-exams');
  }
  getSubjectDetails() {
    this.schedulePracticalProblemService.getsubjectList().subscribe(
      (data: any) => {
        this.subjectDetails = data.Value;
        this.setParameter();  
      },
      (error: any) => {
        this.alertService.ShowErrorMessage(error);
      }
    );


  }
  getBatchDetails() {
    this.schedulePracticalProblemService.getBatchList().subscribe(
      (data: any) => {
        this.batchDetails = data.Value;
        this.setParameter();  
      },
      (error: any) => {
        this.alertService.ShowErrorMessage(error);
      }
    );
  }
    getCourseDetails() {
      this.schedulePracticalProblemService.getcourseList().subscribe(
        (data: any) => {
          this.courseDetails = data.Value;
          this.setParameter();  
        },
        (error: any) => {
          this.alertService.ShowErrorMessage(error);
        }
      );
    }

    getBranchDetails() {
      this.schedulePracticalProblemService.getBranchList().subscribe(
        (data: any) => {
          this.branchDetails = data.Value;
          this.setParameter();  
        },
        (error: any) => {
          this.alertService.ShowErrorMessage(error);
        }
      );
    }

    getSchedulePracticalProblemDetails(SchedulePracticalExamId: number) {
      this.schedulePracticalProblemService.getScheduleProblemDetails(SchedulePracticalExamId).subscribe(
        (result: any) => {
          if (result && result.Value) {
            this.SchedulePracticalProblemDetails = result.Value.Item1;
  
            this.setParameter();
            console.error('No data found for SchedulePracticalExamId: ' + SchedulePracticalExamId);
          }
        },
        (error: any) => {
          console.error('Error retrieving Schedule Practical details:', error);
  
        }
      );
    }
  
  }


