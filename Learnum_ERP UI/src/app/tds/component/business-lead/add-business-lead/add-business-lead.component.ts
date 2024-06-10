import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { AlertService } from 'src/app/core/services/alertService';
import { MessageService } from 'src/app/core/services/message.service';
import { BusinessDetails } from './business-details.model';
import { FormGroup, FormBuilder,Validators, AbstractControl } from '@angular/forms';


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
    private router: Router,
    private alertService: AlertService,
    private messageService: MessageService,
    private activateRoute: ActivatedRoute,
    private formBuilder: FormBuilder) {
     }

  ngOnInit(): void {
    this.setParameter();
    this.createForm();
  }
  createForm(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      // lname: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      district: ['', Validators.required],
      state: ['', Validators.required],
      postalCode: ['', Validators.required],
      country: ['', Validators.required],
      phone: ['', Validators.required],
    });
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
            key: 'phone',
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
    this.form.markAllAsTouched();
    if (this.form.valid) {
      //this.insertAddEmployee();
      //this.GetEmployeeList();
    }
    else {
      this.alertService.ShowErrorMessage('Please fill in all required fields.');
    }
  }

  onCancleClick() {
    this.router.navigateByUrl('tds/business-lead');
  }

}
