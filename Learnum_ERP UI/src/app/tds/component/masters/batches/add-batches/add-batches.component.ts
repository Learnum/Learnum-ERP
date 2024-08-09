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
              pattern: "^[A-Za-z]+( [A-Za-z]+)*$",
            },
            validation: {
              messages: {
                required: 'BatchName is required',
                pattern: "Please enter a valid BatchName"
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
              options: this.branchDetails ? this.branchDetails.map(branch => ({ label: branch.BranchName, value: branch.BranchId })) : [],
            },

          },
          {
            className: 'col-md-3',
            type: 'select',
            key: 'ClassroomId',
            props: {
              placeholder: 'Classroom Name',
              type: 'text',
              label: "Classroom Name",
              required: true,
              options: this.classroomDetails ? this.classroomDetails.map(classroom => ({
                label: classroom.ClassroomName, value: classroom.ClassroomId
              })) : [],

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
              placeholder: 'Select',
              type: 'text',
              label: "Course Name",
              required: true,
              options: this.courseDetails ? this.courseDetails.map(course => ({ label: course.CourseName, value: course.CourseId })) : [],
            },
          },
          {
            className: 'col-md-3',
            type: 'input',
            key: 'CourseFeesInstallment',
            templateOptions: {
              placeholder: '₹',
              required: true,
              label: "Course Fees in Installment",
              pattern: '^[0-9]+(\\.[0-9]{1,2})?$',
              inputMode: 'numeric', 
              min: 0, 
              step: 0.01,
            },
            validation: {
              messages: {
                required: 'Please enter the course fees',
                pattern: 'Please enter a valid amount',
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
              pattern: '^[0-9]+(\\.[0-9]{1,2})?$', 
              inputMode: 'numeric', 
              min: 0, 
              step: 0.01,
            },
            validation: {
              messages: {
                required: 'Please enter the  One Time course fees',
                pattern: 'Please enter a valid amount',
              },
            },
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
                { value: null, label: 'Select Batch Status', disabled: true },  // Disabled placeholder option
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
    this.router.navigateByUrl('tds/masters/batches');
  }

  navigate()
  {
    this.router.navigateByUrl('tds/masters/batches');

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
          this.batchDetails = result.Value.Item1;
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
