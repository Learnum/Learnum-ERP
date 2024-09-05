import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { DeductorDetailsService } from '../deductor-details.service';
import { AddressAndLoginDetails, DeductorLoginDetails } from './address-and-login.model';
import { AlertService } from 'src/app/core/services/alertService';
import { ResponseCode } from 'src/app/core/models/responseObject.model';
import { MessageService } from 'src/app/core/services/message.service';
import { AddressAndLoginService } from './address-and-login.service';
import { ConfigurationSettings } from 'src/app/core/models/configuration';
import { UserProfileService } from 'src/app/core/services/user-profile.service';


@Component({
  selector: 'address-login',
  templateUrl: './address-and-login.component.html',
  styleUrls: ['./address-and-login.component.scss']
})
export class AddressAndLoginComponent {
  form = new FormGroup({});
  //PreviousEmployementSalaryModel = {}
  fields: FormlyFieldConfig[];
  options: FormlyFormOptions = {};
  public addressAndLoginDetails = { addressAndLoginDetails: new AddressAndLoginDetails(), deductorLoginDetails: new DeductorLoginDetails() };
  //public deductorLoginDetails = new DeductorLoginDetails();
  StateList: any[];
  editData: any;
  deductorId: any;
  userId: number = 0;

  constructor(
    private router: Router,
    private deductorDetailsService: DeductorDetailsService,
    private alertService: AlertService,
    private messageService: MessageService,
    private addressAndLoginService: AddressAndLoginService,
    private activateRoute: ActivatedRoute,
    private userProfileService: UserProfileService
  ) {

  }
  ngOnInit(): void {
    this.editData = this.activateRoute.snapshot.queryParams;
    this.deductorId = ConfigurationSettings.getDeductorId();
    this.getAllStates();
    this.getAddressAndLoginDetailsByDeductorId(this.deductorId);
    this.setParameter();
  }

  getAllStates() {
    this.deductorDetailsService.getAllStates().subscribe(
      (result) => {
        let data = result.Value;
        this.StateList = data
        this.setParameter();
      }, (error) => {

      });
  }
  setParameter() {
    this.fields = [
      {
        template: '<div class="row mb-4"><div class="col-md-12"><label class="form-label"> DEDUCTORS ADDRESS </label> </div> </row>'
      },
      {
        fieldGroupClassName: 'row card-body p-2',
        key: 'addressAndLoginDetails',
        fieldGroup: [
          {
            key: 'AddressDetailId'
          },
          {
            key: 'DeductorId'
          },
          {
            className: 'col-md-3',
            type: 'input',
            key: 'BranchName',
            props: {
              placeholder: 'Enter Branch Name',
              required: true,
              type: 'text',
              label: "Branch/Division Name(if any)",
            },
          },
          {
            className: 'col-md-3',
            type: 'input',
            key: 'FlatDoor',
            props: {
              placeholder: '',
              required: true,
              type: 'number',
              label: "Flat No./Door No.",
            },
          },
          {
            className: 'col-md-3',
            type: 'input',
            key: 'BuildingName',
            props: {
              placeholder: 'Enter building Name',
              required: true,
              type: 'text',
              label: "Premises/Building Name",
              maxLength: 10,
              attributes: {
                style: 'text-transform: uppercase',
                maxlength: 10
              }
            },
          },
          {
            className: 'col-md-3',
            type: 'input',
            key: 'RoadStreet',
            templateOptions: {
              label: "Road/Street/Lane",
              placeholder: 'Enter address',
              required: true,
              //readonly: this.IsPreviousEmp || (this.isPOIStatusRejected && !this.isEmployee),
            },
          },
          {
            className: 'col-md-3',
            type: 'input',
            key: 'AreaLocality',
            props: {
              placeholder: 'Enter Location',
              required: true,
              type: 'text',
              label: "Area/Location",
            }
          },
          {
            className: 'col-md-3',
            type: 'input',
            key: 'City',
            props: {
              placeholder: 'Enter City',
              required: true,
              type: 'text',
              label: "Town / City / District",
            }
          },
          {
            className: 'col-md-3',
            type: 'input',
            key: 'PinCode',
            props: {
              placeholder: 'Enter PIN',
              required: true,
              label: "PIN Code",
              type: 'text',
              minLength: 5,
              maxLength: 6,
              pin: true,
            },
            validators: {
              pin: {
                  expression: (c: AbstractControl) => !c.value || /^[0-9]*$/.test(c.value),
                  message: (error: any, field: FormlyFieldConfig) => `"${field.formControl.value}" is not a valid PIN`,
              },
          },
          },
          {
            className: 'col-md-3',
            type: 'select',
            key: 'StateId',
            props: {
              options: this.StateList,
              placeholder: 'Select state',
              required: true,
              valueProp: 'StateId',
              labelProp: 'StateName',
              label: "State",
            }
          }
        ],
      },
      {
        template: '<div class="row mb-4"><div class="col-md-12"><label class="form-label"> DEDUCTORS LOGIN DETAILS </label> </div> </row>'
      },
      {
        fieldGroupClassName: 'row card-body p-2',
        key: 'deductorLoginDetails',
        fieldGroup: [
          {
            key: 'DeductorLoginId'
          },
          {
            key: 'DeductorId'
          },
          {
            className: 'col-md-3',
            type: 'input',
            key: 'TracesLoginId',
            props: {
              placeholder: 'Login ID',
              required: true,
              type: 'number',
              label: "Traces login Id",
            },
          },
          {
            className: 'col-md-3',
            type: 'input',
            key: 'TracesPassword',
            props: {
              placeholder: 'Password',
              required: true,
              type: 'text',
              label: "Traces Password",
            },
          },
          {
            className: 'col-md-3',
            type: 'input',
            key: 'IncomeTaxLoginId',
            props: {
              placeholder: 'Login ID',
              required: true,
              type: 'number',
              label: "Income Tax Login ID",
            },
          },
          {
            className: 'col-md-3',
            type: 'input',
            key: 'IncomeTaxPassword',
            templateOptions: {
              label: "Income Tax Password",
              placeholder: 'Password',
              required: true,
            },

          },
        ],
      },
    ]
  }
  onCancleClick() {
    localStorage.removeItem("deductorId");
    this.router.navigateByUrl('tds/dashboard')
  }

  insertAddressAndLoginDetails(data: any) {
    data.addressAndLoginDetails.AddedBy = 1;
    data.addressAndLoginDetails.AddedDate = new Date();
    data.addressAndLoginDetails.DeductorId = this.deductorId;
    data.addressAndLoginDetails.IsActive = true;
    data.deductorLoginDetails.UserId = this.userProfileService.getUserId();
    return this.addressAndLoginService.insertAddressAndLoginDetails(data).subscribe(
      result => {
        let serviceResponse = result.Value;
        if (serviceResponse.Item1 == ResponseCode.Success) {
          this.alertService.ShowSuccessMessage(this.messageService.savedSuccessfully);
          ConfigurationSettings.setDeductorId(serviceResponse.Item2);
          let data = { 'deductorId': serviceResponse.Item2 }
          this.router.navigate(['/tds/deductor-details/responsible-person-info'], { queryParams: data });
        } else if (serviceResponse.Item1 == ResponseCode.Update) {
          this.alertService.ShowSuccessMessage(this.messageService.updateSuccessfully);
          ConfigurationSettings.setDeductorId(serviceResponse.Item2);
          let data = { 'deductorId': serviceResponse.Item2 }
          this.router.navigate(['/tds/deductor-details/responsible-person-info'], { queryParams: data });
        } else {
          this.alertService.ShowErrorMessage(this.messageService.serviceError);
        }
      },
      (error: any) => {
        this.alertService.ShowErrorMessage(error.error);
      }
    )
  }

  getAddressAndLoginDetailsByDeductorId(deductorId: number) {
    if (deductorId) {
      return this.addressAndLoginService.getAddressAndLoginDetailsByDeductorId(deductorId).subscribe(
        result => {
          let serviceResponse = result.Value;
          this.addressAndLoginDetails = {
            addressAndLoginDetails: serviceResponse.AddressAndLoginDetails,
            deductorLoginDetails: serviceResponse.DeductorLoginDetails
          };
          this.setParameter();
        },
        (error: any) => {
          // this.alertService.ShowErrorMessage(error.error);
        }
      )
    }

  }
}
