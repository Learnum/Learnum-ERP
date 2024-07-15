import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { AlertService } from 'src/app/core/services/alertService';
import { MessageService } from 'src/app/core/services/message.service';
import { AddIpaddressService } from './add-ipaddress.service';
import { ResponseCode } from 'src/app/core/models/responseObject.model';
import { IPAddressDetailsModel } from './Ipaddress.model';

@Component({
  selector: 'app-add-ipaddress',
  templateUrl: './add-ipaddress.component.html',
  styleUrls: ['./add-ipaddress.component.scss']
})
export class AddIpaddressComponent implements OnInit {

  form = new FormGroup({});
  ipDetails: IPAddressDetailsModel = new IPAddressDetailsModel();
  fields: FormlyFieldConfig[];
  options: FormlyFormOptions = {};
  editData: any;
  formBuilder: any;
  
  constructor(
    private router: Router,
    private addipaddressService: AddIpaddressService,
    private alertService: AlertService,
    private messageService: MessageService,
    private activateRoute: ActivatedRoute,
    private fb: FormBuilder

  ) { }

  ngOnInit(): void {
    this.setParameter();
  }

  reset() {
    throw new Error('Method not implemented.');
  }

  setParameter() {
    this.fields = [
      {
        fieldGroupClassName: 'row card-body p-2',
        fieldGroup: [

          {
            className: 'col-md-4',
            type: 'input',
            key: 'Location',
            templateOptions: {
              placeholder: 'Enter Location',
              type: 'text',
              label: "Location",
              required: true,

            },
            validation: {
              messages: {
                required: 'Location  is required',
              },
            },
          },
          {
            className: 'col-md-4',
            type: 'input',
            key: 'LocationIP',
            props: {
              placeholder: 'Enter Location IP',
              type: 'text',
              label: "Location IP",
              required: true,

            },
            validation: {
              messages: {
                required: 'Location IP is required',

              },
            },
          },
          {
            className: 'col-md-6',
            type: 'select',
            key: 'IsActive',
            props: {
              placeholder: 'Select IPStatus ',
              required: true,
              label: 'IPStatus',
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
    this.router.navigateByUrl('tds/masters/ip-address');
  }


  onSubmit(): void {
   // this.form.markAllAsTouched();
    if (this.form.valid) {
      this.AddIPAddress();
    } else {
      this.alertService.ShowErrorMessage('Please fill in all required fields.');
    }
  }

  AddIPAddress() {
    this.ipDetails.addedBy = 1;
    this.ipDetails.addedDate = new Date();
    this.ipDetails.updatedBy = 1;
    this.ipDetails.updatedDate = new Date();
    this.ipDetails.locationId = 0;

    this.addipaddressService.insertIPAddress(this.ipDetails).subscribe(
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
    this.router.navigateByUrl('tds/masters/ip-address');
  }

  
}
