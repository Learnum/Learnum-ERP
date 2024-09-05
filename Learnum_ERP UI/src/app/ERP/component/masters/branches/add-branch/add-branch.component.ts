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
  StateList: any;
  CityList: any;

  constructor(
    private router: Router,
    private addBranchService: AddBranchService,
    private alertService: AlertService,
    private messageService: MessageService,
    private activateRoute: ActivatedRoute,) { }

  ngOnInit(): void {
    this.setParameter();
    this.editData = this.activateRoute.snapshot.queryParams;
    if (this.editData.source === 'edit' && this.editData.BranchId) {
      this.getBranchDetails(this.editData.BranchId);
    }
    this.getAllStates();
    }

  setParameter() {
    this.fields = [
      {
        fieldGroupClassName: 'row card-body p-2',
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
              label: 'Branch Name',
              required: true,
            },
            hooks: {
              onInit: (field) => {
                field.formControl.valueChanges.subscribe(value => {
                  if (value) {
                    const capitalizedValue = value.replace(/\b\w/g, char => char.toUpperCase());
                    if (capitalizedValue !== value) {
                      field.formControl.setValue(capitalizedValue, { emitEvent: false });
                    }
                  }
                });
              }
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
              pattern: "^[\\s\\S]*$", 
            },
            validation: {
              messages: {
                required: 'Address is required',
              },
            },
          },
          {
            className: 'col-md-3',
            key: 'City',
            type: 'input',
            props: {
              label: 'City',
              placeholder: 'Enter City',
              type: 'text',
              pattern: "^[\\s\\S]*$",
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
            type: 'select',
            key: 'StateId',
            templateOptions: {
              label: "State Name",
              // placeholder: 'Select State',  
              required: true,
              options: [
                { value: null, label: 'Select State', disabled: true },  
                ...this.StateList ? this.StateList.map(state => ({
                  label: state.StateName,
                  value: state.StateId
                })) : [],
              ],
            },
            defaultValue: null,  
            validators: {
              required: {
                expression: (c: AbstractControl) => c.value !== null && c.value !== '', 
                message: 'State is required',
              },
            },
            validation: {
              messages: {
                required: 'State is required',
              },
            },
          },
          {
            className: 'col-md-3',
            key: 'PostalCode',
            type: 'input',
            templateOptions: {
              label: 'Postal Code',
              placeholder: 'Enter Postal Code',
              required: true,
              type: 'tel',
              pattern: '^[0-9]{6}$',
              maxLength: 6,
              minLength: 6
            },
            hooks: {
              onInit: (field) => {
                field.formControl.valueChanges.subscribe(value => {
                  const sanitizedValue = value.replace(/[^0-9]/g, '');
                  if (sanitizedValue !== value) {
                    field.formControl.setValue(sanitizedValue, { emitEvent: false });
                  }
                });
              },
            },
            validators: {
              postalCode: {
                expression: (c: AbstractControl) => {
                  const value = c.value;
                  return value && /^[0-9]{6}$/.test(value);
                },
                message: (error: any, field: FormlyFieldConfig) => {
                  return `"${field.formControl.value}" is not a valid 6-digit Postal Code`;
                },
              },
            },
            validation: {
              messages: {
                required: 'Postal Code is required',
                postalCode: 'Please enter a valid 6-digit Postal Code',
              },
            },
          },
          {
            className: 'col-md-3',
            type: 'select',
            key: 'IsActive',
            props: {
              label: 'Branch Status',
              required: true,
              options: [
                { value: true, label: 'Active' }, // Set as selected and disabled
                { value: false, label: 'Inactive' }
              ],
              //disabled: true // Disables the entire select field
            },
            defaultValue: true, // Set "Active" as the default value
            validation: {
              messages: {
                required: 'Please select a branch status',
              },
            },
          }
          
        ],
      },
    ];
  }

  navigate() {
    this.router.navigateByUrl('erp/masters/branches');
  }

  onCancleClick() {
    this.router.navigateByUrl('erp/masters/branches');
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
    this.branchDetails.AddedBy = 1;
    this.branchDetails.AddedDate = new Date();
    this.branchDetails.UpdatedBy = 1;
    this.branchDetails.UpdatedDate = new Date();

    this.addBranchService.insertBranchData(this.branchDetails).subscribe(
      (result: any) => {
        const serviceResponse = result.Value;
        if (serviceResponse === ResponseCode.Success) {
          this.alertService.ShowSuccessMessage(this.messageService.savedSuccessfully);
          this.router.navigateByUrl('erp/masters/branches');
        } else if (serviceResponse === ResponseCode.Update) {
          this.alertService.ShowSuccessMessage(this.messageService.updateSuccessfully);
          this.router.navigateByUrl('erp/masters/branches');
        } else {
          this.alertService.ShowErrorMessage(this.messageService.serviceError);
        }
      },
      (error: any) => {
        this.alertService.ShowErrorMessage(error);
      }
    );
    
  }

  getBranchDetails(BranchId: number) {
    this.addBranchService.getBranchDetails(BranchId).subscribe(
      (result: any) => {
        if (result && result.Value) {
          this.branchDetails = result.Value.Item1;
          this.setParameter();
          console.error('No data found for BranchId: ' + BranchId);
        }
      },
      (error: any) => {
        console.error('Error retrieving branch details:', error);
      }
    );
  }

  getAllStates() {
    this.addBranchService.getAllStates().subscribe(
      (result) => {
        let data = result.Value;
        this.StateList = data
        this.setParameter();
      }, (error) => {

      });
  }
}


