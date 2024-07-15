import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { AddBranchService } from '../../branches/add-branch/add-branch.service';
import { AlertService } from 'src/app/core/services/alertService';
import { MessageService } from 'src/app/core/services/message.service';

@Component({
  selector: 'app-add-batches',
  templateUrl: './add-batches.component.html',
  styleUrls: ['./add-batches.component.scss']
})
export class AddBatchesComponent implements OnInit {

  form = new FormGroup({});
  fields: FormlyFieldConfig[];
  options: FormlyFormOptions = {};
  editData: any;
  tdsReturnList: any;
  branchDetails: any;
  CoOwnerDetailsModel: any;
  coOwnerFields: any;

  installmentForm = new FormGroup({});
  installmentModel: any = {
    tasks: [null],
  };
  installmentOptions: FormlyFormOptions = {};
  installmentFields: FormlyFieldConfig[];
  model: any;

  constructor(
    private router: Router,
    private addBranchService: AddBranchService,
    private alertService: AlertService,
    private messageService: MessageService,
    private activateRoute: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.setParameter();
  }


  setParameter() {
    this.fields = [
      {
        fieldGroupClassName: 'row card-body p-2',
        fieldGroup: [
          {
            className: 'col-md-4',
            type: 'input',
            key: 'BatchName',
            templateOptions: {
              placeholder: 'Enter Batch',
              type: 'text',
              label: "Batch Name",
              required: true,
            },
          },
          {
            className: 'col-md-4',
            type: 'select',
            key: 'BranchName',
            templateOptions: {
              placeholder: 'Enter Branch',
              type: 'text',
              label: "Branch Name",
              required: true,
            },
          },
          {
            className: 'col-md-4',
            type: 'select',
            key: 'Classroom',
            templateOptions: {
              placeholder: 'Select Classroom',
              type: 'text',
              label: "Classroom",
              required: true,
            },
          },
          {
            className: 'col-md-4',
            type: 'select',
            key: 'CourseName',
            templateOptions: {
              placeholder: 'Select',
              required: true,
              type: 'text',
              label: "Course Name",
            },
          },
          {
            className: 'col-md-4',
            type: 'input',
            key: 'CourseFeesinInstallment',
            templateOptions: {
              placeholder: '###',
              required: true,
              label: "Course Fees in Installment",
            },
          },
          {
            className: 'col-md-4',
            type: 'input',
            key: 'OneTimeCourseFees',
            templateOptions: {
              placeholder: 'Enter One Time Course Fees',
              required: true,
              type: 'text',
              label: "One Time Course Fees",
            },
            validation: {
              messages: {
                required: 'Please enter the course fees',
              },
            },
          },
        ],
      },
     
      {
        key: 'Installments',
        type: 'repeat',
        props: {
          addText: '+ Add New',
          label: 'Installments',
        },
        fieldArray: {
          fieldGroupClassName: 'row',
          fieldGroup: [
            {
              key: 'number',
              className: 'col-4',
              type: 'input',
              templateOptions: {
                placeholder: 'Installment Number',
                type: 'number',
                required: true,
              },
            },
            {
              key: 'installment',
              className: 'col-4',
              type: 'input',
              templateOptions: {
                placeholder: 'Due Date',
                type: 'date',
                required: true,
              },
            },
            {
              key: 'amount',
              className: 'col-4',
              type: 'input',
              templateOptions: {
                placeholder: 'Installment Amount',
                type: 'number',
                required: true,
              },
            }
          ],
        },
      },
      {
      fieldGroupClassName: 'row card-body p-2',
      fieldGroup: [
      {
        className: 'col-md-4',
        type: 'input',
        key: 'StartOn',
        templateOptions: {
          placeholder: 'YYYY-MM-DD',
          required: true,
          label: "Start On",
        },
      },
      {
        className: 'col-md-4',
        type: 'input',
        key: 'EndOn',
        templateOptions: {
          placeholder: 'YYYY-MM-DD',
          required: true,
          label: "End On",
        },
      },
      {
        className: 'col-md-4',
        type: 'input',
        key: 'BatchStatus',
        templateOptions: {
          placeholder: 'Enter Batch Status',
          required: true,
          label: "Batch Status",
        },
      },
      {
        className: 'col-md-4',
        type: 'input',
        key: 'StartTime',
        templateOptions: {
          placeholder: 'HH:MM AM/PM',
          required: true,
          label: "Start Time",
        },
      },
      {
        className: 'col-md-4',
        type: 'input',
        key: 'EndTime',
        templateOptions: {
          placeholder: 'HH:MM AM/PM',
          required: true,
          label: "End Time",
        },
      },
      ]
    }
    ];
  }

  onCancelClick() {
    this.router.navigateByUrl('tds/masters/batches');
  }

  get f() {
    return this.form.controls;
  }

  onSubmit(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      // Add the form submission logic here
    } else {
      this.alertService.ShowErrorMessage('Please fill in all required fields.');
    }
  }
}
