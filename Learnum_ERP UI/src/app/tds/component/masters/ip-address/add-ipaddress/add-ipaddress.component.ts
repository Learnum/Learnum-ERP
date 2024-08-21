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
    this.editData = this.activateRoute.snapshot.queryParams;
    if (this.editData.source === 'edit' && this.editData.LocationId) {
      this.getLocationDetails(this.editData.LocationId);
    }
  }

  setParameter() {
    this.fields = [
      {
        fieldGroupClassName: 'row card-body p-2',
        fieldGroup: [
          {
            key: 'LocationId'
          },
          {
            className: 'col-md-3',
            type: 'input',
            key: 'Location',
            templateOptions: {
              placeholder: 'Enter Your Location',
              type: 'text',
              label: "Location",
              required: true,
              pattern: "^[A-Za-z]+( [A-Za-z]+)*$",
            },
            validation: {
              messages: {
                required: 'location is required',
              },
            },
          },
          {
            className: 'col-md-3',
            type: 'input',
            key: 'LocationIP',
            props: {
              placeholder: 'Enter Location IP',
              type: 'text',
              label: 'Location IP',
              required: true,
              pattern: "^((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])\\.){3}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])$",
            },
            validation: {
              messages: {
                required: 'Location IP is required',
                pattern: 'Please enter a valid IP address',
              },
            },
            hooks: {
              onInit: (field) => {
                field.formControl.valueChanges.subscribe((value: string) => {
                  const sanitizedValue = value.replace(/[^0-9.]/g, '');
                  if (sanitizedValue !== value) {
                    field.formControl.setValue(sanitizedValue, { emitEvent: false });
                  }
                });
              },
            },
          }
          
        
        ,
        
          {
            className: 'col-md-3',
            type: 'select',
            key: 'IsActive',
            templateOptions: {
              label: 'IP Status',
              //placeholder: 'Select IP Status',
              required: true,
              options: [
                { value: null, label: 'Select IP Status', disabled: true },  // Disabled placeholder option
                { value: true, label: 'Active' },
                { value: false, label: 'Inactive' }
              ],
            },
            defaultValue: null,  
            validation: {
              messages: {
                required: 'Please select a IP status',
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
  onResetClick() {
    this.form.reset();
  }
  onSubmit(): void {
    this.form.markAllAsTouched();
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
  getLocationDetails(LocationId: number) {
    this.addipaddressService.getLocationDetails(LocationId).subscribe(
      (result: any) => {
        if (result && result.Value) {
          this.ipDetails = result.Value.Item1;
          this.setParameter();
          console.error('No data found for LocationId: ' + LocationId);
        }
      },
      (error: any) => {
        console.error('Error retrieving location details:', error);

      }
    );
  }
 
  navigate()
  {
    this.router.navigateByUrl('tds/masters/ip-address');
  }
}
