import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { AlertService } from 'src/app/core/services/alertService';
import { MessageService } from 'src/app/core/services/message.service';
import { FormGroup, FormBuilder,Validators, AbstractControl } from '@angular/forms';
import { StudentcounsellingService } from './studentcounselling.service';
import { ResponseCode } from 'src/app/core/models/responseObject.model';
import { StudentCounsellingDetails } from './studentcounselling.model';
import { formatDate } from '@angular/common';
import { BaseService } from 'src/app/core/services/baseService';

@Component({
  selector: 'app-counselling-student',
  templateUrl: './counselling-student.component.html',
  styleUrls: ['./counselling-student.component.scss']
})
export class CounsellingStudentComponent implements OnInit {

  studentCounsellingDetails:StudentCounsellingDetails = new StudentCounsellingDetails();
  form = new FormGroup({});
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[];
  NowDate: any = new Date();
  studentDetails:any;
  branchDetails: any;
  editData: any;


  constructor(
    private router: Router,
    private alertService: AlertService,
    private messageService: MessageService,
    private activateRoute: ActivatedRoute,
    private studentcounsellingService:StudentcounsellingService,
    private baseservice: BaseService

  ) { }

  ngOnInit(): void {
    this.setParameter();
    this.getStudentCallDetails();
    this.getBranchDetails();
    this.editData = this.activateRoute.snapshot.queryParams;
    if (this.editData.source === 'edit' && this.editData.CounsellingId) {
      this.getStudentCounsellingDetails(this.editData.CounsellingId);
    }
  }

  setParameter() {
    this.fields = [
      {
        fieldGroupClassName: 'row card-body p-2',
        fieldGroup: [
          {
            className: 'col-md-3',
            type: 'select',
            key: 'StudentId',
            templateOptions: {
              label: 'Student Name',
              required: true,
              options: [
                { label: 'Select Student Name', value: '', disabled: true },
                ...this.studentDetails ? this.studentDetails.map(student => ({ label: student.StudentName, value: student.StudentId })) : []
              ],
            },
          },
          // {
          //   className: 'col-md-3',
          //   type: 'select',
          //   key: 'StudentId',
          //   templateOptions: {
          //     label: 'Student Name',
          //    placeholder: 'Select Student Name',
          //     required: true,
          //     options: this.studentDetails ? this.studentDetails.map(student => ({ label: student.StudentName, value: student.StudentId })) : [],
          //   },
          //   defaultValue: '',  
          //   validators: {
          //     required: {
          //       expression: (c: AbstractControl) => c.value !== null && c.value !== '', // Ensure a valid value is selected
          //       message: 'Student Name is required',
          //     },
          //   },
          //   validation: {
          //     messages: {
          //       required: 'Student Name is required',
          //     },
          //   },
          // },
          
          
          {
            className: 'col-md-3',
            key: 'Phone',
            type: 'input',
            templateOptions: {
              label: 'Phone Number',
              placeholder: 'Enter Phone Number',
              required: true,
              maxLength: 10,
              minLength: 10,
            },
            hooks: {
              onInit: (field) => {
                field.formControl.valueChanges.subscribe(value => {
                  const sanitizedValue = value.replace(/[^0-9]/g, '');
                  if (sanitizedValue !== value) {
                    field.formControl.setValue(sanitizedValue, { emitEvent: false });
                  }
                });
              },
            },
            validators: {
              phoneNumber: {
                expression: (c: AbstractControl) => {
                  const value = c.value;
                  // Ensure the value is exactly 10 digits long
                  return value && /^[0-9]{10}$/.test(value);
                },
                message: (error: any, field: FormlyFieldConfig) => {
                  return `"${field.formControl.value}" is not a valid 10-digit phone number`;
                },
              },
            },
            validation: {
              messages: {
                required: 'Phone Number is required',
                phoneNumber: 'The phone number must contain only numbers and be exactly 10 digits long',
              },
            },
          },
          {
            className: 'col-md-3',
            key: 'CounsellingDate',
            type: 'input',
            props: {
              label: 'Counselling Date',
              placeholder: 'Select Counselling Date',
              type: 'date',
              required: true,
              attributes: {
                min: formatDate(new Date(), 'yyyy-MM-dd', 'en-IN'), 
              },
            },
            validation: {
              messages: {
                required: 'Counselling Date is required',
              },
            },
          },
          {
            className: 'col-md-3',
            key: 'CounsellingTime',
            type: 'input',
            props: {
              label: 'Counselling Time',
              placeholder: 'Select Counselling Time',
              type: 'time',
              required: true,
              defaultValue: '12:00',
            },
            validators: {
              timeValidation: {
                expression: (control: AbstractControl) => control.value !== '00:00', // Custom validation to block '00:00'
                message: '00:00 is not a valid time. Please select a different time.',
              },
            },
            validation: {
              messages: {
                required: 'Counselling Time is required',
              },
            },
          },
          {
            className: 'col-md-3',
            type: 'select',
            key: 'CounsellingStatus',
            templateOptions: {
              label: 'Counselling Status',
              //placeholder: 'Select Counselling Status',
              required: true,
              options: [
                { value: null, label: 'Select Counselling Status', disabled: true }, // Disabled placeholder option
                { value: 'qualified', label: 'Qualified' },
                { value: 'notQualified', label: 'Not Qualified' },
                { value: 'junkLead', label: 'Junk Lead' }, // Corrected spelling from 'jnnkLead' to 'junkLead'
                { value: 'notInterested', label: 'Not Interested' },
                { value: 'willJoinInFuture', label: 'Will Join in Future' },
                { value: 'needToTalkWithParents', label: 'Need to Talk With Parents' },
              ],
            },
            defaultValue: null,  
            validators: {
              required: {
                expression: (c: AbstractControl) => c.value !== null && c.value !== '', // Ensure a valid value is selected
                message: 'Counselling Status is required',
              },
            },
            validation: {
              messages: {
                required: 'Counselling Status is required',
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
          }
          ,
          {
            className: 'col-md-3',
            key: 'CounsellingConversation',
            type: 'textarea',
            props: {
              label: 'Counselling Conversation',
              placeholder: 'Enter Counselling Conversation',
              required: true,
              attributes: {
                style: 'overflow:hidden; resize:none;',
                oninput: "this.style.height = 'auto'; this.style.height = this.scrollHeight + 'px';"
              }
            },
            validation: {
              messages: {
                required: 'Counselling Conversation is required',
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
      this.InsertstudentcounsellingData();
    } else {
      this.alertService.ShowErrorMessage('Please fill in all required fields.');
    }
  }

  onCancleClick() {
    this.router.navigateByUrl('tds/counsellor-dashboard/counselling-with-student');
  }
  onResetClick() {
    this.form.reset();
  }
  InsertstudentcounsellingData() {
    this.studentCounsellingDetails.addedBy = 1;
    this.studentCounsellingDetails.addedDate = new Date();
    this.studentCounsellingDetails.updatedBy = 1;
    this.studentCounsellingDetails.updatedDate = new Date();
   // this.studentCounsellingDetails.counsellingId = 0;

    this.studentcounsellingService.insertStudentCounsellingDetails(this.studentCounsellingDetails).subscribe(
      (result: any) => {
        const serviceResponse = result.Value;
        if (serviceResponse === ResponseCode.Success) {
          this.alertService.ShowSuccessMessage(this.messageService.savedSuccessfully);
          this.router.navigateByUrl('tds/counsellor-dashboard/counselling-with-student');

        } else if (serviceResponse === ResponseCode.Update) {
          this.alertService.ShowSuccessMessage(this.messageService.updateSuccessfully);
          this.router.navigateByUrl('tds/counsellor-dashboard/counselling-with-student');

        } else {
          this.alertService.ShowErrorMessage(this.messageService.serviceError);
        }
      },
      (error: any) => {
        this.alertService.ShowErrorMessage(error);
      }
    );
  }
  getStudentCallDetails() {
    this.studentcounsellingService.getStudentLeads().subscribe(
      (data: any) => {
        this.studentDetails = data.Value;
        this.setParameter();  
      },
      (error: any) => {
        this.alertService.ShowErrorMessage(error);
      }
    );
  }
  getBranchDetails() {
    this.studentcounsellingService.getBranchList().subscribe(
      (data: any) => {
        this.branchDetails = data.Value;
        this.setParameter();  
      },
      (error: any) => {
        this.alertService.ShowErrorMessage(error);
      }
    );
  }
	getStudentCounsellingDetails(CounsellingId: number) {
    this.studentcounsellingService.getStudentCounsellingList(CounsellingId).subscribe(
      (result: any) => {
        if (result && result.Value) {
          this.studentCounsellingDetails = result.Value.Item1;

          this.studentCounsellingDetails.CounsellingDate = this.baseservice.formatDate(this.studentCounsellingDetails.CounsellingDate);
          
          this.studentCounsellingDetails.CounsellingTime = this.baseservice.extractTime(this.studentCounsellingDetails.CounsellingTime);

          this.setParameter();
          console.error('No data found for CounsellingId: ' + CounsellingId);
        }
      },
      (error: any) => {
        console.error('Error retrieving StudentCounselling details:', error);
      }
    );
  }
  

}
