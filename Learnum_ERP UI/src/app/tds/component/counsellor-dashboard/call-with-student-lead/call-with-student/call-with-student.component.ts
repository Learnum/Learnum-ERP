import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { AlertService } from 'src/app/core/services/alertService';
import { MessageService } from 'src/app/core/services/message.service';
import { FormGroup, FormBuilder,Validators, AbstractControl } from '@angular/forms';
import { StudentcallsService } from './studentcalls.service';
import { StudentLeadcalls } from './studentcalls.model';
import { ResponseCode } from 'src/app/core/models/responseObject.model';
@Component({
  selector: 'app-call-with-student',
  templateUrl: './call-with-student.component.html',
  styleUrls: ['./call-with-student.component.scss']
})
export class CallWithStudentComponent implements OnInit {

  studentLeadcalls:StudentLeadcalls = new StudentLeadcalls();
  form = new FormGroup({});
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[];
  studentDetails:any;
  branchDetails: any;
  editData: any;

  constructor(
    private router: Router,
    private alertService: AlertService,
    private messageService: MessageService,
    private activateRoute: ActivatedRoute,
    private studentcallsService:StudentcallsService) { }

  ngOnInit(): void {
    this.setParameter();
    this.getStudentCallDetails();
    this.getBranchDetails();
    this.editData = this.activateRoute.snapshot.queryParams;
    if (this.editData.source === 'edit' && this.editData.CallId) {
      this.getCallDetails(this.editData.CallId);
    }
  }

  setParameter() {
    this.fields = [
      {
        fieldGroupClassName: 'row card-body p-2',
        fieldGroup: [
          {
            key:'callId',
          },
          {
            className: 'col-md-3',
            type: 'select',
            key: 'StudentId',
            templateOptions: {
              label: "Student Name",
             // placeholder: 'Select Student Name',  // Placeholder for the dropdown
              required: true,
              options: [
                { value: null, label: 'Select Student Name', disabled: true },  // Disabled placeholder option
                ...this.studentDetails ? this.studentDetails.map(student => ({ label: student.StudentName, value: student.StudentId })) : [],
              ]
            },
            defaultValue: null,  // Optional: set a default value if needed
            validators: {
              required: {
                expression: (c: AbstractControl) => c.value !== null && c.value !== '', // Ensure a valid value is selected
                message: 'Student Name is required',
              },
            },
            validation: {
              messages: {
                required: 'Student Name is required',
              },
            },
          }
          ,
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
            key: 'PhoneCallDate',
            type: 'input',
            props: {
              label: 'Phone Call Date',
              placeholder: 'Select Phone Call Date',
              type: 'date',
              required: true,
            },
            validation: {
              messages: {
                required: 'Phone Call Date is required',
              },
            },
          },
          {
            className: 'col-md-3',
            key: 'PhoneCallTime',
            type: 'input',
            props: {
              label: 'Phone Call Time',
              placeholder: 'Select Phone Call Time',
              type: 'time',
              required: true,
            },
            validation: {
              messages: {
                required: 'Phone Call Time is required',
              },
            },
          },
          // {
          //   className: 'col-md-3',
          //   type: 'select',
          //   key: 'BranchId',
          //   templateOptions: {
          //     placeholder: 'Branch Name',
          //     type: 'text',
          //     label: "Branch Name",
          //     required: true,
          //     options: this.branchDetails ? this.branchDetails.map(branch => ({ label: branch.BranchName, value: branch.BranchId })) : [],
          //   },

          // },
          {
            className: 'col-md-3',
            type: 'select',
            key: 'BranchId',
            templateOptions: {
              label: "Branch Name",
            //  placeholder: 'Select Branch Name',  // Placeholder for the dropdown
              required: true,
              options: [
                { value: null, label: 'Select Branch Name', disabled: true },  // Disabled placeholder option
                ...this.branchDetails ? this.branchDetails.map(branch => ({ label: branch.BranchName, value: branch.BranchId })) : [],
              ]
            },
            defaultValue: null,  // Optional: set a default value if needed
            validators: {
              required: {
                expression: (c: AbstractControl) => c.value !== null && c.value !== '', // Ensure a valid value is selected
                message: 'Branch Name is required',
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
            key: 'LeadStatus',
            templateOptions: {
              label: 'Lead Status',
             // placeholder: 'Select Lead Status',
              required: true,
              options: [
                { value: null, label: 'Select Lead Status', disabled: true }, // Disabled placeholder option
                { value: 'notConnected', label: 'Not Connected' },
                { value: 'connectInFuture', label: 'Connect In Future' },
                { value: 'junkLead', label: 'Junk Lead' },
                { value: 'prequalified', label: 'Prequalified' },
                { value: 'notQualified', label: 'Not Qualified' },
                { value: 'needCounselling', label: 'Need Counselling' },
                { value: 'needToTalkToParents', label: 'Need To Talk To Parents' },
              ],
            },
            defaultValue: null,
            validators: {
              required: {
                expression: (c: AbstractControl) => c.value !== null && c.value !== '', // Ensure a valid value is selected
                message: 'Lead Status is required',
              },
            },
            validation: {
              messages: {
                required: 'Lead Status is required',
              },
            },
          }
          ,
          {
            className: 'col-md-6',
            key: 'CallConversation',
            type: 'textarea',
            props: {
              label: 'Call Conversation',
              placeholder: 'Enter Call Conversation',
              required: true,
              rows:5
            },
            validation: {
              messages: {
                required: 'Call Conversation is required',
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
      this.InsertStudentCall();
    } else {
      this.alertService.ShowErrorMessage('Please fill in all required fields.');
    }
  }
  onCancleClick() {
    this.router.navigateByUrl('tds/counsellor-dashboard/call-with-student-lead');
  }
  onResetClick() {
    this.form.reset();
  }
  InsertStudentCall() {
    this.studentLeadcalls.addedBy = 1;
    this.studentLeadcalls.addedDate = new Date();
    this.studentLeadcalls.updatedBy = 1;
    this.studentLeadcalls.updatedDate = new Date();
    //this.studentLeadcalls.callId = 0;

    this.studentcallsService.insertStudentCallDetails(this.studentLeadcalls).subscribe(
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
    this.router.navigateByUrl('tds/counsellor-dashboard/call-with-student-lead');
  }
  getStudentCallDetails() {
    this.studentcallsService.getStudentLeads().subscribe(
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
    this.studentcallsService.getBranchList().subscribe(
      (data: any) => {
        this.branchDetails = data.Value;
        this.setParameter();  
      },
      (error: any) => {
        this.alertService.ShowErrorMessage(error);
      }
    );
  }

  getCallDetails(CallId: number) {
    this.studentcallsService.getStudentDetails(CallId).subscribe(
      (result: any) => {
        if (result && result.Value) {
          this.studentLeadcalls = result.Value.Item1;
          this.setParameter();
          console.error('No data found for CallId: ' + CallId);
        }
      },
      (error: any) => {
        console.error('Error retrieving call details:', error);
      }
    );
  }

}
