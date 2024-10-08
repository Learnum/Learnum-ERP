import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { AddBranchService } from '../../branches/add-branch/add-branch.service';
import { AlertService } from 'src/app/core/services/alertService';
import { MessageService } from 'src/app/core/services/message.service';
import { tap } from 'rxjs/operators';
import { ResponseCode } from 'src/app/core/models/responseObject.model';
import { AddBatchesService } from './add-batches.service';
import { BatchesDetailsModel, BatchesDetailsReqModel, InstallMentDetailsModel } from './batchDetails.model';
import { formatDate } from '@angular/common';
import { BaseService } from 'src/app/core/services/baseService';

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
  batchDetails: BatchesDetailsModel = new BatchesDetailsModel();
  batchesDetailsReq: BatchesDetailsReqModel = new BatchesDetailsReqModel();
  classroomDetails: any;
  courseDetails: any;



  installmentForm = new FormGroup({});
  // installmentModel: any = {
  //   Installments:  [],
  // };

  installmentModel: { Installments: InstallMentDetailsModel[] } = {
    Installments: [],

  };
  installmentOptions: FormlyFormOptions = {};
  installmentFields: FormlyFieldConfig[];
  model: any;
  InstallMentDetailsModel: any;
  Installments: any;

  constructor(
    private router: Router,
    private addBatchService: AddBatchesService,
    private alertService: AlertService,
    private messageService: MessageService,
    private activateRoute: ActivatedRoute,
    private baseservice: BaseService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.setParameter();
    this.getBranchDetails();
    this.getClassroomDetails();
    this.getCourseDetails();
    this.editData = this.activateRoute.snapshot.queryParams;
    if (this.editData.source === 'edit' && this.editData.BatchId) {
      this.getBatchDetails(this.editData.BatchId);
    }
  }


  setParameter() {
    this.fields = [
      {
        fieldGroupClassName: 'row card-body p-2',
        fieldGroup: [
          {
            key: 'BatchId',
          },
          {
            className: 'col-md-3',
            type: 'input',
            key: 'BatchName',
            templateOptions: {
              placeholder: 'Enter Batch',
              type: 'text',
              label: "Batch Name",
              required: true,
              pattern: "^[\\w\\s\\W]*$", // Updated pattern to accept letters, numbers, and symbols.
            },
            validation: {
              messages: {
                required: 'Batch Name is required',
                pattern: 'Please enter a valid Batch Name',
              },
            },
          }
          ,
          {
            className: 'col-md-3',
            type: 'select',
            key: 'BranchId',
            templateOptions: {
              label: "Branch Name",
              //placeholder: 'Select Branch',  // Placeholder for the dropdown
              required: true,
              options: [
                { value: null, label: 'Select Branch', disabled: true },  // Disabled placeholder option
                ...this.branchDetails ? this.branchDetails.map(branch => ({
                  label: branch.BranchName,
                  value: branch.BranchId
                })) : [],
              ]
            },
            defaultValue: null,  // Optional: set a default value if needed
            validators: {
              required: {
                expression: (c: AbstractControl) => c.value !== null && c.value !== '', // Ensure a valid value is selected
                message: 'Branch selection is required',
              },
            },
            validation: {
              messages: {
                required: 'Branch selection is required',
              },
            },
          },

          {
            className: 'col-md-3',
            type: 'select',
            key: 'ClassroomId',
            templateOptions: {
              label: "Classroom Name",
              // placeholder: 'Select Classroom',  // Placeholder for the dropdown
              required: true,
              options: [
                { value: null, label: 'Select Classroom', disabled: true },  // Disabled placeholder option
                ...this.classroomDetails ? this.classroomDetails.map(classroom => ({
                  label: classroom.ClassroomName,
                  value: classroom.ClassroomId
                })) : [],
              ],
            },
            defaultValue: null,  // Optional: set a default value if needed
            validators: {
              required: {
                expression: (c: AbstractControl) => c.value !== null && c.value !== '', // Ensure a valid value is selected
                message: 'Classroom Name is required',
              },
            },
            validation: {
              messages: {
                required: 'Classroom Name is required',
              },
            },
          },

          {
            className: 'col-md-3',
            type: 'select',
            key: 'CourseId',
            templateOptions: {
              label: "Course Name",
              //placeholder: 'Select Course',  // Placeholder for the dropdown
              required: true,
              options: [
                { value: null, label: 'Select Course', disabled: true },  // Disabled placeholder option
                ...this.courseDetails ? this.courseDetails.map(course => ({ label: course.CourseName, value: course.CourseId })) : [],
              ]
            },
            defaultValue: null,  // Optional: set a default value if needed
            validators: {
              required: {
                expression: (c: AbstractControl) => c.value !== null && c.value !== '', // Ensure a valid value is selected
                message: 'Course selection is required',
              },
            },
            validation: {
              messages: {
                required: 'Course selection is required',
              },
            },
          }
          ,
          {
            className: 'col-md-3',
            type: 'input',
            key: 'CourseFeesInstallment',
            templateOptions: {
              placeholder: '₹',
              // required: true,
              label: "Course Fees in Installment",
              pattern: '^[0-9]+(\\.[0-9]{1,2})?$',
              inputMode: 'numeric',
              min: 0,
              step: 0.01,
              readonly: true,
            },
          },
          {
            className: 'col-md-3',
            type: 'input',
            key: 'OneTimeCourseFees',
            templateOptions: {
              placeholder: '₹',
              required: true,
              type: 'text',
              label: 'One Time Course Fees',
              pattern: '^[0-9]*\\.?[0-9]{0,2}$', 
              inputMode: 'decimal',
              min: 0,
              step: 0.01,
            },
            hooks: {
              onInit: (field) => {
                field.formControl.valueChanges.subscribe(value => {
                  const sanitizedValue = value.replace(/[^0-9.]/g, '');
                  if (sanitizedValue !== value) {
                    field.formControl.setValue(sanitizedValue, { emitEvent: false });
                  }
                });
              }
            }
          }

          ,
          {
            className: 'col-md-3',
            type: 'input',
            key: 'StartOn',
            templateOptions: {
              placeholder: 'YYYY-MM-DD',
              type: 'date',
              required: true,
              label: "Start On",
              attributes: {
                min: formatDate(new Date(), 'yyyy-MM-dd', 'en-IN'), // Sets today's date as the minimum
              },
            },
          },
          {
            className: 'col-md-3',
            type: 'input',
            key: 'EndOn',
            templateOptions: {
              placeholder: 'YYYY-MM-DD',
              type: 'date',
              required: true,
              label: "End On",
              attributes: {
                min: formatDate(new Date(), 'yyyy-MM-dd', 'en-IN'), // Sets today's date as the minimum
              },
            },
          },
          {
            className: 'col-md-3',
            type: 'select',
            key: 'IsActive',
            templateOptions: {
              label: 'Batch Status',
              //placeholder: 'Select Batch Status',
              required: true,
              options: [
                { value: true, label: 'Active' },
                { value: false, label: 'Inactive' }
              ],
              
            },
            defaultValue: true, 
            validation: {
              messages: {
                required: 'Please select a batch status',
              },
            },
          },
        ],
      },
    ];

    this.installmentFields = [
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
              key: 'InstallmentNumber',
              className: 'col-4',
              type: 'input',
              templateOptions: {
                placeholder: 'Installment Number',
                type: 'number',
                required: true,
              },
            },
            {
              key: 'DueDate',
              className: 'col-4',
              type: 'input',
              templateOptions: {
                placeholder: 'Due Date',
                type: 'date',
                required: true,
                attributes: {
                  min: formatDate(new Date(), 'yyyy-MM-dd', 'en-IN'), // Sets today's date as the minimum
                },
              },

            },
            {
              key: 'InstallmentAmount',
              className: 'col-4',
              type: 'input',
              templateOptions: {
                placeholder: '₹',
                type: 'number',
                required: true,
              },
              hooks: {
                onInit: (field) => {
                  const form = field.parent.formControl;
                  field.formControl.valueChanges.pipe(
                    tap(() => {
                      this.calculateInstallment();
                    }),
                  ).subscribe();
                },
              },
            }
          ],
        },
      },
    ];
  }
  onCancleClick() {
    this.router.navigateByUrl('erp/masters/batches');
  }

  navigate() {
    this.router.navigateByUrl('erp/masters/batches');

  }
  onResetClick() {
    this.form.reset();
  }

  get f() {
    return this.form.controls;
  }

  onSubmit(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.insertBatch();
    } else {
      this.alertService.ShowErrorMessage('Please fill in all required fields.');
    }
  }
  insertBatch() {



    console.log(this.batchDetails);
    console.log(this.installmentModel)
    const batchDetails = this.form.value as BatchesDetailsModel;
    const installmentDetails = this.installmentForm.value.Installments as InstallMentDetailsModel[];
    this.addBatchService.insertBatchData(batchDetails, installmentDetails).subscribe(
      (result: any) => {
        const serviceResponse = result.Value;
        if (serviceResponse === ResponseCode.Success) {
          this.alertService.ShowSuccessMessage(this.messageService.savedSuccessfully);
          this.router.navigateByUrl('erp/masters/batches');

        } else if (serviceResponse === ResponseCode.Update) {
          this.alertService.ShowSuccessMessage(this.messageService.updateSuccessfully);
          this.router.navigateByUrl('erp/masters/batches');

        } else {
          this.alertService.ShowErrorMessage(this.messageService.serviceError);
        }
      },
      (error: any) => {
        this.alertService.ShowErrorMessage(error);
      }
    );
  }
  calculateInstallment() {
    if (this.installmentModel.Installments.length > 0) {
      let totalInstallments = 0;
      this.installmentModel.Installments.forEach(element => {
        totalInstallments += element.InstallmentAmount || 0;
      });
      this.batchDetails.courseFeesInstallment = totalInstallments;
      this.form.get('CourseFeesInstallment').setValue(totalInstallments);
    }
  }
  getBranchDetails() {
    this.addBatchService.getBranchList().subscribe(
      (data: any) => {
        this.branchDetails = data.Value;
        this.setParameter();
      },
      (error: any) => {
        this.alertService.ShowErrorMessage(error);
      }
    );
  }

  getClassroomDetails() {
    this.addBatchService.getClassroomList().subscribe(
      (data: any) => {
        this.classroomDetails = data.Value;
        this.setParameter();
      },
      (error: any) => {
        this.alertService.ShowErrorMessage(error);
      }
    );
  }

  getCourseDetails() {
    this.addBatchService.getCourseList().subscribe(
      (data: any) => {
        this.courseDetails = data.Value;
        this.setParameter();
      },
      (error: any) => {
        this.alertService.ShowErrorMessage(error);
      }
    );
  }
  getBatchDetails(BatchId: number) {
    this.addBatchService.getBatchDetails(BatchId).subscribe(
      (result: any) => {
        if (result && result.Value) {
          // this.batchesDetailsReq.batchesDetailsModel = result.Value.Item1.BatchDetails;
          // this.batchesDetailsReq.installMentDetailsModel = result.Value.Item1.InstallmentDetails;
          this.installmentModel.Installments = result.Value.Item1.InstallmentDetails;
          this.batchDetails = result.Value.Item1.BatchDetails;


          this.batchDetails.StartOn = this.baseservice.formatDate(this.batchDetails.StartOn);
          this.batchDetails.EndOn = this.baseservice.formatDate(this.batchDetails.EndOn);

          this.installmentModel.Installments.forEach(item => {
            item.DueDate = this.baseservice.formatDate(item.DueDate);
          })

          this.setParameter();
          console.error('No data found for BatchId: ' + BatchId);
        }
      },
      (error: any) => {
        console.error('Error retrieving batch details:', error);

      }
    );
  }
}
