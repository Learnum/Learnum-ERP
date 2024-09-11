import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { AlertService } from 'src/app/core/services/alertService';
import { MessageService } from 'src/app/core/services/message.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-addsyllabus',
  templateUrl: './addsyllabus.component.html',
  styleUrls: ['./addsyllabus.component.scss']
})
export class AddsyllabusComponent implements OnInit {
  //subjectDetails: subjectDetails = new subjectDetails(); 
  fields: FormlyFieldConfig[];
  options: FormlyFormOptions = {};
  editData: any;
  tdsReturnList: any;
  form: FormGroup;
  branchDetails: any;
  topicDetails: any[] = [];
  topicDetailsForm: FormGroup;
  subjectDetails: any;
  courseDetails: any;
  
    constructor(
      private router: Router,
      
      //private addBranchService: AddBranchService,
      //private addipaddressService: AddIpaddressService,
      private alertService: AlertService,
      private messageService: MessageService,
      private activateRoute: ActivatedRoute,
      private fb: FormBuilder,
      private modalService: NgbModal
    
    ) { }
  
    ngOnInit(): void {
      this.setParameter();
       this.createForm();
       this.createTopicDetailsForm();
    }
    
      createForm(): void {
        this.form = this.fb.group({
          CourseName: ['', Validators.required], 
          SubjectName: ['', Validators.required], 
          NameofTopic: ['', Validators.required], 
          TopicStatus: ['', Validators.required], 
           });
          }

          createTopicDetailsForm(): void {
            this.topicDetailsForm = this.fb.group({
              heading: ['', Validators.required],
              content: ['', Validators.required],
              attachments: [null],
              references: ['', Validators.required],
              subTopicstatus: ['', Validators.required],
              
            });
          }
          addTopicDetails(): void {
            if (this.topicDetailsForm.valid) {
              this.topicDetails.push(this.topicDetailsForm.value);
              this.topicDetailsForm.reset();
              this.modalService.dismissAll();
            } else {
              this.topicDetailsForm.markAllAsTouched();
            }
          }
        
    
    
     
      reset() {
        throw new Error('Method not implemented.');
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
                  className: 'col-md-6',
                  type: 'input',
                  key: 'NameofTopic',
                  props: { 
                    placeholder: 'Enter topic',
                    type: 'text',
                    label: "Topic Name",
                    required: true,
                   
                  },
                },
                {
                  className: 'col-md-3',
                  type: 'select',
                  key: 'IsActive',
                  templateOptions: {
                    label: 'TopicStatus',
                    required: true,
                    options: [
                      { value: true, label: 'Active' },
                      { value: false, label: 'Inactive' }
                    ],
                    
                  },
                  defaultValue: true, 
                  validation: {
                    messages: {
                      required: 'Please select a Topic Status',
                    },
                  },
                  }, 
              ],
            },
          ];
        }
        
        onCancleClick() {
          this.router.navigateByUrl('erp/my-syllabus/my-syllabus-erp');
        }
        
        get f()
        {
          return this.form.controls;
        }
        
        onSubmit():void {
          this.form.markAllAsTouched();
          if (this.form.valid) {
           // this.insertBranch();
          }
          else {
            this.alertService.ShowErrorMessage('Please fill in all required fields.');
          }
        }
        // insertIP() {
        //   this.subjectDetails.AddedBy = 1;
        //   this.subjectDetails.AddedDate = new Date();
        //   this.subjectDetails.UpdatedBy = 1;
        //   this.subjectDetails.UpdatedDate = new Date();
        //   this.subjectDetails.IsActive = true;
        
        //   this.addipaddressService.insertIPData(this.branchDetails).subscribe(
        //     (result: any) => {
        //       const serviceResponse = result.Value;
        //       if (serviceResponse === ResponseCode.Success) {
        //         this.alertService.ShowSuccessMessage(this.messageService.savedSuccessfully);
        //       } else if (serviceResponse === ResponseCode.Update) {
        //         this.alertService.ShowSuccessMessage(this.messageService.updateSuccessfully);
        //       } else {
        //         this.alertService.ShowErrorMessage(this.messageService.serviceError);
        //       }
        //     },
        //     (error: any) => {
        //       this.alertService.ShowErrorMessage("Enter all required fields");
        //     }
        //   );
        //   this.router.navigateByUrl('tds/masters/branches');
        // }


         // getBranchDetails(BranchId: number) {
      //   this.addipaddressService.getipDetails().subscribe(
      //     (result: any) => {
      //       if (result && result.Value && result.Value.Item1) {
      //         this.branchDetails = result.Value.Item1;
              
      //         // //DateofPayment && DateOfDeduction
      //         // this.employeeDetails.DateOfPayment = this.addEmployeeService.formatDate(this.employeeDetails.DateOfPayment);
      //         // this.employeeDetails.DateOfDeduction = this.addEmployeeService.formatDate(this.employeeDetails.DateOfDeduction);
      
      //         this.setParameter();
      //       } else {
      //         console.error('No data found for EmployeeDetailId: ' + BranchId);
      
      //       }
      //     },
      //     (error: any) => {
      //       console.error('Error retrieving employee details:', error);
      
      //       if (error && error.status === 404) {
      //         console.error('Employee not found.');
      
      //       } else {
      //         console.error('An unexpected error occurred. Please try again later.');
      
      //       }
      //     }
      //   );
      // }
      
        }
        
  
  




