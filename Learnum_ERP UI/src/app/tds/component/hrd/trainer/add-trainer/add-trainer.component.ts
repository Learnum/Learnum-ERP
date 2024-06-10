import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/core/services/alertService';
import { MessageService } from 'src/app/core/services/message.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-add-trainer',
  templateUrl: './add-trainer.component.html',
  styleUrls: ['./add-trainer.component.scss']
})
export class AddTrainerComponent implements OnInit {

  form = new FormGroup({});
 
  fields: FormlyFieldConfig[];
  options: FormlyFormOptions = {};
  editData: any;
  tdsReturnList: any;
  GetEmployeeList: any;
  coOwners: any;
  NowDate: any = new Date();
employeeDetails: any;
 
  constructor(
    //private addEmployeeService: AddEmployeeService,
    private router: Router,
    private alertService: AlertService,
    private messageService: MessageService,
    private activateRoute: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.setParameter();
  //  this.getReason();
    this.createForm();
    this.editData = this.activateRoute.snapshot.queryParams;
    if (this.editData.source === 'edit' && this.editData.EmployeeDetailId) {
   //   this.getEmployeeDetails(this.editData.EmployeeDetailId);
    }
    
  }
  createForm(): void {
    this.form = this.fb.group({
      CourseName: ['', Validators.required], 
      SubjectName: ['', Validators.required], 
      BranchName: ['', Validators.required], 
      BatchName: ['', Validators.required], 
      TrainerName: ['', Validators.required], 
      TrainerBatchStatus: ['', Validators.required], 
      
    });
  }


  // getReason() {
  //   this.addEmployeeService.getReason().subscribe(
  //     (result: any) => {
  //       this.reasonList = result.Value;
  //       this.setParameter();
  //     },
  //     (error) => {
  //       // Handle error
  //     }
  //   );
  // }

  // getEmployeeDetails(EmployeeDetailId: number) {
  //   this.addEmployeeService.getEmployeeDetails(EmployeeDetailId).subscribe(
  //     (result: any) => {
  //       if (result && result.Value && result.Value.Item1) {
  //         this.employeeDetails = result.Value.Item1;
          
  //         //DateofPayment && DateOfDeduction
  //         this.employeeDetails.DateOfPayment = this.addEmployeeService.formatDate(this.employeeDetails.DateOfPayment);
  //         this.employeeDetails.DateOfDeduction = this.addEmployeeService.formatDate(this.employeeDetails.DateOfDeduction);

  //         this.setParameter();
  //       } else {
  //         console.error('No data found for EmployeeDetailId: ' + EmployeeDetailId);

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


setParameter() {
    this.fields = [
      {
        fieldGroupClassName: 'row card-body p-2',
        // key: 'ITDPreEmploymentSalModel',
        fieldGroup: [

           {
            className: 'col-md-3',
            type: 'input',
            key: 'Course Name',
            props: { 
              placeholder: 'Enter Course Name',
              type: 'text',
              label: "Name",
              required: true,
              pattern: '^[A-Za-z]+$',
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
            type: 'input',
            key: 'Subject Name',
            props: {
              placeholder: 'Enter Subject Name',
              required: true,
              type: 'text',
              label: "Subject Name",
            },
            validation: {
              messages: {
                required: 'This field is required',
                ip: 'Please enter a valid Subject Name',
              },
            },
          },


          {
            className: 'col-md-3',
            type: 'input',
            key: 'Branch Name',
            props: {
              placeholder: 'Select Branch Name',
              required: true,
              valueProp: 'value',
              labelProp: 'label',
              label: "Branch Name",
              type:'text',
            },
            validation: {
              messages: {
                required: 'Please select a Branch Name',
              },
            },
          }, 
         {
            className: 'col-md-3',
            type: 'input',
            key: 'Branch Name',
            props: {
              placeholder: 'Enter Branch Name',
              required: true,
              type: 'number',
              label: "Branch Name",
              },
            validation: {
              messages: {
                required: 'This field is required',
              },
            },
          },
          {
            className: 'col-md-3',
            type: 'input',
            key: 'Trainer Name',
            props: {
              placeholder: 'Trainer Name',
              required: true,
              type: 'text',
              label: "Trainer Name",
             },
            
            validation: {
              messages: {
                required: 'This field is required',
                tds: 'Please enter a Trainer Name',
              },
            },
          },
          
          {
            className: 'col-md-3',
            type: 'select',
            key: 'TrainerBatchStatus',
            props: {
              placeholder: 'status',
              required: true,
              type: 'text',
              label: "Trainer Batch Status",
              //readonly: this.IsPreviousEmp || (this.isPOIStatusRejected && !this.isEmployee),
              // label:  this.previousEmployement.previousEmployement[8].
              // investmentColumnTypeName
            },
            validation: {
              messages: {
                required: 'This field is required', 
              },
            },
          },
         
        ],
      },
    ]
  }

  onCancleClick() {
    this.router.navigateByUrl('tds/hrd/trainer');
  }

  get f()
  {
    return this.form.controls;
  }

  onSubmit():void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
    //  this.insertAddEmployee();
      this.GetEmployeeList();
    }
    else {
      this.alertService.ShowErrorMessage('Please fill in all required fields.');
    }
  }

  // insertAddEmployee() {
  //   this.employeeDetails.AddedBy = 1;
  //   this.employeeDetails.AddedDate = new Date();
  //   this.employeeDetails.UpdatedBy = 1;
  //   this.employeeDetails.UpdatedDate = new Date();
  //   this.employeeDetails.IsActive = true;

  //   this.addEmployeeService.insertEmployeeData(this.employeeDetails).subscribe(
  //     (result: any) => {
  //       let serviceResponse = result.Value
  //       if (result.Value === ResponseCode.Success) {
  //         this.alertService.ShowSuccessMessage(this.messageService.savedSuccessfully);

  //       }
  //       else if (serviceResponse == ResponseCode.Update) {
  //         this.alertService.ShowSuccessMessage(this.messageService.updateSuccessfully);
  //       }
  //       else {
  //         this.alertService.ShowErrorMessage(this.messageService.serviceError);
  //       }
  //     },
  //     (error: any) => {
  //       this.alertService.ShowErrorMessage("Enter all required fields");
  //     }
  //   )
  //   this.router.navigateByUrl('tds/tds-return/employee');
  // }



}
