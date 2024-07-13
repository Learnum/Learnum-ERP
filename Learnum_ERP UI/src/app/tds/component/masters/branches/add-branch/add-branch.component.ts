import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { AlertService } from 'src/app/core/services/alertService';
import { MessageService } from 'src/app/core/services/message.service';
import { AddBranchService } from './add-branch.service';
import { BranchDetailsModel } from './addbranch.model';
import { ResponseCode } from 'src/app/core/models/responseObject.model';



@Component({
  selector: 'app-add-branch',
  templateUrl: './add-branch.component.html',
  styleUrls: ['./add-branch.component.scss']
})
export class AddBranchComponent implements OnInit {

  form = new FormGroup({});
  branchDetails: BranchDetailsModel = new BranchDetailsModel();
  fields: FormlyFieldConfig[];
  options: FormlyFormOptions = {};
  editData: any;
  tdsReturnList: any;

  formBuilder: any;

  constructor(
    private router: Router,
    private addBranchService: AddBranchService,
    private alertService: AlertService,
    private messageService: MessageService,
    private activateRoute: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {

    this.setParameter();
  // this.createForm();
    this.editData = this.activateRoute.snapshot.queryParams;
    if (this.editData.source === 'edit' && this.editData.BranchId) {

    }

  }


  reset() {
    throw new Error('Method not implemented.');
  }

  setParameter() {
    this.fields = [
      {
        fieldGroupClassName: 'row card-body p-2',
        // key: 'ITDPreEmploymentSalModel',
       fieldGroup: [
          
          {
            className: 'col-md-6',
            type: 'input',
            key: 'BranchName',
            templateOptions: {
              placeholder: 'Enter Branch',
              type: 'text',
              label: "Branch Name",
              required: true,
            },
            validation: {
              messages: {
                required: 'Branch Name is required',

              },
            },
          },
          {
            className: 'col-md-6',
            type: 'input',
            key: 'Address',
            props: {
              placeholder: 'Enter Address',
              type: 'text',
              label: "Address",
              required: true,

            },
            validation: {
              messages: {
                required: 'Address is required',

              },
            },
          },
          {
            className: 'col-md-6',
            type: 'input',
            key: 'city',
            props: {
              placeholder: 'Enter city',
              required: true,
              type: 'text',
              label: "City",
            },
            validation: {
              messages: {
                required: 'This field is required',
              },
            },
          },
          {
            className: 'col-md-6',
            type: 'input',
            key: 'state',
            props: {
              placeholder: 'Enter state',
              required: true,
              valueProp: 'value',
              labelProp: 'label',
              label: "state",
            },
            validation: {
              messages: {
                required: 'Please select a State',
              },
            },
          },
          {
            className: 'col-md-6',
            type: 'input',
            key: 'PostalCode',
            props: {
              placeholder: 'Enter postal code',
              required: true,
              type: 'text',
              label: "Postal Code",
            },
            validation: {
              messages: {
                required: 'Please select a postal code',
              },
            },
          },
          {
            className: 'col-md-6',
            type: 'select',
            key: 'IsActive',
            props: {
              placeholder: 'Select Branch ',
              required: true,
              label: 'Branch Status',
              options: [
                { value: true, label: 'Active' },
                { value: false, label: 'InActive' }
              ],
            },
            validation: {
              messages: {
                required: 'Please select a branch status',
              },
            },
          },

        ],
      },
    ];
  }

  onCancleClick() {
    this.router.navigateByUrl('tds/masters/branches');
  }
  
  onSubmit(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.insertBranch();
    } else {
      this.alertService.ShowErrorMessage('Please fill in all required fields.');
    }
  }

  insertBranch() {
    this.branchDetails.addedBy = 1;
    this.branchDetails.addedDate = new Date();
    this.branchDetails.updatedBy = 1;
    this.branchDetails.updatedDate = new Date();
    this.branchDetails.branchId = 0;

    this.addBranchService.insertBranchData(this.branchDetails).subscribe(
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
    this.router.navigateByUrl('tds/masters/branches');
  }

}
