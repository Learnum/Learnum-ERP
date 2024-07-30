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
  
  GetEmployeeList: any;
  coOwners: any;
  NowDate: any = new Date();
  BranchAccountantDetails : BranchAccountantDetailsModel = new BranchAccountantDetailsModel();
   onReset: any;
   accountantDetails:any;
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

    this.editData = this.activateRoute.snapshot.queryParams;
    if (this.editData.source === 'edit' && this.editData.BranchAccountantId) {
      this.getBranchAccountantDetails(this.editData.BranchAccountantId);
    }
  }
 

setParameter() {
    this.fields = [
      {
        fieldGroupClassName: 'row card-body p-2',
        fieldGroup: [

          {
            key: 'BranchAccountantId'

          },


          {
            className: 'col-md-3',
            type: 'input',
            key: 'AccountantName',
            templateOptions: {
              placeholder: 'Enter Accountant Name',
              type: 'text',
              label: "Accountant Name",
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
    //this.BranchAccountantDetails.branchAccountantId = 0;

    this.addaccountantService.insertBranchAccountantData(this.BranchAccountantDetails).subscribe(
      (result: any) => {
        let serviceResponse = result.Value
        if (result.Value === ResponseCode.Success) {
          this.alertService.ShowSuccessMessage(this.messageService.savedSuccessfully);
          this.router.navigateByUrl('tds/hrd/accountant');


        }
        else if (serviceResponse == ResponseCode.Update) {
          this.alertService.ShowSuccessMessage(this.messageService.updateSuccessfully);
          this.router.navigateByUrl('tds/hrd/accountant');

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
   
  getBranchAccountantDetails(BranchAccountantId: number) {
    this.addaccountantService.getBranchAccountantDetails(BranchAccountantId).subscribe(
      (result: any) => {    
        if (result && result.Value) {
          this.BranchAccountantDetails = result.Value.Item1;

          this.setParameter();
          console.error('No data found for BranchAccountantId: ' + BranchAccountantId);
        }
      },
      (error: any) => {
        console.error('Error retrieving Branch Accountant details:', error);

      }
    );
  }
}



