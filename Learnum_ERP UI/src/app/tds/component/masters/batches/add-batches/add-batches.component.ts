import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    this.createForm();
  }

  createForm(): void {
    this.form = this.fb.group({

      BatchName: ['', Validators.required],
      BranchName: ['', Validators.required],
      Classroom: ['', Validators.required],
      CourseName: ['', Validators.required],
      CourseFeesinInstallment: ['', Validators.required],
      OneTimeCourseFees: ['', Validators.required],
    });
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
            key: 'Branch Name',
            templateOptions: {
              placeholder: 'Enter Branch',
              type: 'text',
              label: "Branch Name",
              required: true,
            },
          },
          {
            className: 'col-md-4',
            type: 'input',
            key: 'Classroom',
            props: {
              placeholder: 'select',
              type: 'text',
              label: "Classroom",
              required: true,

            },
          },
          {
            className: 'col-md-4',
            type: 'select',
            key: 'course Name',
            props: {
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
            props: {
              placeholder: '###',
              required: true,
              valueProp: 'value',
              labelProp: 'label',
              label: "Course Fees in Installment",
            },

          },
          {
            className: 'col-md-4',
            type: 'input',
            key: 'One Time Course Fees',
            props: {
              placeholder: 'Enter One Time Course Fees',
              required: true,
              type: 'text',
              label: "One Time Course Fees",
            },
            validation: {
              messages: {
                required: 'Please select a postal code',
              },
            },
          },
          {
            className: 'col-md-4',
            type: 'input',
            key: 'StartOn',
            props: {
              placeholder: 'YYYY-MM-DD',
              required: true,
              label: "Start On",
            },
          },
          {
            className: 'col-md-4',
            type: 'input',
            key: 'EndOn',
            props: {
              placeholder: 'YYYY-MM-DD',
              required: true,
              label: "End On",
            },
          },
          {
            className: 'col-md-4',
            type: 'input',
            key: 'BatchStatus',
            props: {
              placeholder: 'Enter Batch Status',
              required: true,
              label: "Batch Status",
            },
          },
          {
            className: 'col-md-4',
            type: 'input',
            key: 'StartTime',
            props: {
              placeholder: 'HH:MM AM/PM',
              required: true,
              label: "Start Time",
            },
          },
          {
            className: 'col-md-4',
            type: 'input',
            key: 'EndTime',
            props: {
              placeholder: 'HH:MM AM/PM',
              required: true,
              label: "End Time",
            },
          },
          {
            className: 'col-md-4',
            type: 'input',
            key: 'ZbookID',
            props: {
              placeholder: 'Enter Zbook ID',
              required: true,
              label: "Zbook ID",
            },
          }

        ],
      },
    ];
  }

  onCancleClick() {
    this.router.navigateByUrl('tds/masters/batches');
  }

  get f() {
    return this.form.controls;
  }

  onSubmit(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
    }
    else {
      this.alertService.ShowErrorMessage('Please fill in all required fields.');
    }
  }

}



