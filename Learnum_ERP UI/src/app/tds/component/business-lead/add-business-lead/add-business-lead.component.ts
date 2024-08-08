import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { AlertService } from 'src/app/core/services/alertService';
import { MessageService } from 'src/app/core/services/message.service';
import { FormGroup, FormBuilder,Validators, AbstractControl } from '@angular/forms';
import { BusinessDetails } from './businessdetails.model';
import { AddBusinessLeadService } from './add-business-lead.service';
import { ResponseCode } from 'src/app/core/models/responseObject.model';


@Component({
  selector: 'app-add-business-lead',
  templateUrl: './add-business-lead.component.html',
  styleUrls: ['./add-business-lead.component.scss']
})
export class AddBusinessLeadComponent implements OnInit {
  form = new FormGroup({});
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[];
  coOwners: any;
  NowDate: any = new Date();
  businessDetails:BusinessDetails =new BusinessDetails();
  editData: any;

  constructor(
    private addBusinessLeadService : AddBusinessLeadService,
    private router: Router,
    private alertService: AlertService,
    private messageService: MessageService,
    private activateRoute: ActivatedRoute,
    private formBuilder: FormBuilder) {
     }

  ngOnInit(): void {
    this.setParameter(); 
    this.editData = this.activateRoute.snapshot.queryParams;
    if (this.editData.source === 'edit' && this.editData.BusinessId) {
      this.getBusinessDetails(this.editData.BusinessId);
    }
  }

  
  setParameter() {
    this.fields = [
      {
        fieldGroupClassName: 'row card-body p-2',
        fieldGroup: [
          {
            key:'businessId'
          },
          {
            className: 'col-md-3',
            key: 'Name',
            type: 'input',
            props: {
              label: 'Name',
              placeholder: 'Name',
              pattern: '^[A-Za-z ]+$', 
              required: true,
            },
            validation: {
              messages: {
                required: 'First Name is required',
                pattern: 'Please Enter Full Name'
              },
            },
            hooks: {
              onInit: (field) => {
                field.formControl.valueChanges.subscribe(value => {
                  const capitalizedValue = value.replace(/\b\w/g, char => char.toUpperCase());
                  if (value !== capitalizedValue) {
                    field.formControl.setValue(capitalizedValue, { emitEvent: false });
                  }
                });
              }
            }
          },
          {
            className: 'col-md-3',
            key: 'PhoneNumber',
            type: 'input',
            templateOptions: {
              label: 'Phone Number',
              placeholder: 'Enter Phone Number',
              required: true,
              type: 'tel', 
              pattern: '^[0-9]{10}$', 
              maxLength: 10, 
              minLength: 10
            },
            validation: {
              messages: {
                required: 'Phone Number is required',
                pattern: 'Please Enter a Valid 10-digit Phone Number',
                minLength: 'Phone Number must be exactly 10 digits',
                maxLength: 'Phone Number must be exactly 10 digits'
              }
            }
          },
          {
            className: 'col-md-3',
            key: 'Address',
            type: 'input',
            templateOptions: {
              label: 'Address',
              placeholder: 'Enter Address',
              required: true,
              type:'text',
              pattern: '^[A-Za-z ]+$', 
            },
            validation: {
              messages: {
                required: 'Town is required',
                pattern: 'Please Enter Address'
              },
            },
            hooks: {
              onInit: (field) => {
                field.formControl.valueChanges.subscribe(value => {
                  const capitalizedValue = value.replace(/\b\w/g, char => char.toUpperCase());
                  if (value !== capitalizedValue) {
                    field.formControl.setValue(capitalizedValue, { emitEvent: false });
                  }
                });
              }
            }
          },
          {
            className: 'col-md-3',
            key: 'City',
            type: 'input',
            templateOptions: {
              label: 'City',
              placeholder: 'Enter City',
              required: true,
              type:'text',
              pattern: '^[A-Za-z ]+$', 
            },
            validation: {
              messages: {
                required: 'City is required',
                pattern: 'Please Enter City'
              },
            },
            hooks: {
              onInit: (field) => {
                field.formControl.valueChanges.subscribe(value => {
                  const capitalizedValue = value.replace(/\b\w/g, char => char.toUpperCase());
                  if (value !== capitalizedValue) {
                    field.formControl.setValue(capitalizedValue, { emitEvent: false });
                  }
                });
              }
            }
          },
          {
            className: 'col-md-3',
            key: 'District',
            type: 'input',
            templateOptions: {
              label: 'District',
              placeholder: 'Enter District',
              required: true,
              pattern: '^[A-Za-z ]+$',
              type:'text',
            },
            validation: {
              messages: {
                required: 'District is required',
                pattern: 'Please Enter District'
              },
            },
            hooks: {
              onInit: (field) => {
                field.formControl.valueChanges.subscribe(value => {
                  const capitalizedValue = value.replace(/\b\w/g, char => char.toUpperCase());
                  if (value !== capitalizedValue) {
                    field.formControl.setValue(capitalizedValue, { emitEvent: false });
                  }
                });
              }
            }
          },
          {
            className: 'col-md-3',
            key: 'State',
            type: 'input',
            templateOptions: {
              label: 'State',
              placeholder: 'Enter State',
              pattern: '^[A-Za-z]+$',
              type:'text',
              required: true,
            },
            validation: {
              messages: {
                required: 'State is required',
                pattern: 'Please Enter State'
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
            validation: {
              messages: {
                required: 'Postal Code is required',
                pattern: 'Please Enter a Valid 6-digit Postal Code',
                minLength: 'Postal Code must be exactly 6 digits',
                maxLength: 'Postal Code must be exactly 6 digits'
              }
            }
          },
          {
            className: 'col-md-3',
            key: 'Country',
            type: 'input',
            templateOptions: {
              label: 'Country',
              placeholder: 'Enter Country',
              required: true,
              pattern: '^[A-Za-z]+$',
              type:'text',
            },
            validation: {
              messages: {
                required: 'Country is required',
                pattern: 'Please Enter Country'
              },
            },
          },
          
        ],
      },
    ];
  }

  onSubmit():void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.insertBusinessDetails();
    } else {
      this.alertService.ShowErrorMessage('Please fill in all required fields.');
    }
  }
  onCancleClick() {
    this.router.navigateByUrl('tds/business-lead');
  }
  onResetClick() {
    this.form.reset();
  }

  insertBusinessDetails() {
    this.businessDetails.addedBy = 1;
    this.businessDetails.addedDate = new Date();
    this.businessDetails.updatedBy = 1;
    this.businessDetails.updatedDate = new Date();
    //this.businessDetails.businessId = 0;

    this.addBusinessLeadService.InsertBusinessDetails(this.businessDetails).subscribe(
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
    this.router.navigateByUrl('tds/business-lead');
  }
  getBusinessDetails(BusinessId: number) {
    this.addBusinessLeadService.getBusinessDetails(BusinessId).subscribe(
      (result: any) => {
        if (result && result.Value) {
          this.businessDetails = result.Value.Item1;
          this.setParameter();
          console.error('No data found for BusinessId: ' + BusinessId);
        }
      },
      (error: any) => {
        console.error('Error retrieving business details:', error);

      }
    );
  }


}
