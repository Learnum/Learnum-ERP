import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { AlertService } from 'src/app/core/services/alertService';
import { MessageService } from 'src/app/core/services/message.service';
import { FormGroup, FormBuilder,Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-add-fees',
  templateUrl: './add-fees.component.html',
  styleUrls: ['./add-fees.component.scss']
})
export class AddFeesComponent implements OnInit {

  form = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[];

  constructor(
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.setFields();
    this.createForm();
  }

  createForm(): void {
    this.form = this.formBuilder.group({
      dateOfPayment: ['', Validators.required],
      modeOfPayment: ['', Validators.required],
      referenceNumber: ['', Validators.required],
      studentName: ['', Validators.required],
      studentID: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      courseName: ['', Validators.required],
      branchName: ['', Validators.required],
      batchName: ['', Validators.required],
      amountPaid: [0, Validators.required],
      remarks: [''],
      status: ['active', Validators.required]
    });
  }

  setFields() {
    this.fields = [
      {
        fieldGroupClassName: 'row card-body p-2',
        fieldGroup: [
          {
            className: 'col-md-4',
            key: 'dateOfPayment',
            type: 'input',
            templateOptions: {
              label: 'Date of Payment',
              placeholder: 'Enter Date of Payment',
              type: 'date',
              required: true,
            }
          },
          {
            className: 'col-md-4',
            key: 'modeOfPayment',
            type: 'select',
            templateOptions: {
              label: 'Mode of Payment',
              placeholder: 'Select Mode of Payment',
              required: true,
              options: [
                { value: 'cash', label: 'Cash' },
                { value: 'cheque', label: 'Cheque' },
                { value: 'neft', label: 'NEFT' },
                { value: 'netBanking', label: 'Net Banking' },
                { value: 'rtgs', label: 'RTGS' },
                { value: 'upi', label: 'UPI' }
              ],
            }
          },
          {
            className: 'col-md-4',
            key: 'referenceNumber',
            type: 'input',
            templateOptions: {
              label: 'Reference Number',
              placeholder: 'Enter Reference Number',
              required: true,
            }
          },
          {
            className: 'col-md-4',
            key: 'studentName',
            type: 'input',
            templateOptions: {
              label: 'Student Name',
              placeholder: 'Enter Student Name',
              required: true,
            }
          },
          {
            className: 'col-md-4',
            key: 'studentID',
            type: 'input',
            templateOptions: {
              label: 'Student ID',
              placeholder: 'Enter Student ID',
              required: true,
            }
          },
          {
            className: 'col-md-4',
            key: 'phoneNumber',
            type: 'input',
            templateOptions: {
              label: 'Phone Number',
              placeholder: 'Enter Phone Number',
              required: true,
            }
          },
          {
            className: 'col-md-4',
            key: 'courseName',
            type: 'select',
            templateOptions: {
              label: 'Course Name',
              placeholder: 'Select Course Name',
              required: true,
              options: [
                { value: 'course1', label: 'Course 1' },
                { value: 'course2', label: 'Course 2' },
                // Add more course options as needed
              ],
            }
          },
          {
            className: 'col-md-4',
            key: 'branchName',
            type: 'select',
            templateOptions: {
              label: 'Branch Name',
              placeholder: 'Select Branch Name',
              required: true,
              options: [
                { value: 'branch1', label: 'Branch 1' },
                { value: 'branch2', label: 'Branch 2' },
                // Add more branch options as needed
              ],
            }
          },
          {
            className: 'col-md-4',
            key: 'batchName',
            type: 'select',
            templateOptions: {
              label: 'Batch Name',
              placeholder: 'Select Batch Name',
              required: true,
              options: [
                { value: 'batch1', label: 'Batch 1' },
                { value: 'batch2', label: 'Batch 2' },
                // Add more batch options as needed
              ],
            }
          },
          {
            className: 'col-md-4',
            key: 'amountPaid',
            type: 'input',
            templateOptions: {
              label: 'Amount Paid',
              placeholder: 'Enter Amount Paid',
              type: 'number',
              required: true,
            }
          },
          {
            className: 'col-md-4',
            key: 'remarks',
            type: 'input',
            templateOptions: {
              label: 'Remarks',
              placeholder: 'Enter Remarks',
            }
          },
          {
            className: 'col-md-4',
            key: 'status',
            type: 'select',
            templateOptions: {
              label: 'Status',
              placeholder: 'Select Status',
              required: true,
              options: [
                { value: 'active', label: 'Active' },
                { value: 'inactive', label: 'Inactive' }
              ],
            }
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
    this.router.navigateByUrl('tds/student-management/offline-fees-payment');
  }


}
