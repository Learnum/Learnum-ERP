import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { ResponsiblePersonInfoService } from './responsible-person-info.service';
import { ResponseCode } from 'src/app/core/models/responseObject.model';
import { AlertService } from 'src/app/core/services/alertService';
import { MessageService } from 'src/app/core/services/message.service';
import { ResponsiblePersonDetails } from './responsible-person-data.model';
import { ConfigurationSettings } from 'src/app/core/models/configuration';

@Component({
  selector: 'app-responsible-person-info',
  templateUrl: './responsible-person-info.component.html',
  styleUrls: ['./responsible-person-info.component.scss']
})
export class ResponsiblePersonInfoComponent implements OnInit {
  form = new FormGroup({});
  PreviousEmployementSalaryModel = {}
  fields: FormlyFieldConfig[];
  options: FormlyFormOptions = {};
  public responsiblePersonDetails: any = {};
  StateList: any[];
  responsiblePersonDetails1: any = {}
  deductorId: any;
  editData: any;

  constructor(private router: Router,
    private responsiblePersonInfoService: ResponsiblePersonInfoService,
    private alertService: AlertService,
    private messageService: MessageService,
    private activateRoute: ActivatedRoute

  ) { }

  ngOnInit(): void {
    this.editData = this.activateRoute.snapshot.queryParams;
    this.deductorId = ConfigurationSettings.getDeductorId();
    this.setParameter();
    this.GetStateList();
    this.getResponisblePersonInfoByDeductorId(this.deductorId);
  }

  setParameter() {
    this.fields = [
      // {
      //   template: '<div class="row mb-4"><div class="col-md-12"><label class="form-label"> DEDUCTORS ADDRESS </label> </div> </row>'
      // },
      {
        fieldGroupClassName: 'row card-body p-2',
        key: 'responsiblePersonDetails',
        fieldGroup: [
          // {
          //   type: '',
          //   key: 'ReposiblePersonInfoId',
          //   defaultValue: 1,
          //   templateOptions: {
          //     type: 'hidden',
          //   }
          // },
          {
            type: '',
            key: 'DeductorId',
            templateOptions: {
              type: 'hidden',
            }
          },
          {
            type: '',
            key: 'IsSameASDeductor',
            defaultValue: true,
            templateOptions: {
              type: 'hidden',
            }
          },
          {
            type: '',
            key: 'IsActive',
            defaultValue: true,
            templateOptions: {
              type: 'hidden',
            }
          },
          {
            className: 'col-md-3',
            type: 'input',
            key: 'Name',
            props: {
              placeholder: 'Enter Name',
              required: true,
              type: 'text',
              label: "Name",
            },
            validators: {
              ip: {
                expression: (c: AbstractControl) => !c.value || /^[A-Za-z ]+$/.test(c.value),
                message: (error: any, field: FormlyFieldConfig) => `Please Enter Valid Name `,
              },
            }
          },
          {
            className: 'col-md-3',
            type: 'input',
            key: 'PAN',
            props: {
              placeholder: 'PAN',
              required: true,
              type: 'text',
              label: "PAN",
              attributes: {
                style: 'text-transform: uppercase'
              }
            },
            validators: {
              ip: {
                expression: (c: AbstractControl) => !c.value || /^[A-Za-z]{3}[PCHFATBLJGgpchfatblj]{1}[A-Za-z]{1}[0-9]{4}[A-Za-z]{1}$/.test(c.value),
                message: (error: any, field: FormlyFieldConfig) => `Please Enter Valid PAN `,
              },
            }
          },
          {
            className: 'col-md-3',
            type: 'input',
            key: 'Designation',
            props: {
              placeholder: 'Designation',
              required: true,
              type: 'text',
              label: "Designation",
            },
            validators: {
              ip: {
                expression: (c: AbstractControl) => !c.value || /^[A-Za-z ]+$/.test(c.value),
                message: (error: any, field: FormlyFieldConfig) => `Please Enter Valid  Designation`,
              },
            }
          },
          {
            className: 'col-md-3',
            type: 'input',
            key: 'MobileNo',
            props: {
              placeholder: 'Enter mobile number',
              required: true,
              type: 'text',
              label: "Mobile No",
              maxLength: 10
            },
            validators: {
              mobile: {
                expression: (c: AbstractControl) => /^((\\+91-?)|0)?[0-9]{10}$/.test(c.value),
                message: (error: any, field: FormlyFieldConfig) => `Please Enter Valid Mobile Number`,
              },
            }
          },
            {
            className: 'col-md-3',
            type: 'input',
            key: 'EmailId',
            props: {
              placeholder: 'Enter Email Id',
              required: true,
              type: 'text',
              label: "Email Id",
            },
            validators: {
              ip: {
                expression: (c: AbstractControl) => /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(c.value),
                message: (error: any, field: FormlyFieldConfig) => `Please Enter Valid EmailId `,
              },
            }
          },
        ],
      },
      {
        template: '<div class="row mb-4"><div class="col-md-12"><label class="form-label"> Address Same as Deductor </label> </div> </row>'
      },
      {
        fieldGroupClassName: 'row card-body p-2',
        key: 'responsiblePersonDetails',
        fieldGroup: [
          {
            key: 'ReposiblePersonDetailId'
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
              type: 'text'
            },
          },
          {
            className: 'col-md-3',
            type: 'input',
            key: 'AreaLocality',
            props: {
              placeholder: ' gggg Location',
              required: true,
              type: 'text',
              label: "Area/Location",
            }
          },
          {
            className: 'col-md-3',
            type: 'input',
            key: 'CityTown',
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
            key: 'PINCode',
            props: {
              placeholder: 'Enter PIN',
              required: true,
              label: "PIN Code",
              maxLength: 6,
              type: 'text'
            },
            validators: {
              ip: {
                expression: (c: AbstractControl) => !c.value || /^[1-9][0-9]{5}$/.test(c.value),
                message: (error: any, field: FormlyFieldConfig) => `"${field.formControl.value}" is not a valid Pincode`,
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
              type: 'number'
            }
          }
        ],
      },
    ]
  }

  onCancleClick() {
    localStorage.removeItem("deductorId");
    this.router.navigateByUrl('tds/dashboard')
  }


  insertResponisblePersonInfo(responsiblePersonDetails: any) {
    responsiblePersonDetails.responsiblePersonDetails.DeductorId = this.deductorId;
    return this.responsiblePersonInfoService.insertResponisblePersonInfo(responsiblePersonDetails.responsiblePersonDetails).subscribe(
      result => {
        let serviceResponse = result.Value;
        if (serviceResponse == ResponseCode.Success) {
          this.alertService.ShowSuccessMessage("Reponsible Person  Information Saved Successfully");
          let data = { 'deductorId': serviceResponse.Item2 }
          this.router.navigate(['/tds/deductor-details/salary-info'], { queryParams: data });
        }
        else if (serviceResponse == ResponseCode.Update) {
          this.alertService.ShowSuccessMessage("Reponsible Person  Information Updated Successfully");
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


  GetStateList() {

    return this.responsiblePersonInfoService.getStateList().subscribe(
      result => {
        let data = result.Value;
        this.StateList = data
        this.setParameter();
      },
      (error: any) => {
        //this.alertService.ShowErrorMessage(error.error);
      }
    )
  }
  getResponisblePersonInfoByDeductorId(deductorId) {
    if (deductorId) {
      this.responsiblePersonInfoService.getResponisblePersonInfoByDeductorId(deductorId).subscribe((result: any) => {
        let data = result.Value;
        this.responsiblePersonDetails = { responsiblePersonDetails: data };
        this.setParameter();
      });
    }
  }
}






