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
  AddfeesModel: addfeesModel = new addfeesModel();
  form = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[];
  branchDetails:any;
  courseDetails: any;
  editData: any;
  batchesDetails: any;
  studentDetails: any;

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
    this.getAddStudentDetails();
    this.getCourseDetails();
    this.getBranchDetails();

    this.editData = this.activateRoute.snapshot.queryParams;
    if (this.editData.source === 'edit' && this.editData.offlineFeesPaymentId) {
      this.getOfflineFeesDetails(this.editData.offlineFeesPaymentId);
    }
  }

 
  setParameter() {
    this.fields = [
      {
        fieldGroupClassName: 'row card-body p-2',
        fieldGroup: [
          {
            className: 'col-md-3',
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
            className: 'col-md-3',
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
            className: 'col-md-3',
            key: 'referenceNumber',
            type: 'input',
            templateOptions: {
              label: 'Reference Number',
              placeholder: 'Enter Reference Number',
              required: true,
            }
          },
          {
            className: 'col-md-3',
            key: 'StudentId',
            type: 'select',
            props: {
              label: 'Student Name',
              placeholder: 'Enter Student Name',
              required: true,
              type: 'text',
              options: this.studentDetails ? this.studentDetails.map(student => ({ label: student.StudentName, value: student.StudentId })) : [],
            },
            hooks: {
              onInit: (field) => {
                field.formControl?.valueChanges.subscribe((selectedStudentId) => {
                  const selectedStudent = this.studentDetails.find(student => student.StudentId === selectedStudentId);
                  if (selectedStudent) {
                    this.form.get('studentId')?.setValue(selectedStudent.StudentId);
                    this.form.get('StudentPhone')?.setValue(selectedStudent.StudentPhone);
                  }
                });
              }
            },
            validation: {
              messages: {
                required: 'Student Name is required',
              },
            },
          },
          {
            className: 'col-md-3',
            key: 'studentId',
            type: 'input',
            templateOptions: {
              label: 'Student ID',
              placeholder: 'Enter Student ID',
              required: true,
              readonly: true 
            }
          },
          {
            className: 'col-md-3',
            key: 'StudentPhone',
            type: 'input',
            templateOptions: {
              label: 'Phone Number',
              placeholder: 'Enter Phone Number',
              required: true,
              readonly: true 
            }
          },
          {
            className: 'col-md-3',
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
            className: 'col-md-3',
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
            className: 'col-md-3',
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
            className: 'col-md-3',
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
            className: 'col-md-3',
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

  onCancleClick() {
    this.router.navigateByUrl('erp/student-management/offline-fees-payment');
  }
  onSubmit(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.insertOfflineFeesPayment();
    } else {
      this.alertService.ShowErrorMessage('Please fill in all required fields.');
    }
  }

  getAddStudentDetails() {
    this.addfeesService.getAddStudentList().subscribe(
      (data: any) => {
        this.studentDetails = data.Value;
        this.setParameter();
      },
      (error: any) => {
        this.alertService.ShowErrorMessage(error);
      }
    );
  }
  getCourseDetails() {
    this.addfeesService.getCourseList().subscribe(
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

getBatchDetailsByBranchId(BranchId: number) {
  this.addfeesService.getBatchDetailsByBranchId(BranchId).subscribe(
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

  insertOfflineFeesPayment() {
    this.AddfeesModel.AddedBy = 1;
    this.AddfeesModel.AddedDate = new Date();
    this.AddfeesModel.UpdatedBy = 1;
    this.AddfeesModel.UpdatedDate = new Date();
    this.AddfeesModel.OfflineFeesPaymentId=0;
    // this.branchManagerDetails.branchManagerId = 0;

    this.addfeesService.insertfeesDetails(this.AddfeesModel).subscribe(
      (result: any) => {
        let serviceResponse = result.Value
        if (result.Value === ResponseCode.Success) {
          this.alertService.ShowSuccessMessage(this.messageService.savedSuccessfully);
          this.router.navigateByUrl('erp/student-management/offline-fees-payment');

        }
        else if (serviceResponse == ResponseCode.Update) {
          this.alertService.ShowSuccessMessage(this.messageService.updateSuccessfully);
          this.router.navigateByUrl('erp/student-management/offline-fees-payment');
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
  getOfflineFeesDetails(offlineFeesPaymentId: number) {
    this.addfeesService.getOfflineFessDetailsById(offlineFeesPaymentId).subscribe(
      (result: any) => {
        if (result && result.Value) {
          this.AddfeesModel = result.Value.Item1;
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
