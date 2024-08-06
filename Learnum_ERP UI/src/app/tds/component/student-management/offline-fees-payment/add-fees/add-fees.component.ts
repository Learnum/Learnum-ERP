import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { AlertService } from 'src/app/core/services/alertService';
import { MessageService } from 'src/app/core/services/message.service';
import { FormGroup, FormBuilder,Validators, AbstractControl } from '@angular/forms';
import { addfeesModel } from './addfeesmodel';
import { AddFeesService } from './add-fees.service';
import { ResponseCode } from 'src/app/core/models/responseObject.model';

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
  branchDetails:any;
  OfflineFeesDetails: addfeesModel = new addfeesModel();
  editData: any;
  batchDetails: any;
  courseDetails: any;

  constructor(
    private addfeesService: AddFeesService,
    private router: Router,
    private alertService: AlertService,
    private messageService: MessageService,
    private activateRoute: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.setParameter();
    this.getCourseDetails();
    this.getBatchDetails();
    this.getBranchDetails();

    this.editData = this.activateRoute.snapshot.queryParams;
    if (this.editData.source === 'edit' && this.editData.CounsellorId) {
      this.getOfflineFeesDetails(this.editData.CounsellorId);
    }
  }

 

  setParameter() {
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
            type:'input',
            templateOptions: {
              label: 'Student Name',
              placeholder: 'Enter Student Name',
              required: true,
            }
          },
          {
            className: 'col-md-4',
            key: 'studentId',
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
            type: 'select',
            key: 'CourseId',
            templateOptions: {
              placeholder: 'Course Name',
              type: 'text',
              label: "course Name",
              required: true,
              options: this.courseDetails ? this.courseDetails.map(course => ({
                label: course.CourseName
                , value: course.CourseId
              })) : [],
            },
          },
          {
            className: 'col-md-4',
            type: 'input',
            key: 'BranchId',
            templateOptions: {
              placeholder: 'Branch Name',
              type: 'text',
              label: "Branch Name",
              required: true,
              options: this.branchDetails ? this.branchDetails.map(branch => ({ label: branch.BranchName, value: branch.BranchId })) : [],
            },

          },
          {
            className: 'col-md-4',
            type: 'select',
            key: 'BatchId',
            templateOptions: {
              placeholder: 'Enter batch Name',
              required: true,
              type: ' Batch Name',
              label: "Batch Name",
              options: this.batchDetails ? this.batchDetails.map(batch => ({
                label: batch.BatchName
                , value: batch.BatchId
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
            key: 'amountpaid',
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
            className: 'col-md-3',
            type: 'select',
            key: 'IsActive',
            templateOptions: {
              placeholder: 'Select Status',
              type: 'text',
              label: "Status",
              required: true,
              options: [
                { value: true, label: 'Active' },
                { value: false, label: 'Inactive' }
              ]
             },
            },
        ],
      },
      
    ];
  }

  insertfees() {
    this.OfflineFeesDetails.addedBy = 1;
    this.OfflineFeesDetails.addedDate = new Date();
    this.OfflineFeesDetails.updatedBy = 1;
    this.OfflineFeesDetails.updatedDate = new Date();
    // this.branchManagerDetails.branchManagerId = 0;

    this.addfeesService.insertfeesDetails(this.OfflineFeesDetails).subscribe(
      (result: any) => {
        let serviceResponse = result.Value
        if (result.Value === ResponseCode.Success) {
          this.alertService.ShowSuccessMessage(this.messageService.savedSuccessfully);
          this.router.navigateByUrl('tds/offline-fees-payment');

        }
        else if (serviceResponse == ResponseCode.Update) {
          this.alertService.ShowSuccessMessage(this.messageService.updateSuccessfully);
          this.router.navigateByUrl('tds/offline-fees-payment');
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

  onSubmit(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.insertfees();
    } else {
      this.alertService.ShowErrorMessage('Please fill in all required fields.');
    }
  }

  onCancelClick() {
    this.router.navigateByUrl('tds/student-management/offline-fees-payment');
  }

  getBranchDetails() {
    this.addfeesService.getBranchList().subscribe(
      (data: any) => {
        this.branchDetails = data.Value;
        this.setParameter();  
      },
      (error: any) => {
        this.alertService.ShowErrorMessage(error);
      }
    );
  }
  getBatchDetails() {
    this.addfeesService.getBatchList().subscribe(
      (data: any) => {
        this.batchDetails = data.Value;
        this.setParameter();
      },
      (error: any) => {
        this.alertService.ShowErrorMessage(error);
      }
    );
  }
  getCourseDetails() {
    this.addfeesService.getcourseList().subscribe(
      (data: any) => {
        this.courseDetails = data.Value;
        this.setParameter();
      },
      (error: any) => {
        this.alertService.ShowErrorMessage(error);
      }
    );
  }
  
  getOfflineFeesDetails(offlineFeesPaymentId: number) {
    this.addfeesService.getOfflineFessDetails(offlineFeesPaymentId).subscribe(
      (result: any) => {
        if (result && result.Value) {
          this.OfflineFeesDetails = result.Value.Item1;
          this.setParameter();
          console.error('No data found for offlineFeesPaymentId: ' + offlineFeesPaymentId);
        }
      },
      (error: any) => {
        console.error('Error retrieving offlineFeesPayment details:', error);
      }
    );
  }
}
