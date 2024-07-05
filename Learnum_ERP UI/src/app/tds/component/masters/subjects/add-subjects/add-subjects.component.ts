import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { ResponseCode } from 'src/app/core/models/responseObject.model';
import { AlertService } from 'src/app/core/services/alertService';
import { MessageService } from 'src/app/core/services/message.service';
import { subjectDetails } from './add-subject.model';

@Component({
  selector: 'app-add-subjects',
  templateUrl: './add-subjects.component.html',
  styleUrls: ['./add-subjects.component.scss']
})
export class AddSubjectsComponent implements OnInit {

  //ipDetails: IPDetails = new IPDetails();
  subjectDetails: subjectDetails = new subjectDetails();
  fields: FormlyFieldConfig[];
  options: FormlyFormOptions = {};
  editData: any;
  tdsReturnList: any;
  form: any;
  branchDetails: any;

  constructor(
    private router: Router,

    //private addBranchService: AddBranchService,
    //private addipaddressService: AddIpaddressService,
    private alertService: AlertService,
    private messageService: MessageService,
    private activateRoute: ActivatedRoute,
    private fb: FormBuilder

  ) { }

  ngOnInit(): void {
    this.setParameter();
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
            className: 'col-md-4',
            type: 'input',
            key: 'CourseName',
            templateOptions: {
              placeholder: 'Select',
              type: 'text',
              label: "Course Name",
              required: true,

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
              required: true,

            },
            validation: {
              messages: {
                required: 'Subject Name is required',

              },
            },
          },
          {
            className: 'col-md-4',
            type: 'select',
            key: 'SubjectStatus',
            props: {
              placeholder: 'Select Subject',
              required: true,
              type: 'text',
              label: 'Subject Status',
              options: [
                { value: 'Active', label: 'Active' },
                { value: 'Inactive', label: 'Inactive' }
              ]
            },
          },
          {
            className: 'col-md-',
            type: 'textarea',
            key: 'SubjectDescription',
            templateOptions: {
              placeholder: 'Enter Subject Description',
              label: 'Subject Description',
              required: true,
              rows: 10,
             
            },
            validation: {
              messages: {
                required: 'Subject Description is required',
              },
            },
          },
          
        ],
      },
    ];
  }

  onCancleClick() {
    this.router.navigateByUrl('tds/masters/subjects');
  }

  get f() {
    return this.form.controls;
  }

  onSubmit(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      // this.insertBranch();
      //this.getBranchDetails();
    }
    else {
      this.alertService.ShowErrorMessage('Please fill in all required fields.');
    }
  }


}




