import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { AlertService } from 'src/app/core/services/alertService';
import { MessageService } from 'src/app/core/services/message.service';
import { AddIpaddressService } from './add-ipaddress.service';
import { IPDetails } from './add-ipadress.model';
import { ResponseCode } from 'src/app/core/models/responseObject.model';

@Component({
  selector: 'app-add-ipaddress',
  templateUrl: './add-ipaddress.component.html',
  styleUrls: ['./add-ipaddress.component.scss']
})
export class AddIpaddressComponent implements OnInit {

  ipDetails: IPDetails = new IPDetails();
  fields: FormlyFieldConfig[];
  options: FormlyFormOptions = {};
  editData: any;
  tdsReturnList: any;
  form: any;
  branchDetails: any;

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
    this.createForm();
  }

  createForm(): void {
    this.form = this.fb.group({

      Location: ['', Validators.required],
      LocationIP: ['', Validators.required],
      IPStatus: ['', Validators.required],


    });

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
            className: 'col-md-4',
            type: 'input',
            key: 'IPstatus',
            props: {
              placeholder: 'Select IP Status',
              required: true,
              label: 'IP Status',  
            },
            validation: {
              messages: {
                required: 'IP status is required',
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

  get f() {
    return this.form.controls;
  }

  onSubmit(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      // this.insertBranch();
      //this.getBranchDetails();
    }
    else {
      this.alertService.ShowErrorMessage('Please fill in all required fields.');
    }
  }
  insertIP() {
    this.ipDetails.AddedBy = 1;
    this.ipDetails.AddedDate = new Date();
    this.ipDetails.UpdatedBy = 1;
    this.ipDetails.UpdatedDate = new Date();
    this.ipDetails.IsActive = true;

    this.addipaddressService.insertIPData(this.branchDetails).subscribe(
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
        this.alertService.ShowErrorMessage("Enter all required fields");
      }
    );
    this.router.navigateByUrl('tds/masters/branches');
  }
}


