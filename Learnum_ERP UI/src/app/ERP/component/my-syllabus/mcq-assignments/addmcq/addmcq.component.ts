import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { AlertService } from 'src/app/core/services/alertService';
import { MessageService } from 'src/app/core/services/message.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { McqService } from 'src/app/mcq.service';
import { McqDetails } from './mcqmodelDetails';

@Component({
  selector: 'app-addmcq',
  templateUrl: './addmcq.component.html',
  styleUrls: ['./addmcq.component.scss']
})
export class AddmcqComponent implements OnInit {
 
  
  McqDetails: McqDetails = new McqDetails();
 fields: FormlyFieldConfig[];
  options: FormlyFormOptions = {};
  editData: any;
  form: any;
  mcqDetails: any[] = [];
  mcqForm: FormGroup;
  model: any = {};

 
  constructor(
      private router: Router,
      private mcqService:McqService,
      private alertService: AlertService,
      private messageService: MessageService,
      private activateRoute: ActivatedRoute,
      private modalService: NgbModal,
      private formBuilder: FormBuilder ) { }
  
    ngOnInit(): void {
      this.setParameter();
       this.createForm();
       this.createMcqForm();
    }
    
      createForm(): void {
        this.form = this.formBuilder.group({
          CourseName: ['', Validators.required], 
          SubjectName: ['', Validators.required], 
          TopicName: ['', Validators.required], 
          McqAssignmentStatus: ['', Validators.required], 
           });
     }
     createMcqForm(): void {
      this.mcqForm = this.formBuilder.group({
        question: ['', Validators.required],
        optionA: ['', Validators.required],
        optionB: ['', Validators.required],
        optionC: ['', Validators.required],
        optionD: ['', Validators.required],
        answer: ['', Validators.required],
        marks: ['', Validators.required],
        mcqStatus: ['', Validators.required]
      });
    }
    
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
                  className: 'col-md-6',
                  type: 'select',
                  key: 'CourseName',
                  templateOptions: {
                    placeholder: 'Select',
                    type: 'text',
                    label: "Course Name",
                    required: true,
                    
                  },
                 
                  },
                {
                  className: 'col-md-6',
                  type: 'select',
                  key: 'SubjectName',
                  props: { 
                    placeholder: 'Enter Subject Name',
                    type: 'text',
                    label: "Subject Name",
                    required: true,
                   
                  },
                 
                },
                {
                  className: 'col-md-6',
                  type: 'select',
                  key: 'TopicName',
                  props: { 
                    placeholder: 'select',
                    type: 'text',
                    label: "Topic Name",
                    required: true,
                   
                  },
                 
                },
               
                {
                  className: 'col-md-6',
                  type: 'select',
                  key: 'McqAssignmentStatus',
                  props: { 
                    placeholder: 'select',
                    type: 'text',
                    label: "MCQ Assignments Status",
                    required: true,
                   
                  },
                 
                },
              ],
            },
          ];
        }
        
        onCancleClick() {
          this.router.navigateByUrl('erp/my-syllabus/mcq-assignments');
        }
        
        get f()
        {
          return this.form.controls;
        }
        
        onSubmit():void {
          this.form.markAllAsTouched();
          if (this.form.valid) {
           // this.insertBranch();
           //this.getBranchDetails();
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
        //   this.router.navigateByUrl('erp/masters/branches');
        // }
        addMcq(): void {
          if (this.mcqForm.valid) {
            this.mcqDetails.push(this.mcqForm.value);
            this.mcqForm.reset();
            this.modalService.dismissAll();
          } else {
            this.mcqForm.markAllAsTouched();
          }
        }
      }
