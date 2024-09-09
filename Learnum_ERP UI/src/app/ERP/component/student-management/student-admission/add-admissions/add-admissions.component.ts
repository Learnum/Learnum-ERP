import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { AlertService } from 'src/app/core/services/alertService';
import { MessageService } from 'src/app/core/services/message.service';
import { FormGroup, FormBuilder,Validators, AbstractControl } from '@angular/forms';
import { AdmissionService } from './admission.service';
import { StudentAdmissionsModel } from './addadmission.model';
import { ResponseCode } from 'src/app/core/models/responseObject.model';

@Component({
  selector: 'app-add-admissions',
  templateUrl: './add-admissions.component.html',
  styleUrls: ['./add-admissions.component.scss']
})
export class AddAdmissionsComponent implements OnInit {

  studentAdmissionsModel:StudentAdmissionsModel=new StudentAdmissionsModel();
  form = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[];
  branchDetails: any;
  courseDetails: any;
  batchesDetails:any;
  studentDetails : any;

  constructor(
    private router: Router,
    private admissionService : AdmissionService,
    private alertService: AlertService,
    private messageService: MessageService,
    private activateRoute: ActivatedRoute,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.setParameter();
    this.getBranchDetails();
    this.getCourseDetails();
    this.getAddStudentDetails();
  }

  setParameter() {
    this.fields = [
      {
        fieldGroupClassName: 'row card-body p-2',
        fieldGroup: [
          {
            className: 'col-md-4',
            key: 'dateOfAdmission',
            type: 'input',
            props: {
              label: 'Date of Admission',
              placeholder: 'Select Date',
              type: 'date',
              required: true,
            },
            validation: {
              messages: {
                required: 'Date of Admission is required',
              },
            },
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
            className: 'col-md-4',
            key: 'BatchId',
            type: 'select',
            props: {
              label: 'Batch Name',
              placeholder: 'Enter Batch Name',
              type: 'text',
              required: true,
              options: this.batchesDetails ? this.batchesDetails.map(batch => ({ label: batch.BatchName, value: batch.BatchId })) : [],
            },
            validation: {
              messages: {
                required: 'Batch Name is required',
              },
            },
          },
          {
            className: 'col-md-4',
            key: 'feesType',
            type: 'select',
            props: {
              label: 'Fees Type',
              placeholder: 'Select Fees Type',
              required: true,
              options: [
                { value: 'installments', label: 'Installments' },
                { value: 'oneTime', label: 'One Time' }
              ],
            },
            validation: {
              messages: {
                required: 'Fees Type is required',
              },
            },
          },
          {
            className: 'col-md-4',
            key: 'courseFees',
            type: 'input',
            props: {
              label: 'Course Fees',
              placeholder: 'Enter Course Fees',
              type: 'number',
              required: true,
            },
            validation: {
              messages: {
                required: 'Course Fees is required',
              },
            },
          },
          {
            className: 'col-md-4',
            key: 'StudentId',
            type: 'select',
            props: {
              label: 'Student Name',
              placeholder: 'Enter Student Name',
              required: true,
              type: 'text',
              options: this.studentDetails ? this.studentDetails.map(student => ({ label: student.StudentName, value: student.StudentId })) : [],
            },
            validation: {
              messages: {
                required: 'Student Name is required',
              },
            },
            hooks: {
              onInit: (field) => {
                field.formControl.valueChanges.subscribe((StudentId) => {
                  this.getAddStudentDetailsByStudentId(StudentId);
                });
              }
            }
          },
          {
            className: 'col-md-4',
            key: 'StudentPhone',
            type: 'input',
            props: {
              label: 'Student Number',
              placeholder: 'Enter Student Number',
              text:'tel',
              required: true,
              pattern: '^[0-9]+$',
              type:'number',
              maxLength: 10,
            },
            validation: {
              messages: {
                required: 'Student Number is required',
                pattern: 'Enter a valid 10-digit phone number',
              },
            },
          },
          {
            className: 'col-md-4',
            key: 'IsActive',
            type: 'select',
            props: {
              label: 'Status',
              placeholder: 'Select Status',
              required: true,
              options: [
                { value: 'active', label: 'Active' },
                { value: 'inactive', label: 'Inactive' }
              ],
            },
            defaultValue: 'active', // Set the default value to 'active'
            validation: {
              messages: {
                required: 'Status is required',
              },
            },
          }
          
          // {
          //   className: 'col-md-4',
          //   key: 'IsActive',
          //   type: 'select',
          //   props: {
          //     label: 'Status',
          //     placeholder: 'Select Status',
          //     required: true,
          //     options: [
          //       { value: 'active', label: 'Active' },
          //       { value: 'inactive', label: 'Inactive' }
          //     ],
          //   },
          //   validation: {
          //     messages: {
          //       required: 'Status is required',
          //     },
          //   },
          // },
        ],
      },
    ];
  }

  onSubmit(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.insertStudentDetails();
    } else {
      this.alertService.ShowErrorMessage('Please fill in all required fields.');
    }
  }

  onCancelClick() {
    this.router.navigateByUrl('erp/student-management/student-admission');
  }
  getBranchDetails() {
    this.admissionService.getBranchList().subscribe(
      (data: any) => {
        this.branchDetails = data.Value;
        //this.setParameter();  
      },
      (error: any) => {
        this.alertService.ShowErrorMessage(error);
      }
    );
  }
  getCourseDetails() {
    this.admissionService.getCourseList().subscribe(
      (data: any) => {
        this.courseDetails = data.Value;
        this.setParameter();  
      },
      (error: any) => {
        this.alertService.ShowErrorMessage(error);
      }
    );
  }
  

  getBatchDetailsByBranchId(BranchId: number) {
    this.admissionService.getBatchDetailsByBranchId(BranchId).subscribe(
      (result: any) => {
        if (result && result.Value) {
          this.batchesDetails = result.Value.Item1;
          this.setParameter();
          // Update BatchId field options dynamically
          const batchField = this.fields.find(field => field.key === 'BatchId');
          if (batchField) {
            batchField.props.options = this.batchesDetails.map(batch => ({
              label: batch.BatchName,
              value: batch.BatchId,
            }));
          }

          // Trigger the form update to reflect the changes
          this.options.updateInitialValue();
        } else {
          console.error('No data found for BranchId: ' + BranchId);
        }
      },
      (error: any) => {
        console.error('Error retrieving batch details:', error);
      }
    );
  }
  getAddStudentDetails() {
    this.admissionService.getAddStudentList().subscribe(
      (data: any) => {
        this.studentDetails = data.Value;
        this.setParameter();  
      },
      (error: any) => {
        this.alertService.ShowErrorMessage(error);
      }
    );
  }
  getAddStudentDetailsByStudentId(StudentId: number) {
    this.admissionService.getAddStudentDetailsByStudentId(StudentId).subscribe(
      (result: any) => {
        if (result && result.Value) {
          const studentDetails = result.Value.Item1;
          if (studentDetails) {
            this.form.get('StudentPhone').patchValue(studentDetails.StudentPhone);
          } else {
            console.error('No data found for StudentId: ' + StudentId);
          }
        }
      },
      (error: any) => {
        console.error('Error retrieving student details:', error);
      }
    );
  }

  insertStudentDetails() {
    this.studentAdmissionsModel.addedBy = 1;
    this.studentAdmissionsModel.addedDate = new Date();
    this.studentAdmissionsModel.updatedBy = 1;
    this.studentAdmissionsModel.updatedDate = new Date();
    this.studentAdmissionsModel.admissionId =0;

    this.admissionService.insertStudentData(this.studentAdmissionsModel).subscribe(
      (result: any) => {
        const serviceResponse = result.Value;
        if (serviceResponse === ResponseCode.Success) {
          this.alertService.ShowSuccessMessage(this.messageService.savedSuccessfully);
        } else if (serviceResponse === ResponseCode.Update) {
          this.alertService.ShowSuccessMessage(this.messageService.updateSuccessfully);
        } else {
          this.alertService.ShowErrorMessage(this.messageService.serviceError);
        }
      },
      (error: any) => {
        this.alertService.ShowErrorMessage(error);
      }
    );
    this.router.navigateByUrl('erp/student-management');
  }
}
