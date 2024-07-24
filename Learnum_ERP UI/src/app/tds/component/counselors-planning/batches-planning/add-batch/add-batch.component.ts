import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { AlertService } from 'src/app/core/services/alertService';
import { MessageService } from 'src/app/core/services/message.service';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { BatchesDetailsModel, BatchesDetailsReqModel } from './batchDetails.model';
import { ResponseCode } from 'src/app/core/models/responseObject.model';
import { AddbatchService } from './addbatch.service';
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
  courseDetails:any;

  installmentForm = new FormGroup({});
  installmentModel: any = {
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
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.setParameter();
    this.getBranchDetails();
    this.getCourseDetails();
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
  //           {
  //             key: 'number',
  //             className: 'col-4',
  //             type: 'input',
  //             templateOptions: {
  //               placeholder: 'Installment Number',
  //               type: 'number',
  //               required: true,
  //             },
  //           },
  //           {
  //             key: 'installment',
  //             className: 'col-4',
  //             type: 'input',
  //             templateOptions: {
  //               placeholder: 'Due Date',
  //               type: 'date',
  //               required: true,
  //             },
  //           },
  //           {
  //             key: 'amount',
  //             className: 'col-4',
  //             type: 'input',
  //             templateOptions: {
  //               placeholder: 'Installment Amount',
  //               type: 'number',
  //               required: true,
  //             },
  //           }
  //         ],
  //       },
  //     },
  //     {
  //     fieldGroupClassName: 'row card-body p-2',
  //     fieldGroup: [
  //     {
  //       className: 'col-md-4',
  //       type: 'input',
  //       key: 'StartOn',
  //       templateOptions: {
  //         placeholder: 'YYYY-MM-DD',
  //         required: true,
  //         label: "Start On",
  //       },
  //     },
  //     {
  //       className: 'col-md-4',
  //       type: 'input',
  //       key: 'EndOn',
  //       templateOptions: {
  //         placeholder: 'YYYY-MM-DD',
  //         required: true,
  //         label: "End On",
  //       },
  //     },
  //     {
  //       className: 'col-md-4',
  //       type: 'input',
  //       key: 'BatchStatus',
  //       templateOptions: {
  //         placeholder: 'Enter Batch Status',
  //         required: true,
  //         label: "Batch Status",
  //       },
  //     },
  //     {
  //       className: 'col-md-4',
  //       type: 'input',
  //       key: 'StartTime',
  //       templateOptions: {
  //         placeholder: 'HH:MM AM/PM',
  //         required: true,
  //         label: "Start Time",
  //       },
  //     },
  //     {
  //       className: 'col-md-4',
  //       type: 'input',
  //       key: 'EndTime',
  //       templateOptions: {
  //         placeholder: 'HH:MM AM/PM',
  //         required: true,
  //         label: "End Time",
  //       },
  //     },
  //     {
  //       className: 'col-md-4',
  //       type: 'input',
  //       key: 'ZbookID',
  //       templateOptions: {
  //         placeholder: 'Enter Zbook ID',
  //         required: true,
  //         label: "Zbook ID",
  //       },
  //     }
  //     ]
  //   }
  //   ];
  // }

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
            className: 'col-md-6',
            type: 'select',
            key: 'BranchId',
            templateOptions: {
              placeholder: 'Branch Name',
              type: 'text',
              label: "Branch Name",
              //required: true,
              options: this.branchDetails ? this.branchDetails.map(branch => ({ label: branch.BranchName
                , value: branch.BranchId
              })) : [],
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
            className: 'col-md-6',
            type: 'select',
            key: 'CourseId',
            templateOptions: {
              placeholder: 'Course Name',
              type: 'text',
              label: "course Name",
              required: true,
              options: this.courseDetails ? this.courseDetails.map(course => ({ label: course.CourseName
                , value: course.CourseId })) : [],
              // options: [
              //   { value: 'tally', label: 'tally' },
              //   { value: 'cpat', label: 'cpat' }
              //
            },
            },
,
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
            // {
            //   key: 'InstallmentId',
            //   className: 'col-4',
            //   type: 'input',
            //   templateOptions: {
            //     placeholder: 'Installment ID',
            //     type: 'number',
            //     required: true,
            //   },
            // },
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
              }
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
            type: 'select',
            key: 'isActive',
            templateOptions: {
              placeholder: 'batch Status',
              type: 'text',
              label: "Status",
              required: true,
              options: [
                { value: 'true', label: 'active' },
                { value: 'false', label: 'inacative' }
              ]
             },
            },
          // {
          //   className: 'col-md-4',
          //   type: 'input',
          //   key: 'StartTime',
          //   templateOptions: {
          //     placeholder: 'HH:MM AM/PM',
          //     required: true,
          //     label: "Start Time",
          //   },
          // },
          // {
          //   className: 'col-md-4',
          //   type: 'input',
          //   key: 'EndTime',
          //   templateOptions: {
          //     placeholder: 'HH:MM AM/PM',
          //     required: true,
          //     label: "End Time",
          //   },
          // },
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
      this.insertBatch();
    } else {
      this.alertService.ShowErrorMessage('Please fill in all required fields.');
    }
  }
  insertBatch() {

    console.log(this.batchDetails);
    console.log(this.installmentModel)
    this.addbatchService.insertBatchData(this.batchDetails).subscribe(
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
        totalInstallments += element.amount || 0;
      });
      this.batchDetails.courseFeesInstallment = totalInstallments;
      this.form.get('CourseFeesinInstallment').setValue(totalInstallments);
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

  
  getCourseDetails() {
    this.addbatchService.getcourseList().subscribe(
      (data: any) => {
        this.courseDetails = data.Value;
        this.setParameter();  
      },
      (error: any) => {
        this.alertService.ShowErrorMessage(error);
      }
    );
  }

}
