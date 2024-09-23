import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { AlertService } from 'src/app/core/services/alertService';
import { MessageService } from 'src/app/core/services/message.service';
import { FormGroup, FormBuilder,Validators, AbstractControl } from '@angular/forms';
import { SendfeesreminderService } from './sendfeesreminder.service';
import { BaseService } from 'src/app/core/services/baseService';
import { ResponseCode } from 'src/app/core/models/responseObject.model';
import { SendFeesReminderModel } from './sendfeespayment.model';

@Component({
  selector: 'app-fees-reminder',
  templateUrl: './fees-reminder.component.html',
  styleUrls: ['./fees-reminder.component.scss']
})
export class FeesReminderComponent implements OnInit {

  sendFeesReminderModel:SendFeesReminderModel = new SendFeesReminderModel();

  form = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[];
  branchDetails:any;
  courseDetails: any;
  editData: any;
  batchesDetails: any;

  constructor(
    private router: Router,
    private alertService: AlertService,
    private messageService: MessageService,
    private activateRoute: ActivatedRoute,
    private baseservice: BaseService,
    private sendfeesreminderService : SendfeesreminderService
  ) { }

  ngOnInit(): void {
    this.setParameter();
   // this.getAddStudentDetails();
    this.getCourseDetails();
    this.getBranchDetails();

    this.editData = this.activateRoute.snapshot.queryParams;
    if (this.editData.source === 'edit' && this.editData.SendFeesId) {
      this.getSendFeesReminderBySendFeesId(this.editData.SendFeesId);
    }
  }

  setParameter() {
    this.fields = [
      {
        fieldGroupClassName: 'row card-body p-2',
        fieldGroup: [
          {
            key:'SendFeesId'
          },
          {
            className: 'col-md-4',
            type: 'select',
            key: 'CourseId',
            props: {
              placeholder: 'Select Course',
              label: "Course Name",
              required: true,
              options: this.courseDetails ? this.courseDetails.map(course => ({ label: course.CourseName, value: course.CourseId })) : [],
            },
            validation: {
              messages: {
                required: 'Course Name is required',
              },
            },
          },
          {
            className: 'col-md-4',
            type: 'select',
            key: 'BranchId',
            templateOptions: {
              placeholder: 'Branch Name',
              type: 'text',
              label: "Branch Name",
              required: true,
              // options: this.branchDetails ? this.branchDetails.map(branch => ({ label: branch.BranchName, value: branch.BranchId })) : [],
              options: this.branchDetails ? this.branchDetails.map(branch => ({ label: branch.BranchName, value: branch.BranchId })) : [],
              change: (field) => {
                const branchId = field.formControl.value;
                this.getBatchDetailsByBranchId(branchId);
              },
            },
            validation: {
              messages: {
                required: 'Branch Name is required',
              },
            },
          },
          {
            className: 'col-md-4',
            type: 'select',
            key: 'BatchId',
            templateOptions: {
              placeholder: 'Enter batch Name',
              required: true,
              label: "Batch Name",
              options: this.batchesDetails ? this.batchesDetails.map(batch => ({
                label: batch.BatchName,
                value: batch.BatchId
              })) : [],
            },
            validation: {
              messages: {
                required: 'This field is required',
              },
            },
          },
          {
            className: 'col-md-4',
            key: 'DueDate',
            type: 'input',
            props: {
              label: 'Due Date',
              placeholder: 'Enter Due Date',
              type: 'date',
              required: true,
            },
            validation: {
              messages: {
                required: 'Due Date is required',
              },
            },
          },
          {
            className: 'col-md-4',
            key: 'InstallmentAmount',
            type: 'input',
            props: {
              label: 'Installment Amount',
              placeholder: 'Enter Installment Amount',
              type: 'number',
              required: true,
            },
            validation: {
              messages: {
                required: 'Installment Amount is required',
                pattern: 'Installment Amount must be a valid number',
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
      this.insertSendFeesReminder();
    } else {
      // Handle form errors
    }
  }
  onCancelClick() {
    this.router.navigateByUrl('erp/student-management/send-fees-reminder-report');
  }
  onResetClick() {
    this.form.reset();
  }
  getCourseDetails() {
    this.sendfeesreminderService.getCourseList().subscribe(
      (data: any) => {
        this.courseDetails = data.Value;
        this.setParameter();
      },
      (error: any) => {
        this.alertService.ShowErrorMessage(error);
      }
    );
  }
  getBranchDetails() {
    this.sendfeesreminderService.getBranchList().subscribe(
      (data: any) => {
        this.branchDetails = data.Value;
        this.setParameter();  
      },
      (error: any) => {
        this.alertService.ShowErrorMessage(error);
      }
    );
  }

getBatchDetailsByBranchId(BranchId: number) {
  this.sendfeesreminderService.getBatchDetailsByBranchId(BranchId).subscribe(
    (result: any) => {
      if (result && result.Value) {
        this.batchesDetails = result.Value.Item1;
        this.setParameter();
        // Find the 'BatchId' field and update its options with the new batch details
        const batchField = this.fields.find(field => field.key === 'BatchId');
        if (batchField) {
          batchField.props.options = this.batchesDetails.map(batch => ({
            label: batch.BatchName ,
            value: batch.BatchId,
          }));

          // Trigger form re-render to apply the changes
          this.options.updateInitialValue();  // Ensure the form updates after changes to fields
        }
      } else {
        console.error('No data found for BranchId: ' + BranchId);
      }
    },
    (error: any) => {
      console.error('Error retrieving batch details:', error);
    }
  );
}
getSendFeesReminderBySendFeesId(SendFeesId: number) {
  this.sendfeesreminderService.getSendFeesReminderBySendFeesId(SendFeesId).subscribe(
    (result: any) => {
      if (result && result.Value) {
        this.sendFeesReminderModel = result.Value.Item1;
        this.sendFeesReminderModel.DueDate = this.baseservice.formatDate(this.sendFeesReminderModel.DueDate)
        this.getBatchDetailsByBranchId(this.sendFeesReminderModel.BranchId);
        this.setParameter();
        console.error('No data found for SendFeesId: ' + SendFeesId);
      }
    },
    (error: any) => {
      console.error('Error retrieving offlineFeesPayment details:', error);
    }
  );
}
insertSendFeesReminder() {
  this.sendFeesReminderModel.AddedBy = 1;
  this.sendFeesReminderModel.AddedDate = new Date();
  this.sendFeesReminderModel.UpdatedBy = 1;
  this.sendFeesReminderModel.UpdatedDate = new Date();
  //this.sendFeesReminderModel.SendFeesId = 0;

  this.sendfeesreminderService.insertSendFeesReminder(this.sendFeesReminderModel).subscribe(
    (result: any) => {
      let serviceResponse = result.Value
      if (result.Value === ResponseCode.Success) {
        this.alertService.ShowSuccessMessage(this.messageService.savedSuccessfully);
        this.router.navigateByUrl('erp/student-management/send-fees-reminder-report');
      }
      else if (serviceResponse == ResponseCode.Update) {
        this.alertService.ShowSuccessMessage(this.messageService.updateSuccessfully);
        this.router.navigateByUrl('erp/student-management/send-fees-reminder-report');
      }
      else {
        this.alertService.ShowErrorMessage(this.messageService.serviceError);
      }
    },
    (error: any) => {
      this.alertService.ShowErrorMessage("Enter all required fields");
    }
  )

}

}
