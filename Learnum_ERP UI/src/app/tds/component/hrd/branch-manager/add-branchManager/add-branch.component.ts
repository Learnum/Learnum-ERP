import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { AlertService } from 'src/app/core/services/alertService';
import { MessageService } from 'src/app/core/services/message.service';
import { branchManagerDetailsModel } from './branchManagerDetailsModel';
import { AddbranchManagerService } from './addbranch.service';
import { ResponseCode } from 'src/app/core/models/responseObject.model';

@Component({
  selector: 'app-add-branch',
  templateUrl: './add-branch.component.html',
  styleUrls: ['./add-branch.component.scss']
})
export class AddBranchComponent implements OnInit {

  form = new FormGroup({});
  branchManagerDetails: branchManagerDetailsModel = new branchManagerDetailsModel();
  reasonList: any[] = [];
  fields: FormlyFieldConfig[];
  options: FormlyFormOptions = {};
  editData: any;
  NowDate: any = new Date();
  branchDetails: any;


  constructor(
    private addbranchManagerService: AddbranchManagerService,
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
    if (this.editData.source === 'edit' && this.editData.BranchManagerId) {
      this.getBranchManagerDetails(this.editData.BranchManagerId);
    }
  }

  setParameter() {
    this.fields = [
      {
        fieldGroupClassName: 'row card-body p-2',
        fieldGroup: [
          {
            key: 'BranchManagerId'
          },

          {
            className: 'col-md-3',
            type: 'input',
            key: 'BranchManagerName',
            templateOptions: {
              placeholder: 'Enter Branch Manager',
              type: 'text',
              label: "Branch Manager Name",
              required: true,
              pattern: "^[A-Za-z]+( [A-Za-z]+)*$",
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
              label: "Branch Name",
              //placeholder: 'Select Branch',  
              required: true,
              options: [
                { value: null, label: 'Select Branch', disabled: true },  
                ...this.branchDetails ? this.branchDetails.map(branch => ({
                  label: branch.BranchName,
                  value: branch.BranchId
                })) : [],
              ]
            },
            defaultValue: null,  
            validators: {
              required: {
                expression: (c: AbstractControl) => c.value !== null && c.value !== '', 
                message: 'Branch selection is required',
              },
            },
            validation: {
              messages: {
                required: 'Branch selection is required',
              },
            },
          }
          ,
          {
            className: 'col-md-3',
            type: 'select',
            key: 'IsActive',
            templateOptions: {
              label: 'Branch Manager Status',
              //placeholder: 'Select Branch manager Status',
              required: true,
              options: [
                { value: null, label: 'Select Branch Manager Status', disabled: true },  
                { value: true, label: 'Active' },
                { value: false, label: 'Inactive' }
              ],
            },
            defaultValue: null,  
            validation: {
              messages: {
                required: 'Please select a branch manager status',
              },
            },
          }
        ],
      },
    ]
  }

  onCancleClick() {
    this.router.navigateByUrl('tds/hrd/branch-manager');
  }

  navigate() {
    this.router.navigateByUrl('tds/hrd/branch-manager');
  }

  onSubmit(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.insertBranchManager();
    } else {
      this.alertService.ShowErrorMessage('Please fill in all required fields.');
    }
  }

  insertBranchManager() {
    this.branchManagerDetails.addedBy = 1;
    this.branchManagerDetails.addedDate = new Date();
    this.branchManagerDetails.updatedBy = 1;
    this.branchManagerDetails.updatedDate = new Date();
    // this.branchManagerDetails.branchManagerId = 0;

    this.addbranchManagerService.insertBranchManagerData(this.branchManagerDetails).subscribe(
      (result: any) => {
        let serviceResponse = result.Value
        if (result.Value === ResponseCode.Success) {
          this.alertService.ShowSuccessMessage(this.messageService.savedSuccessfully);
          this.router.navigateByUrl('tds/hrd/branch-manager');

        }
        else if (serviceResponse == ResponseCode.Update) {
          this.alertService.ShowSuccessMessage(this.messageService.updateSuccessfully);
          this.router.navigateByUrl('tds/hrd/branch-manager');
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
    this.addbranchManagerService.getBranchList().subscribe(
      (data: any) => {
        this.branchDetails = data.Value;
        this.setParameter();
      },
      (error: any) => {
        this.alertService.ShowErrorMessage(error);
      }
    );
  }

  getBranchManagerDetails(BranchManagerId: number) {
    this.addbranchManagerService.getBranchManagerDetails(BranchManagerId).subscribe(
      (result: any) => {
        if (result && result.Value) {
          this.branchManagerDetails = result.Value.Item1;

          this.setParameter();
          console.error('No data found for BranchId: ' + BranchManagerId);
        }
      },
      (error: any) => {
        console.error('Error retrieving trainer details:', error);

      }
    );
  }
}
