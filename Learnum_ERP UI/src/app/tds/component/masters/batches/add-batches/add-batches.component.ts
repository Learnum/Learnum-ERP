import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { AddBranchService } from '../../branches/add-branch/add-branch.service';
import { AlertService } from 'src/app/core/services/alertService';
import { MessageService } from 'src/app/core/services/message.service';
import { tap } from 'rxjs/operators';
import { ResponseCode } from 'src/app/core/models/responseObject.model';
import { AddBatchesService } from './add-batches.service';
import { BatchesDetailsModel, BatchesDetailsReqModel, InstallMentDetailsModel } from './batchDetails.model';

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

  constructor(
    private router: Router,
    private addBatchService: AddBatchesService,
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
              options: [
                { value: 'cpat', label: 'Cpat' },
                { value: 'tax', label: 'tax' },
              ],
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
              options: [
                { value: 'Classroom-1', label: 'Classroom-1' },
                { value: 'Classroom-2', label: 'Classroom-2' },
              ],
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
              options: [
                { value: 'tax', label: 'tax' },
                { value: 'tally', label: 'tally' },
              ],
            },
          },
          {
            className: 'col-md-4',
            type: 'input',
            key: 'CourseFeesInstallment',
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
            type: 'select',
            key: 'BatchStatus',
            templateOptions: {
              placeholder: 'Enter Batch Status',
              required: true,
              label: "Batch Status",
              options: [
                { value: 'true', label: 'active' },
                { value: 'false', label: 'inactive' },
              ],
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
              key: 'installmentNumber',
              className: 'col-4',
              type: 'input',
              templateOptions: {
                placeholder: 'Installment Number',
                type: 'number',
                required: true,
              },
            },
            {
              key: 'dueDate',
              className: 'col-4',
              type: 'input',
              templateOptions: {
                placeholder: 'Due Date',
                type: 'date',
                required: true,
              },
            },
            {
              key: 'installmentAmount',
              className: 'col-4',
              type: 'input',
              templateOptions: {
                placeholder: 'Installment Amount',
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

  // setParameter() {
  //   this.fields = [
  //     {
  //       fieldGroupClassName: 'row card-body p-2',
  //       fieldGroup: [
  //         {
  //           className: 'col-md-4',
  //           type: 'input',
  //           key: 'BatchName',
  //           templateOptions: {
  //             placeholder: 'Enter Batch',
  //             type: 'text',
  //             label: "Batch Name",
  //             required: true,
  //           },
  //         },
  //         {
  //           className: 'col-md-4',
  //           type: 'select',
  //           key: 'BranchName',
  //           templateOptions: {
  //             placeholder: 'Enter Branch',
  //             type: 'text',
  //             label: "Branch Name",
  //             required: true,
  //             options: [
  //               { value: 'cpat', label: 'Cpat' },
  //               { value: 'tax', label: 'tax' },
  //             ],
  //           },
  //         },
  //         {
  //           className: 'col-md-4',
  //           type: 'select',
  //           key: 'Classroom',
  //           templateOptions: {
  //             placeholder: 'Select Classroom',
  //             type: 'text',
  //             label: "Classroom",
  //             required: true,
  //             options: [
  //               { value: 'Classroom-1', label: 'Classroom-1' },
  //               { value: 'Classroom-2', label: 'Classroom-2' },
  //             ],
  //           },
  //         },
  //         {
  //           className: 'col-md-4',
  //           type: 'select',
  //           key: 'CourseName',
  //           templateOptions: {
  //             placeholder: 'Select',
  //             required: true,
  //             type: 'text',
  //             label: "Course Name",
  //             options: [
  //               { value: 'tax', label: 'tax' },
  //               { value: 'tally', label: 'tally' },
  //             ],
  //           },
  //         },
  //         {
  //           className: 'col-md-4',
  //           type: 'input',
  //           key: 'CourseFeesinInstallment',
  //           templateOptions: {
  //             placeholder: '###',
  //             required: true,
  //             label: "Course Fees in Installment",
  //           },
  //         },
  //         {
  //           className: 'col-md-4',
  //           type: 'input',
  //           key: 'OneTimeCourseFees',
  //           templateOptions: {
  //             placeholder: 'Enter One Time Course Fees',
  //             required: true,
  //             type: 'text',
  //             label: "One Time Course Fees",
  //           },
  //           validation: {
  //             messages: {
  //               required: 'Please enter the course fees',
  //             },
  //           },
  //         },
  //       ],
  //     },
  //     {
  //       key: 'Installments',
  //       type: 'repeat',
  //       props: {
  //         addText: '+ Add New',
  //         label: 'Installments',
  //       },
  //       fieldArray: {
  //         fieldGroupClassName: 'row',
  //         fieldGroup: [
  //           // {
  //           //   key: 'InstallmentId',
  //           //   className: 'col-4',
  //           //   type: 'input',
  //           //   templateOptions: {
  //           //     placeholder: 'Installment ID',
  //           //     type: 'number',
  //           //     required: true,
  //           //   },
  //           // },
  //           {
  //             key: 'InstallmentNumber',
  //             className: 'col-4',
  //             type: 'input',
  //             templateOptions: {
  //               placeholder: 'Installment Number',
  //               type: 'number',
  //               required: true,
  //             },
  //           },
  //           {
  //             key: 'DueDate',
  //             className: 'col-4',
  //             type: 'input',
  //             templateOptions: {
  //               placeholder: 'Due Date',
  //               type: 'date',
  //               required: true,
  //             },
  //           },
  //           {
  //             key: 'InstallmentAmount',
  //             className: 'col-4',
  //             type: 'input',
  //             templateOptions: {
  //               placeholder: 'Installment Amount',
  //               type: 'number',
  //               required: true,
  //             },
  //             hooks: {
  //               onInit: (field) => {
  //                 const form = field.parent.formControl;
  //                 field.formControl.valueChanges.pipe(
  //                   tap(() => {
  //                     this.calculateInstallment();
  //                   }),
  //                 ).subscribe();
  //               },
  //             }
  //           }
  //         ],
  //       },
  //     },
  //     {
  //       fieldGroupClassName: 'row card-body p-2',
  //       fieldGroup: [
  //         {
  //           className: 'col-md-4',
  //           type: 'input',
  //           key: 'StartOn',
  //           templateOptions: {
  //             placeholder: 'YYYY-MM-DD',
  //             required: true,
  //             label: "Start On",
  //           },
  //         },
  //         {
  //           className: 'col-md-4',
  //           type: 'input',
  //           key: 'EndOn',
  //           templateOptions: {
  //             placeholder: 'YYYY-MM-DD',
  //             required: true,
  //             label: "End On",
  //           },
  //         },
  //         {
  //           className: 'col-md-4',
  //           type: 'select',
  //           key: 'BatchStatus',
  //           templateOptions: {
  //             placeholder: 'Enter Batch Status',
  //             required: true,
  //             label: "Batch Status",
  //             options: [
  //               { value: 'true', label: 'active' },
  //               { value: 'false', label: 'inactive' },
  //             ],
  //           },
  //         },
  //         // {
  //         //   className: 'col-md-4',
  //         //   type: 'input',
  //         //   key: 'StartTime',
  //         //   templateOptions: {
  //         //     placeholder: 'HH:MM AM/PM',
  //         //     required: true,
  //         //     label: "Start Time",
  //         //   },
  //         // },
  //         // {
  //         //   className: 'col-md-4',
  //         //   type: 'input',
  //         //   key: 'EndTime',
  //         //   templateOptions: {
  //         //     placeholder: 'HH:MM AM/PM',
  //         //     required: true,
  //         //     label: "End Time",
  //         //   },
  //         // },
  //       ]
  //     }
  //   ];
  // }

  onCancelClick() {
    this.router.navigateByUrl('tds/masters/batches');
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
        } else if (serviceResponse === ResponseCode.Update) {
          this.alertService.ShowSuccessMessage(this.messageService.updateSuccessfully);
        } else {
          this.alertService.ShowErrorMessage(this.messageService.serviceError);
        }
        this.router.navigateByUrl('tds/masters/batches');
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
        totalInstallments += element.installmentAmount || 0;
      });
      this.batchDetails.courseFeesInstallment = totalInstallments;
      this.form.get('CourseFeesinInstallment').setValue(totalInstallments);
    }
  }
}
