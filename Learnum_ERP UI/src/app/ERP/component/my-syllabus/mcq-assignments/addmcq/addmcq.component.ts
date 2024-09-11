import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { AlertService } from 'src/app/core/services/alertService';
import { MessageService } from 'src/app/core/services/message.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { McqService } from './mcq.service';
import { MCQDetailsList, McqDetailsModel, McqQuestionDetails } from './mcqmodelDetails';
import { ResponseCode } from 'src/app/core/models/responseObject.model';
import * as bootstrap from 'bootstrap';
import { ModalService } from 'src/app/core/services/modal.service';

@Component({
  selector: 'app-addmcq',
  templateUrl: './addmcq.component.html',
  styleUrls: ['./addmcq.component.scss']
})
export class AddmcqComponent implements OnInit {
 
  
  MCQDetailsList: McqDetailsModel = new McqDetailsModel();
  fields: FormlyFieldConfig[];
  options: FormlyFormOptions = {};
  editData: any;
  form = new FormGroup({});
  mcqDetails: any[] = [];
  mcqForm: FormGroup;
  model: any = {};
  courseDetails: any;
  subjectDetails: any;
  McqDetailsModel:any[] = [];
  McqQuestionDetails: any[] = [];
  mcqQuestionDetails: any[] = [];
 // MCQDetailsList: any[] = [];
  mcq: { [key: string]: AbstractControl; };
  topicDetails: any;
  
 
  constructor(
      private router: Router,
      private mcqService: McqService,
      private alertService: AlertService,
      private messageService: MessageService,
      private activateRoute: ActivatedRoute,
      public modalService: ModalService,
      private formBuilder: FormBuilder ) { 
        this.createMcqForm();
      }
  
    ngOnInit(): void {
       this.setParameter();
       this.createMcqForm();
       this.getCourseDetails();
       this.getSubjectDetails();
       this.getTopicDetails();
       this.editData = this.activateRoute.snapshot.queryParams;
       if (this.editData.source === 'edit' && this.editData.McqId) {
         this.getAddMCQDetailsById(this.editData.McqId);
       }
    }
    


    createMcqForm(): void {
      this.mcqForm = this.formBuilder.group({
        Question: ['', Validators.required],
        optionA: ['', Validators.required],
        optionB: ['', Validators.required],
        optionC: ['', Validators.required],
        optionD: ['', Validators.required],
        Answer: ['', Validators.required],
        marks: ['',  [ Validators.required,  Validators.min(0), Validators.max(100), ],],
       // IsActive: ['', Validators.required]
      });
      this.mcq = this.mcqForm.controls;
    }

      
      reset() {
        this.form.reset();
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
                      expression: (c: AbstractControl) => c.value !== null && c.value !== '', // Ensures a topic is selected
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
                  templateOptions: {
                    label: 'Assignment Status',
                    //placeholder: 'Select McqAssignment Status',
                    required: true,
                    options: [
                      { value: true, label: 'Active' },
                      { value: false, label: 'Inactive' }
                    ],
                    
                  },
                  defaultValue: true, 
                  validation: {
                    messages: {
                      required: 'Please select a branch status',
                    },
                  },
                  },
                
              ],
            },
          ];
        }
        
        onCancleClick() {
          this.router.navigateByUrl('erp/my-syllabus/mcq-assignments');
        }
        
        onnavigate() {
          this.router.navigateByUrl('erp/my-syllabus/mcq-assignments');
        }
        
       
        onSubmit(): void {
        this.mcqForm.markAllAsTouched();
        if (this.mcqDetails.length > 0) {
        this.insertMCQDetails();
       // console.log(this.mcqDetails);
       // console.log(this.MCQDetailsList);
       // console.log(this.McqDetailsModel);
        } else {
        this.alertService.ShowErrorMessage('Please fill in all required fields.');
        }
      }

  


        addMcq(): void {
          if (this.mcqForm.valid) {
            this.mcqDetails.push(this.mcqForm.value);
            this.mcqForm.reset();
            const mcqModal = document.getElementById('mcqModal');
            if (mcqModal) {
              const modalInstance = bootstrap.Modal.getInstance(mcqModal);
              modalInstance?.hide(); 
            }
          } else {
            this.mcqForm.markAllAsTouched();
            this.alertService.ShowErrorMessage("Please fill all required fields.");
      
          }     
        }
        
      
        closeModal(): void {
          this.modalService.close();
        }
        onCloseModal(): void {
          
          const mcqForm = document.getElementById('mcqForm');
          if (mcqForm) {
            const modalInstance = bootstrap.Modal.getInstance(mcqForm);
            modalInstance?.hide(); 
          }
        }

        insertMCQDetails() {
          this.MCQDetailsList.AddedBy = 1;
          this.MCQDetailsList.AddedDate = new Date();
          this.MCQDetailsList.UpdatedBy = 1;
          this.MCQDetailsList.UpdatedDate = new Date();
      
          const data: MCQDetailsList = {
            mcqDetailsModel: this.form.value,
            mcqQuestionDetails: this.mcqDetails
          };
      
          this.mcqService.insertMcqData(data).subscribe(
            (result: any) => {
              const serviceResponse = result.Value;
              if (serviceResponse === ResponseCode.Success) {
                this.alertService.ShowSuccessMessage(this.messageService.savedSuccessfully);
                this.router.navigateByUrl('erp/my-syllabus/mcq-assignments');
              } else if (serviceResponse === ResponseCode.Update) {
                this.alertService.ShowSuccessMessage(this.messageService.updateSuccessfully);
                this.router.navigateByUrl('erp/my-syllabus/mcq-assignments');
              } else {
                this.alertService.ShowErrorMessage(this.messageService.serviceError);
              }
            },
            (error: any) => {
              this.alertService.ShowErrorMessage(error);
            }
          );
        }

      
        getAddMCQDetailsById(McqId: number) {
          this.mcqService.getAddMCQDetailsById(McqId).subscribe(
            (result: any) => {
              if (result && result.Value) {
                this.MCQDetailsList = result.Value.Item1.mcqDetailsModel;  
                this.mcqDetails = result.Value.Item1.mcqQuestionDetails;    
                this.setParameter();  
                
                console.error('No data found for McqId: ' + McqId);  // This should be inside the else block
              }
            },
            (error: any) => {
              console.error('Error retrieving MCQ details:', error);
            }
          );
        }
        

        getCourseDetails() {
          this.mcqService.getcourseList().subscribe(
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
          this.mcqService.getsubjectList().subscribe(
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
          this.mcqService.getTopicList().subscribe(
            (data: any) => {
              this.topicDetails = data.Value;
              this.setParameter();  // Assuming you need to call this after fetching topics, similar to subjects
            },
            (error: any) => {
              this.alertService.ShowErrorMessage(error);
            }
          );
        }
        
      }
