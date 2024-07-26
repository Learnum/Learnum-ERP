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

  constructor(
    private router: Router,
    private addBranchService: AddBranchService,
    private alertService: AlertService,
    private messageService: MessageService,
    private activateRoute: ActivatedRoute,

  ) { }

  ngOnInit(): void {
    this.setParameter();
    this.editData = this.activateRoute.snapshot.queryParams;
    if (this.editData.source === 'edit' && this.editData.BranchId) {
      this.getBranchDetails(this.editData.BranchId);
    }

  }

  setParameter() {
    this.fields = [
      {
        fieldGroupClassName: 'row card-body p-2',
        // key: 'ITDPreEmploymentSalModel',
        fieldGroup: [
          {
            key: 'BranchId'
          },
          {
            className: 'col-md-3',
            type: 'input',
            key: 'BranchName',
            props: {
              placeholder: 'Enter Branch Name',
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
            className: 'col-md-3',
            type: 'input',
            key: 'Address',
            props: {
              placeholder: 'Enter Your Address',
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
            className: 'col-md-3',
            type: 'input',
            key: 'City',
            props: {
              placeholder: 'Enter Your city',
              required: true,
              type: 'text',
              label: "City",
            },
            validation: {
              messages: {
                required: 'City is required',
              },
            },
          },
          {
            className: 'col-md-3',
            type: 'input',
            key: 'State',
            props: {
              placeholder: 'Enter Your state',
              required: true,
              valueProp: 'value',
              labelProp: 'label',
              label: "State",
            },
            validation: {
              messages: {
                required: 'State is required',
              },
            },
          },
          {
            className: 'col-md-3',
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
                required: 'postal code is required',
              },
            },
          },
          {
            className: 'col-md-3',
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
  onResetClick() {
    this.form.reset();
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
    //this.branchDetails.BranchId = 0;

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
  getBranchDetails(BranchId: number) {
    this.addBranchService.getBranchDetails(BranchId).subscribe(
      (result: any) => {
        if (result && result.Value) {
          this.branchDetails = result.Value.Item1;
          //this.branchDetails.BranchId = Number(this.editData.BranchId);
          this.setParameter();
          console.error('No data found for BranchId: ' + BranchId);
        }
      },
      (error: any) => {
        console.error('Error retrieving employee details:', error);

      }
    );
  }
}
