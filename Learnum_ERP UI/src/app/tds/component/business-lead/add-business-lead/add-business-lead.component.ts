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
  model: any = {};
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[];
  coOwners: any;
  NowDate: any = new Date();
  businessDetails:BusinessDetails =new BusinessDetails();

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
  }

  
  setParameter() {
    this.fields = [
      {
        fieldGroupClassName: 'row card-body p-2',
        fieldGroup: [
          {
            className: 'col-md-6',
            key: 'name',
            type: 'input',
            props: {
              label: 'Name',
              placeholder: 'Name',
              required: true,
            },
            validation: {
              messages: {
                required: 'First Name is required',
              },
            },
          },
          {
            className: 'col-md-6',
            key: 'phoneNumber',
            type: 'input',
            templateOptions: {
              label: 'Phone Number',
              placeholder: 'Enter Phone Number',
              required: true,
              pattern: '^\\+?[1-9]\\d{1,14}$',
            },
            validation: {
              messages: {
                required: 'Phone Number is required',
                pattern: 'Phone Number must be a valid E.164 number',
              },
            },
          },
          {
            className: 'col-md-6',
            key: 'address',
            type: 'input',
            templateOptions: {
              label: 'Address',
              placeholder: 'Enter Address',
              required: true,
            },
            validation: {
              messages: {
                required: 'Town is required',
              },
            },
          },
          {
            className: 'col-md-6',
            key: 'city',
            type: 'input',
            templateOptions: {
              label: 'City',
              placeholder: 'Enter City',
              required: true,
            },
            validation: {
              messages: {
                required: 'City is required',
              },
            },
          },
          {
            className: 'col-md-6',
            key: 'district',
            type: 'input',
            templateOptions: {
              label: 'District',
              placeholder: 'Enter District',
              required: true,
            },
            validation: {
              messages: {
                required: 'District is required',
              },
            },
          },
          {
            className: 'col-md-6',
            key: 'state',
            type: 'input',
            templateOptions: {
              label: 'State',
              placeholder: 'Enter State',
              required: true,
            },
            validation: {
              messages: {
                required: 'State is required',
              },
            },
          },
          {
            className: 'col-md-6',
            key: 'postalCode',
            type: 'input',
            templateOptions: {
              label: 'Postal Code',
              placeholder: 'Enter Postal Code',
              required: true,
            },
            validation: {
              messages: {
                required: 'Postal Code is required',
              },
            },
          },
          {
            className: 'col-md-6',
            key: 'country',
            type: 'input',
            templateOptions: {
              label: 'Country',
              placeholder: 'Enter Country',
              required: true,
            },
            validation: {
              messages: {
                required: 'Country is required',
              },
            },
          },
          
        ],
      },
    ];
  }

  onSubmit():void {
    // this.form.markAllAsTouched();
    // if (this.form.valid) {
    //   this.insertBusinessDetails();
    // }
    // else {
    //   this.alertService.ShowErrorMessage('Please fill in all required fields.');
    // }

    this.insertBusinessDetails();
  }

  onCancleClick() {
    this.router.navigateByUrl('tds/business-lead');
  }

  insertBusinessDetails() {
    this.businessDetails.addedBy = 1;
    this.businessDetails.addedDate = new Date();
    this.businessDetails.updatedBy = 1;
    this.businessDetails.updatedDate = new Date();
    this.businessDetails.businessId = 0;

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


}
