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
            className: 'col-md-6',
            type: 'select',
            key: 'StudentId',
            templateOptions: {
              placeholder: 'Student Name',
              type: 'text',
              label: "Student Name",
              required: true,
              options: this.studentDetails ? this.studentDetails.map(college => ({ label: college.StudentName, value: college.StudentId })) : [],
            },
          },
          {
            className: 'col-md-6',
            key: 'Phone',
            type: 'input',
            props: {
              label: 'Phone',
              placeholder: 'Enter Phone Number',
              type: 'tel',
              required: true,
            },
            validation: {
              messages: {
                required: 'Phone is required',
              },
            },
          },
          {
            className: 'col-md-6',
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
            className: 'col-md-6',
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
          {
            className: 'col-md-6',
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
            className: 'col-md-6',
            key: 'LeadStatus',
            type: 'select',
            props: {
              label: 'Lead Status',
              placeholder: 'Select Lead Status',
              required: true,
              options: [
                { value: 'notConnected', label: 'Not Connected' },
                { value: 'connectInFuture', label: 'Connect In Future' },
                { value: 'junkLead', label: 'Junk Lead' },
                { value: 'prequalified', label: 'Prequalified' },
                { value: 'notQualified', label: 'Not Qualified' },
                { value: 'needCounselling', label: 'Need Counselling' },
                { value: 'needToTalkToParents', label: 'Need To Talk To Parents' },
              ],
            },
            validation: {
              messages: {
                required: 'Lead Status is required',
              },
            },
          },
          {
            //className: 'col-md-6',
            key: 'CallConversation',
            type: 'textarea',
            props: {
              label: 'Call Conversation',
              placeholder: 'Enter Call Conversation',
              required: true,
              rows:10
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
