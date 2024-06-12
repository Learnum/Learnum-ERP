import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { AlertService } from 'src/app/core/services/alertService';
import { MessageService } from 'src/app/core/services/message.service';

@Component({
  selector: 'app-add-worksheet',
  templateUrl: './add-worksheet.component.html',
  styleUrls: ['./add-worksheet.component.scss']
})
export class AddWorksheetComponent implements OnInit {
  form = new FormGroup({});
  //employeeDetails: EmployeeDetails = new EmployeeDetails();
  reasonList: any[] = [];
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
      Name: ['', Validators.required],
      Email: ['', Validators.required],
      DateofBirth: ['', Validators.required],
      Role: ['', Validators.required],
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
        fieldGroupClassName: 'row card-body p-',
        // key: 'ITDPreEmploymentSalModel',
        fieldGroup: [

          {
            className: 'col-md-6',
            type: 'input',
            key: 'Name',
            templateOptions: {
              placeholder: 'Enter  Name',
              type: 'text',
              label: "Name",
              required: true,
            },
          },
          {
            className: 'col-md-6',
            type: 'input',
            key: 'Email',
            props: {
              placeholder: 'Email',
              type: 'text',
              label: "Email",
              required: true,
            },
            validation: {
              messages: {
                required: 'Email is required',
                pattern: 'Please enter a valid Email ',
              },
            },
          },
          {
            className: 'col-md-6',
            type: 'input',
            key: 'DateofBirth',
            templateOptions: {
              label: 'Date of Birth',
              placeholder: 'Date',
              type: 'date',
              required: true,
              attributes: {
                max: formatDate(this.NowDate, 'YYYY-MM-dd', 'en-IN'),
              },
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
            key: 'Role',
            props: {
              placeholder: 'select',
              type: 'text',
              label: "Role",
              required: true,
            },
            validation: {
              messages: {
                required: 'Role is required',
              },
            },
          },
          {
            className: 'col-md-12',
            type: 'textarea',
            key: 'TodayWork',
            props: {
              placeholder: 'Type here',
              type: 'text',
              label: "Today's work",
              required: true,
              rows:5,
            },
            validation: {
              messages: {
                required: 'Todays work is required',
              },
            },
          },
        ],
      },
    ]
  }

  onCancleClick() {
    this.router.navigateByUrl('tds/hrd/counsellor');
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



