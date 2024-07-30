import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { AlertService } from 'src/app/core/services/alertService';
import { MessageService } from 'src/app/core/services/message.service';
import { CounsellorsPlaningModel } from './addcounsellor.model';
import { AddcounsellorService } from './addcounsellor.service';
import { ResponseCode } from 'src/app/core/models/responseObject.model';

@Component({
  selector: 'app-add-counsellor',
  templateUrl: './add-counsellor.component.html',
  styleUrls: ['./add-counsellor.component.scss']
})
export class AddCounsellorComponent implements OnInit {
  form = new FormGroup({});
  CounsellorDetails: CounsellorsPlaningModel = new CounsellorsPlaningModel();

  fields: FormlyFieldConfig[];
  options: FormlyFormOptions = {};
  editData: any;
  coOwners: any;
  NowDate: any = new Date();
  branchDetails: any;

  constructor(
    private addcounsellorService: AddcounsellorService,
    private router: Router,
    private alertService: AlertService,
    private messageService: MessageService,
    private activateRoute: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.setParameter();
    this.getBranchDetails();

    this.editData = this.activateRoute.snapshot.queryParams;
    if (this.editData.source === 'edit' && this.editData.CounsellorId) {
      this.getCounsellorDetails(this.editData.CounsellorId);
    }
  }

  setParameter() {
    this.fields = [
      {
        fieldGroupClassName: 'row card-body p-2',
        fieldGroup: [

          {
            key: 'CounsellorId'

          },


          {
            className: 'col-md-3',
            type: 'input',
            key: 'CounsellorName',
            templateOptions: {
              placeholder: 'Counsellor Name',
              label: "Counsellor Name",
              required: true,
              pattern: '^[A-Za-z]+$',
              title: 'Only characters are allowed',
              },
              validation: {
                messages: {
                  required: 'Name is required',
                  pattern: 'Please enter a valid name ',
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
            key: 'IsActive',
            templateOptions: {
              placeholder: 'Select Status',
              type: 'text',
              label: "Status",
              required: true,
              options: [
                { value: true, label: 'Active' },
                { value: false, label: 'Inactive' }
              ]
             },
            },
        ],
      },
    ]
  }

  onCancleClick() {
    this.router.navigateByUrl('tds/hrd/counsellor');
  }

  get f() {
    return this.form.controls;
  }

  onSubmit(): void {

    this.form.markAllAsTouched();
    if (this.form.valid) {
   this.insertBranchCounsellor();
    }
    else {
      this.alertService.ShowErrorMessage('Please fill in all required fields.');
    }
  }

  getBranchDetails() {
    this.addcounsellorService.getBranchList().subscribe(
      (data: any) => {
        this.branchDetails = data.Value;
        this.setParameter();  
      },
      (error: any) => {
        this.alertService.ShowErrorMessage(error);
      }
    );
  }

  insertBranchCounsellor() {
    this.CounsellorDetails.addedBy = 1;
    this.CounsellorDetails.addedDate = new Date();
    this.CounsellorDetails.updatedBy = 1;
    this.CounsellorDetails.updatedDate = new Date();
    //this.CounsellorDetails.counsellorId = 0;

    this.addcounsellorService.insertcounsellorData(this.CounsellorDetails).subscribe(
      (result: any) => {
        let serviceResponse = result.Value
        if (result.Value === ResponseCode.Success) {
          this.alertService.ShowSuccessMessage(this.messageService.savedSuccessfully);
          this.router.navigateByUrl('tds/hrd/counsellor');

        }
        else if (serviceResponse == ResponseCode.Update) {
          this.alertService.ShowSuccessMessage(this.messageService.updateSuccessfully);
          this.router.navigateByUrl('tds/hrd/counsellor');
        }
        else {
          this.alertService.ShowErrorMessage(this.messageService.serviceError);
        }
      },
      (error: any) => {
        this.alertService.ShowErrorMessage("Enter all required fields");
      }
    )
    
  }


  getCounsellorDetails(CounsellorId: number) {
    this.addcounsellorService.getCounsellorDetails(CounsellorId).subscribe(
      (result: any) => {
        if (result && result.Value) {
          this.CounsellorDetails = result.Value.Item1;

          this.setParameter();
          console.error('No data found for CounsellorId: ' + CounsellorId);
        }
      },
      (error: any) => {
        console.error('Error retrieving Counsellor ID details:', error);

      }
    );
  }
}
