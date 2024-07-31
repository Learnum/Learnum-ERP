import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { AlertService } from 'src/app/core/services/alertService';
import { MessageService } from 'src/app/core/services/message.service';
import { FormGroup, FormBuilder,Validators, AbstractControl } from '@angular/forms';
import { StudentleadsService } from './studentleads.service';
import { StudentLeadDetails } from './studentleads.model';
import { ResponseCode } from 'src/app/core/models/responseObject.model';
@Component({
  selector: 'app-add-student-leads',
  templateUrl: './add-student-leads.component.html',
  styleUrls: ['./add-student-leads.component.scss']
})
export class AddStudentLeadsComponent implements OnInit {

  studentLeadDetails:StudentLeadDetails = new StudentLeadDetails();
  form = new FormGroup({});
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[];
  branchDetails: any;
  collegeDetails: any;
  editData: any;


  constructor(
    private router: Router,
    private alertService: AlertService,
    private messageService: MessageService,
    private activateRoute: ActivatedRoute,
    private studentleadsService:StudentleadsService) { }

  ngOnInit(): void {
    this.setParameter();
    this.getBranchDetails();
    this.getCollegeDetails();
    this.editData = this.activateRoute.snapshot.queryParams;
    if (this.editData.source === 'edit' && this.editData.StudentId) {
      this.getStudentDetails(this.editData.StudentId);
    }
  }

  setParameter() {
    this.fields = [
      {
        fieldGroupClassName: 'row card-body p-2',
        fieldGroup: [
          {
            key:'studentId',
          },
          {
            className: 'col-md-3',
            key: 'StudentName',
            type: 'input',
            props: {
              label: 'Student Name',
              placeholder: 'Enter Student Name',
              type: 'text',
              required: true,
              pattern: '^[A-Za-z]+$',
            },
            validation: {
              messages: {
                required: 'Student Name is required',
                pattern: 'Please Enter Student FullName',
              },
            },
          },
          {
            className: 'col-md-3',
            type: 'select',
            key: 'CollegeId',
            templateOptions: {
              placeholder: 'College Name',
              type: 'text',
              label: "College Name",
              required: true,
              options: this.collegeDetails ? this.collegeDetails.map(college => ({ label: college.CollegeName, value: college.CollegeId })) : [],
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
            key: 'StudentPhone',
            type: 'input',
            props: {
              label: 'Student Phone',
              placeholder: 'Enter Student Phone',
              type: 'number',
              required: true,
            },
            validation: {
              messages: {
                required: 'Student Phone is required',
                type:'Please Enter Valid Number',
              },
            },
          },
          {
            className: 'col-md-3',
            key: 'ParentPhone',
            type: 'input',
            props: {
              label: "Parent's Phone",
              placeholder: "Enter Parent's Phone",
              required: true,
              type: 'number',
            },
            validation: {
              messages: {
                required: "Parent's Phone is required",
                type:'Please Enter Valid Number',
              },
            },
          },
          {
            className: 'col-md-3',
            key: 'Address',
            type: 'input',
            props: {
              label: 'Address',
              placeholder: 'Enter Address',
              type: 'text',
              required: true,
              pattern: '^[A-Za-z]+$',
            },
            validation: {
              messages: {
                required: 'Address is required',
                pattern: 'Please Enter Full Address',
              },
            },
          },
          {
            className: 'col-md-3',
            key: 'City',
            type: 'input',
            props: {
              label: 'City / District',
              placeholder: 'Enter City',
              type:'text',
              pattern: '^[A-Za-z]+$',
              required: true,
            },
            validation: {
              messages: {
                required: 'City is required',
                pattern: 'Please Enter City',
              },
            },
          },
          {
            className: 'col-md-3',
            key: 'State',
            type: 'input',
            props: {
              label: 'State',
              placeholder: 'Enter State',
              required: true,
              type:'text',
              pattern: '^[A-Za-z]+$',
            },
            validation: {
              messages: {
                required: 'State is required',
                pattern: 'Please Enter State',
              },
            },
          },
          {
            className: 'col-md-3',
            key: 'PostalCode',
            type: 'input',
            props: {
              label: 'PostalCode',
              placeholder: 'Enter PostalCode',
              required: true,
              pattern: '^[0-9]+$',
              type:'number'
            },
            validation: {
              messages: {
                required: 'PostalCode is required',
                pattern: 'Please Enter Valid Pincode',
              },
            },
          },
          {
            className: 'col-md-3',
            key: 'LeadSource',
            type: 'select',
            props: {
              label: 'Lead Source',
              placeholder: 'Select Lead Source',
              required: true,
              options: [
                { value: 'collegeSeminar', label: 'College Seminar' },
                { value: 'friends', label: 'Friends' },
                { value: 'mailCampaign', label: 'Mail Campaign' },
                { value: 'onlineAd', label: 'Online Ad' },
                { value: 'direct', label: 'Direct' },
                { value: 'family', label: 'Family' },
                { value: 'other', label: 'Other' },
              ],
            },
            validation: {
              messages: {
                required: 'Lead Source is required',
              },
            },
          },
          {
            className: 'col-md-3',
            key: 'StudentEmail',
            type: 'input',
            props: {
              label: 'Student Email',
              placeholder: 'Enter Student Email',
              required: true,
            },
            validation: {
              messages: {
                required: 'Student Email is required',
              },
            },
          },
          {
            className: 'col-md-3',
            key: 'Education',
            type: 'select',
            props: {
              label: 'Education',
              placeholder: 'Select Education Level',
              required: true,
              options: [
                { value: 'FYBcom', label: 'F.Y.Bcom' },
                { value: 'SYBcom', label: 'S.Y.Bcom' },
                { value: 'TYBcom', label: 'T.Y.Bcom' },
                { value: 'Bcom', label: 'B.com' },
                { value: '11th', label: '11th' },
                { value: '12th', label: '12th' },
                { value: 'Mcom', label: 'M.com' },
                { value: 'MBA', label: 'MBA' },
                { value: 'BBA', label: 'BBA' },
                { value: 'BCA', label: 'BCA' },
                { value: 'BCS', label: 'BCS' },
                { value: 'BSC', label: 'BSC' },
                { value: 'other', label: 'Other' },
              ],
            },
            validation: {
              messages: {
                required: 'Education Level is required',
              },
            },
          },
          {
            className: 'col-md-3',
            key: 'Gender',
            type: 'select',
            props: {
              label: 'Gender',
              placeholder: 'Select Gender',
              required: true,
              options: [
                { value: 'male', label: 'Male' },
                { value: 'female', label: 'Female' },
                { value: 'other', label: 'Other' },
              ],
            },
            validation: {
              messages: {
                required: 'Gender is required',
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
      this.InsertStudentLeads();
    } else {
      this.alertService.ShowErrorMessage('Please fill in all required fields.');
    }
  }
  onCancleClick() {
    this.router.navigateByUrl('tds/counsellor-dashboard/student-leads');
  }
  onResetClick() {
    this.form.reset();
  }
  
  InsertStudentLeads() {
    this.studentLeadDetails.addedBy = 1;
    this.studentLeadDetails.addedDate = new Date();
    this.studentLeadDetails.updatedBy = 1;
    this.studentLeadDetails.updatedDate = new Date();
    //this.studentLeadDetails.studentId = 0;

    this.studentleadsService.insertStudentLeads(this.studentLeadDetails).subscribe(
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
    this.router.navigateByUrl('tds/counsellor-dashboard/student-leads');
  }

  getBranchDetails() {
    this.studentleadsService.getBranchList().subscribe(
      (data: any) => {
        this.branchDetails = data.Value;
        this.setParameter();  
      },
      (error: any) => {
        this.alertService.ShowErrorMessage(error);
      }
    );
  }
  getCollegeDetails() {
    this.studentleadsService.getCollegeList().subscribe(
      (data: any) => {
        this.collegeDetails = data.Value;
        this.setParameter();
      },
      (error: any) => {
        this.alertService.ShowErrorMessage(error);
      }
    );
  }
  getStudentDetails(StudentId: number) {
    this.studentleadsService.getStudentDetails(StudentId).subscribe(
      (result: any) => {
        if (result && result.Value) {
          this.studentLeadDetails = result.Value.Item1;
          this.setParameter();
          console.error('No data found for StudentId: ' + StudentId);
        }
      },
      (error: any) => {
        console.error('Error retrieving student details:', error);
      }
    );
  }
}
