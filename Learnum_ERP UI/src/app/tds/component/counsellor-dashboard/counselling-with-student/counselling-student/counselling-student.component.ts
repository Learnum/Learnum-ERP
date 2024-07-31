import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { AlertService } from 'src/app/core/services/alertService';
import { MessageService } from 'src/app/core/services/message.service';
import { FormGroup, FormBuilder,Validators, AbstractControl } from '@angular/forms';
import { StudentcounsellingService } from './studentcounselling.service';
import { ResponseCode } from 'src/app/core/models/responseObject.model';
import { StudentCounsellingDetails } from './studentcounselling.model';
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
  studentDetails:any;
  branchDetails: any;
  editData: any;


  constructor(
    private router: Router,
    private alertService: AlertService,
    private messageService: MessageService,
    private activateRoute: ActivatedRoute,
    private studentcounsellingService:StudentcounsellingService
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
              placeholder: 'Student Name',
              type: 'text',
              label: "Student Name",
              required: true,
              options: this.studentDetails ? this.studentDetails.map(college => ({ label: college.StudentName, value: college.StudentId })) : [],
            },
          },
          {
            className: 'col-md-3',
            key: 'Phone',
            type: 'input',
            props: {
              label: 'Phone',
              placeholder: 'Enter Phone Number',
              type: 'tel',
              required: true,
              pattern: '^[0-9]+$',
            },
            validation: {
              messages: {
                required: 'Phone is required',
                pattern: 'Please Enter Valid Phone Number',
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
            },
            validation: {
              messages: {
                required: 'Counselling Time is required',
              },
            },
          },
          {
            className: 'col-md-3',
            key: 'CounsellingStatus',
            type: 'select',
            props: {
              label: 'Counselling Status',
              placeholder: 'Select Counselling Status',
              required: true,
              options: [
                { value: 'qualified', label: 'Qualified' },
                { value: 'notQualified', label: 'Not Qualified' },
                { value: 'jnnkLead', label: 'Jnnk Lead' },
                { value: 'notInterested', label: 'Not Interested' },
                { value: 'willJoinInFuture', label: 'Will Join in Future' },
                { value: 'needToTalkWithParents', label: 'Need to Talk With Parents' },
              ],
            },
            validation: {
              messages: {
                required: 'Counselling Status is required',
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
            className: 'col-md-6',
            key: 'CounsellingConversation',
            type: 'textarea',
            props: {
              label: 'Counselling Conversation',
              placeholder: 'Enter Counselling Conversation',
              required: true,
              rows: 5,
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
    this.router.navigateByUrl('tds/counsellor-dashboard/counselling-with-student');
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
