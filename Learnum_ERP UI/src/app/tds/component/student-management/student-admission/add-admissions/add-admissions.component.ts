import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { AlertService } from 'src/app/core/services/alertService';
import { MessageService } from 'src/app/core/services/message.service';
import { FormGroup, FormBuilder,Validators, AbstractControl } from '@angular/forms';
import { AdmissionService } from './admission.service';

@Component({
  selector: 'app-add-admissions',
  templateUrl: './add-admissions.component.html',
  styleUrls: ['./add-admissions.component.scss']
})
export class AddAdmissionsComponent implements OnInit {

  form = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[];
  branchDetails: any;

  constructor(
    private router: Router,
    private admissionService : AdmissionService,
    private alertService: AlertService,
    private messageService: MessageService,
    private activateRoute: ActivatedRoute,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.setParameter();
    this.getBranchDetails();
  }

  setParameter() {
    this.fields = [
      {
        fieldGroupClassName: 'row card-body p-2',
        fieldGroup: [
          {
            className: 'col-md-4',
            key: 'dateOfAdmission',
            type: 'input',
            props: {
              label: 'Date of Admission',
              placeholder: 'Select Date',
              type: 'date',
              required: true,
            },
            validation: {
              messages: {
                required: 'Date of Admission is required',
              },
            },
          },
          {
            className: 'col-md-4',
            key: 'courseName',
            type: 'input',
            props: {
              label: 'Course Name',
              placeholder: 'Enter Course Name',
              required: true,
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
            key: 'BranchId',
            templateOptions: {
              placeholder: 'Branch Name',
              type: 'text',
              label: "Branch Name",
              required: true,
              options: this.branchDetails ? this.branchDetails.map(branch => ({ label: branch.BranchName, value: branch.BranchId })) : [],
            },   
            validation: {
              messages: {
                required: 'Branch Name is required',
              },
            },
          },
          {
            className: 'col-md-4',
            key: 'batchName',
            type: 'input',
            props: {
              label: 'Batch Name',
              placeholder: 'Enter Batch Name',
              required: true,
            },
            validation: {
              messages: {
                required: 'Batch Name is required',
              },
            },
          },
          {
            className: 'col-md-4',
            key: 'feesType',
            type: 'select',
            props: {
              label: 'Fees Type',
              placeholder: 'Select Fees Type',
              required: true,
              options: [
                { value: 'installments', label: 'Installments' },
                { value: 'oneTime', label: 'One Time' }
              ],
            },
            validation: {
              messages: {
                required: 'Fees Type is required',
              },
            },
          },
          {
            className: 'col-md-4',
            key: 'courseFees',
            type: 'input',
            props: {
              label: 'Course Fees',
              placeholder: 'Enter Course Fees',
              type: 'number',
              required: true,
            },
            validation: {
              messages: {
                required: 'Course Fees is required',
              },
            },
          },
          {
            className: 'col-md-4',
            key: 'studentName',
            type: 'input',
            props: {
              label: 'Student Name',
              placeholder: 'Enter Student Name',
              required: true,
            },
            validation: {
              messages: {
                required: 'Student Name is required',
              },
            },
          },
          {
            className: 'col-md-4',
            key: 'studentNumber',
            type: 'input',
            props: {
              label: 'Student Number',
              placeholder: 'Enter Student Number',
              required: true,
              pattern: '^(\+\d{1,3}[- ]?)?\d{10}$',
            },
            validation: {
              messages: {
                required: 'Student Number is required',
                pattern: 'Enter a valid phone number',
              },
            },
          },
          {
            className: 'col-md-4',
            key: 'status',
            type: 'select',
            props: {
              label: 'Status',
              placeholder: 'Select Status',
              required: true,
              options: [
                { value: 'active', label: 'Active' },
                { value: 'inactive', label: 'Inactive' }
              ],
            },
            validation: {
              messages: {
                required: 'Status is required',
              },
            },
          },
        ],
      },
    ];
  }

  onSubmit(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      // Handle form submission
    } else {
      // Handle form errors
    }
  }

  onCancelClick() {
    this.router.navigateByUrl('tds/student-management/student-admission');
  }
  getBranchDetails() {
    this.admissionService.getBranchList().subscribe(
      (data: any) => {
        this.branchDetails = data.Value;
        this.setParameter();  
      },
      (error: any) => {
        this.alertService.ShowErrorMessage(error);
      }
    );
  }
}
