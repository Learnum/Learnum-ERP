import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { AlertService } from 'src/app/core/services/alertService';
import { MessageService } from 'src/app/core/services/message.service';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { BatchesDetailsModel, BatchesDetailsReqModel, InstallMentDetailsModel } from './batchDetails.model';
import { ResponseCode } from 'src/app/core/models/responseObject.model';
import { AddbatchService } from './addbatch.service';
import { BaseService } from 'src/app/core/services/baseService';
@Component({
  selector: 'app-add-batch',
  templateUrl: './add-batch.component.html',
  styleUrls: ['./add-batch.component.scss']
})
export class AddBatchComponent implements OnInit {

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
  installmentModel: { Installments: InstallMentDetailsModel[] } = {
    Installments: [],
  };
  installmentOptions: FormlyFormOptions = {};
  installmentFields: FormlyFieldConfig[];
  model: any;

  constructor(
    private router: Router,
    private addbatchService: AddbatchService,
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
            className: 'col-md-3',
            type: 'input',
            key: 'BatchName',
            templateOptions: {
              placeholder: 'Enter Batch',
              type: 'text',
              label: "Batch Name",
              required: true,
              // pattern: "^[A-Za-z]+( [A-Za-z]+)*$",
            },
            validators: {
              ip: {
                expression: (c: AbstractControl) => !c.value || /^[A-Za-z ]+$/.test(c.value),
                message: (error: any, field: FormlyFieldConfig) => `Please Enter Batch Name `,
              },
            },
          },
          {
            className: 'col-md-3',
            type: 'select',
            key: 'BranchId',
            templateOptions: {
              label: "Branch Name",
              //placeholder: 'Select Branch',  
              required: true,
              options: [
                { value: null, label: 'Select Branch', disabled: true },  // Disabled placeholder option
                ...this.branchDetails ? this.branchDetails.map(branch => ({
                  label: branch.BranchName,
                  value: branch.BranchId
                })) : [],
              ]
            },
            defaultValue: null,
            validators: {
              required: {
                expression: (c: AbstractControl) => c.value !== null && c.value !== '',
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
              // placeholder: 'Select Classroom',  
              required: true,
              options: [
                { value: null, label: 'Select Classroom', disabled: true },
                ...this.classroomDetails ? this.classroomDetails.map(classroom => ({
                  label: classroom.ClassroomName,
                  value: classroom.ClassroomId
                })) : [],
              ],
            },
            defaultValue: null,
            validators: {
              required: {
                expression: (c: AbstractControl) => c.value !== null && c.value !== '',
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
              //placeholder: 'Select Course',  
              required: true,
              options: [
                { value: null, label: 'Select Course', disabled: true },
                ...this.courseDetails ? this.courseDetails.map(course => ({ label: course.CourseName, value: course.CourseId })) : [],
              ]
            },
            defaultValue: null,
            validators: {
              required: {
                expression: (c: AbstractControl) => c.value !== null && c.value !== '',
                message: 'Course selection is required',
              },
            },
            validation: {
              messages: {
                required: 'Course selection is required',
              },
            },
          },
          {
            className: 'col-md-3',
            type: 'input',
            key: 'CourseFeesInstallment',
            templateOptions: {
              placeholder: '₹',
              label: "Course Fees in Installment",
              pattern: '^[0-9]+(\\.[0-9]{1,2})?$',
              type: 'number',
              readonly: true,
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
              pattern: '^[0-9]*\\.?[0-9]{0,2}$', // only numbers with an optional decimal point and up to two decimal places are accepted
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
          },

          {
            className: 'col-md-3',
            type: 'input',
            key: 'StartOn',
            templateOptions: {
              placeholder: 'YYYY-MM-DD',
              type: 'date',
              required: true,
              label: "Start On",
              // min: new Date().toISOString().split('T')[0] as unknown as number
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
              min: new Date().toISOString().split('T')[0] as unknown as number
            },
            expressionProperties: {
              'templateOptions.minDate': (model) => {
                return model.StartOn ? new Date(model.StartOn).toISOString().split('T')[0] : new Date().toISOString().split('T')[0];
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
                { value: null, label: 'Select Batch Status', disabled: true },
                { value: true, label: 'Active' },
                { value: false, label: 'Inactive' }
              ],
            },
            defaultValue: null,  // Set default value to 'Active'
            validation: {
              messages: {
                required: 'Please select a batch status',
              },
            },
          }, ,
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
    this.router.navigateByUrl('tds/counselors-planning/batches-planning');
  }

  navigate() {
    this.router.navigateByUrl('tds/counselors-planning/batches-planning');
  }
  get f() {
    return this.form.controls;
  }

  onResetClick() {
    this.form.reset();
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
    this.addbatchService.insertBatchData(batchDetails, installmentDetails).subscribe(
      (result: any) => {
        const serviceResponse = result.Value;
        if (serviceResponse === ResponseCode.Success) {
          this.alertService.ShowSuccessMessage(this.messageService.savedSuccessfully);
        } else if (serviceResponse === ResponseCode.Update) {
          this.alertService.ShowSuccessMessage(this.messageService.updateSuccessfully);
        } else {
          this.alertService.ShowErrorMessage(this.messageService.serviceError);
        }
        this.router.navigateByUrl('tds/counselors-planning/batches-planning');
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
    this.addbatchService.getBranchList().subscribe(
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
    this.addbatchService.getClassroomList().subscribe(
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
    this.addbatchService.getCourseList().subscribe(
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
    this.addbatchService.getBatchDetails(BatchId).subscribe(
      (result: any) => {
        if (result && result.Value) {
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
