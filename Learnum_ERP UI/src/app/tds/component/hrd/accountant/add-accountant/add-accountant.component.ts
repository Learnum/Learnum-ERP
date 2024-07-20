import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { AlertService } from 'src/app/core/services/alertService';
import { MessageService } from 'src/app/core/services/message.service';
import { BranchAccountantDetailsModel } from './accountantdetails.model';
import { AddaccountantService } from './addaccountant.service';
import { ResponseCode } from 'src/app/core/models/responseObject.model';

@Component({
  selector: 'app-add-accountant',
  templateUrl: './add-accountant.component.html',
  styleUrls: ['./add-accountant.component.scss']
})
export class AddAccountantComponent implements OnInit {

  form = new FormGroup({});
  fields: FormlyFieldConfig[];
  options: FormlyFormOptions = {};
  editData: any;
  tdsReturnList: any;
  GetEmployeeList: any;
  coOwners: any;
  NowDate: any = new Date();
  BranchAccountantDetails : BranchAccountantDetailsModel = new BranchAccountantDetailsModel();
   onReset: any;
   accountantDetails:any[] = [];
   branchDetails: any;
 
  constructor(
    private router: Router,
    private alertService: AlertService,
    private messageService: MessageService,
    private activateRoute: ActivatedRoute,
    private addaccountantService: AddaccountantService,
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
        // key: 'ITDPreEmploymentSalModel',
        fieldGroup: [

          {
            className: 'col-md-4',
            type: 'select',
            key: 'accountantName',
            templateOptions: {
              placeholder: 'Enter Accountant Name',
              type: 'text',
              label: "Accountant Name",
              required: true,
              options: [
                { value: 'mr', label: 'Mr' },
                { value: 'ms', label: 'Ms' }
              ]

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
    this.router.navigateByUrl('tds/hrd/accountant');
  }

  get f()
  {
    return this.form.controls;
  }

  onSubmit(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.insertBranchAccountant();
    } else {
      this.alertService.ShowErrorMessage('Please fill in all required fields.');
    }
  }

  insertBranchAccountant() {
    this.BranchAccountantDetails.addedBy = 1;
    this.BranchAccountantDetails.addedDate = new Date();
    this.BranchAccountantDetails.updatedBy = 1;
    this.BranchAccountantDetails.updatedDate = new Date();
    this.BranchAccountantDetails.branchAccountantId = 0;

    this.addaccountantService.insertBranchAccountantData(this.BranchAccountantDetails).subscribe(
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
    this.router.navigateByUrl('tds/hrd/accountant');
  }



  getBranchDetails() {
    this.addaccountantService.getBranchList().subscribe(
      (data: any) => {
        this.branchDetails = data.Value;
        this.setParameter();  
      },
      (error: any) => {
        this.alertService.ShowErrorMessage(error);
      }
    );
  }

}



