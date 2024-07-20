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
  }

  setParameter() {
    this.fields = [
      {
        fieldGroupClassName: 'row card-body p-2',
        fieldGroup: [

          {
            className: 'col-md-4',
            type: 'select',
            key: 'CounsellorName',
            templateOptions: {
              placeholder: 'Select',
              label: "Counsellor Name",
              required: true,
              options: [
                { label: 'Amit', value: 'Amit' },
                { label: 'Aman', value: 'Aman' }
              ]
            }
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
            className: 'col-md-4',
            type: 'select',
            key: 'isActive',
            templateOptions: {
              placeholder: 'Enter Status',
              type: 'text',
              label: "Status",
              required: true,
              options: [
                { value: 'true', label: 'active' },
                { value: 'false', label: 'inacative' }
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
    this.insertBranchCounsellor();

  //   this.form.markAllAsTouched();
  //   if (this.form.valid) {
  //  this.insertBranchCounsellor();
  //   }
  //   else {
  //     this.alertService.ShowErrorMessage('Please fill in all required fields.');
  //   }
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
    this.CounsellorDetails.counsellorId = 0;

    this.addcounsellorService.insertcounsellorData(this.CounsellorDetails).subscribe(
      (result: any) => {
        let serviceResponse = result.Value
        if (result.Value === ResponseCode.Success) {
          this.alertService.ShowSuccessMessage(this.messageService.savedSuccessfully);

        }
        else if (serviceResponse == ResponseCode.Update) {
          this.alertService.ShowSuccessMessage(this.messageService.updateSuccessfully);
        }
        else {
          this.alertService.ShowErrorMessage(this.messageService.serviceError);
        }
      },
      (error: any) => {
        this.alertService.ShowErrorMessage("Enter all required fields");
      }
    )
    this.router.navigateByUrl('tds/hrd/counsellor');
  }
}
