import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { DeductorBasicInfoModel } from './basic-info.model';
import { BasicInfoService } from './basic-info.service';
import { AlertService } from 'src/app/core/services/alertService';
import { ResponseCode } from 'src/app/core/models/responseObject.model';
import { MessageService } from 'src/app/core/services/message.service';
import { DeductorDetailsService } from '../deductor-details.service';

export class ForceLengthValidators {
  static maxLength(maxLength: number) {
    return (control: FormControl): ValidationErrors => {
      if (!control.value) {
        return null;
      }

      if (control.value.length > maxLength) {
        //force the length to
        control.setValue(control.value.substring(0, maxLength));
      }

      return null;
    };
  }
}

@Component({
  selector: 'basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.scss']
})
export class BasicInfoComponent {
  form = new FormGroup({});
  deductorBasicInfoModel = new DeductorBasicInfoModel()
  fields: FormlyFieldConfig[];
  options: FormlyFormOptions = {};
  DeductorTypeList = [{ id: 1, name: 'Company' }]
  DepartmentList = [{ id: 1, name: 'Active' }]
  StatusList = [{ id: 1, name: 'Active' }]
  StateList: any;
  editData: any;
  constructor(
    private router: Router,
    private basicInfoService: BasicInfoService,
    private deductorDetailsService: DeductorDetailsService,
    private alertService: AlertService,
    private messageService: MessageService,
    private activateRoute: ActivatedRoute
  ) {

  }
  ngOnInit(): void {
    this.editData = this.activateRoute.snapshot.queryParams;
    this.setParameter();
    if (this.editData.source == 'edit') {
      this.GetDeductorBasicInfo(this.editData.deductorId)
    }

    this.getAllStates()
    this.getDeductorType()
    //this.getDepartment()
    this.getStatus()
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

  getDeductorType() {
    this.deductorDetailsService.getDeductorType().subscribe(
      (result) => {
        let data = result.Value;
        this.DeductorTypeList = data
        this.setParameter();
      }, (error) => {

      });
  }
  getDepartment() {
    this.deductorDetailsService.getDepartment().subscribe(
      (result) => {
        let data = result.Value;
        this.DepartmentList = data
        this.setParameter();
      }, (error) => {

      });
  }
  getStatus() {
    this.deductorDetailsService.getStatus().subscribe(
      (result) => {
        let data = result.Value;
        this.StatusList = data
        this.setParameter();
      }, (error) => {

      });
  }

  setParameter() {
    this.fields = [
      {
        fieldGroupClassName: 'row card-body p-2',
        // key: 'deductorBasicInfoModel',
        fieldGroup: [
          {

            // type: 'input',
            key: 'UserId',
            defaultValue: 0,
            props: {
              type: 'hidden'
            }

          },
          {

            // type: 'input',
            key: 'DeductorId',
            defaultValue: 0,
            props: {
              type: 'hidden'
            }

          },
          {
            className: 'col-md-3',
            type: 'input',
            key: 'DeductorName',
            props: {
              placeholder: 'Enter Name',
              required: true,
              type: 'text',
              label: "Name",
              title: 'Only characters are allowed',
              //readonly: this.IsPreviousEmp || (this.isPOIStatusRejected && !this.isEmployee),
              // label:this.previousEmployement.previousEmployement[2].
              // investmentColumnTypeName
            },
          },
          // {
          //   className: 'col-md-3',
          //   type: 'input',
          //   key: 'DeductorName',
          //   props: {
          //     placeholder: 'Enter Name',
          //     required: true,
          //     type: 'text',
          //     label: "Name",
          //     pattern: '^[A-Za-z]+$',
          //     title: 'Only characters are allowed',
          //     //readonly: this.IsPreviousEmp || (this.isPOIStatusRejected && !this.isEmployee),
          //     // label:this.previousEmployement.previousEmployement[2].
          //     // investmentColumnTypeName
          //   },
          //   validation: {
          //     messages: {
          //       //required: 'Name is required',
          //       pattern: 'Please enter a valid name ',
          //     },
          //   },
          // },
          {
            className: 'col-md-3',
            type: 'input',
            key: 'PAN',
            props: {
              placeholder: 'Enter PAN',
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
            },
          },
          {
            className: 'col-md-3',
            type: 'input',
            key: 'TAN',
            props: {
              placeholder: 'Enter Tan',
              required: true,
              type: 'text',
              label: "TAN",
              //maxLength: 10,
              attributes: {
                style: 'text-transform: uppercase',
                //maxlength: 10
              }
            },
            validators: {
              ip: {
                expression: (c: AbstractControl) => !c.value || /^[A-Za-z]{3}[PCHFATBLJGgpchfatblj]{1}[A-Za-z]{1}[0-9]{4}[A-Za-z]{1}$/.test(c.value),
                message: (error: any, field: FormlyFieldConfig) => `Please Enter Valid TAN `,
              },
            },
          }, 
          // {
          //   className: 'col-md-3',
          //   type: 'input',
          //   key: 'TAN',
          //   hooks: {
          //     onInit: (field) => {
          //       field.formControl.valueChanges.subscribe(value => {
          //         field.formControl.setValue(value.toUpperCase(), { emitEvent: false });
          //       });
          //     }
          //   },
          //   templateOptions: {
          //     label: "TAN",
          //     placeholder: 'Enter TAN',
          //     required: true,
          //   },
          //   validators: {
          //     ip: {
          //       expression: (c: AbstractControl) => {
          //         const tanPattern = /^[A-Z]{4}[0-9]{5}[A-Z]{1}$/;
          //         return !c.value || (tanPattern.test(c.value) && c.value !== 'HGMCF4875F');
          //       },
          //       message: (error: any, field: FormlyFieldConfig) => `"${field.formControl.value}" is not a valid TAN`,
          //     },
          //   },
          // },        
          {
            className: 'col-md-3',
            type: 'input',
            key: 'GSTN',
            hooks: {
              onInit: (field) => {
                field.formControl.valueChanges.subscribe(value => {
                  field.formControl.setValue(value.toUpperCase(), { emitEvent: false });
                });
              }
            },
            templateOptions: {
              label: "GSTN",
              placeholder: 'Enter GSTN',
              required: true,
            },
            validators: {
              ip: {
                expression: (c: AbstractControl) => !c.value || /\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}/.test(c.value),
                message: (error: any, field: FormlyFieldConfig) => `"${field.formControl.value}" is not a valid GSTN`,
              },
            },
          },
          {
            className: 'col-md-3',
            type: 'input',
            key: 'MobileNo',
            props: {
              placeholder: 'Enter Mobile No',
              required: true,
              type: 'text',
              label: "Mobile No",
              maxLength: 10,
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
            key: 'EMailId',
            props: {
              placeholder: 'Enter Email',
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
          {
            className: 'col-md-3',
            type: 'select',
            key: 'DeductorTypeId',
            props: {
              //placeholder: 'Select Deductor',
              required: true,
              valueProp: 'DeductorTypeId',
              labelProp: 'DeductorType',
              label: "Type of Deductor",
              //options: this.DeductorTypeList,
              options: [
                { DeductorType: 'Please Select Deductor Type', disabled: true, selected: true },
                ...this.DeductorTypeList,
              ],
            },
          },
          {
            className: 'col-md-3',
            type: 'select',
            key: 'DepartmentId',
            props: {
              //placeholder: 'Select Ministry',
              required: true,
              valueProp: 'id',
              labelProp: 'name',
              label: "Ministry / Department Name",
              //options: this.DepartmentList,
              options: [
                { name: 'Select Ministry', disabled: true, selected: true },
                ...this.DepartmentList,
              ],
            },

          },
          {
            className: 'col-md-3',
            type: 'select',
            key: 'StateId',
            props: {
              //disabled:true,
              options: this.StateList,
              placeholder: 'Select State',
              valueProp: 'StateId',
              labelProp: 'StateName',
              label: "State Name",
              required: true,
              // options: [
              //   { StateName:'State Name', disabled: true, selected: true },
              //   ...this.StateList,
              // ],
            },

          },
          {
            className: 'col-md-3',
            type: 'select',
            key: 'StatusId',
            props: {
              //options: this.StatusList,
              //placeholder: 'Select Status',
              valueProp: 'StatusId',
              labelProp: 'Status',
              label: "Status",
              required: true,
              options: [
                { Status: 'Select Status', disabled: true, selected: true },
                ...this.StatusList,
              ],
            },
          },
        ],
      },
    ]
  }
  onCancleClick() {
    this.router.navigateByUrl('tds/dashboard')
  }
  GetDeductorBasicInfo(DeductorId: number) {
    if (DeductorId) {
      this.basicInfoService.GetDeductorBasicInfo(DeductorId).subscribe(
        result => {
          let data = result.Value;
          this.deductorBasicInfoModel = data
        },
        (error: any) => {
          //this.alertService.ShowErrorMessage(error.error);
        }
      )
    }
  }

  InsertDeductorBasicInfo(data: any) {
    if (data.valid) {
      let basicInfo = new DeductorBasicInfoModel();
      basicInfo = this.deductorBasicInfoModel;
      basicInfo.AddedBy = 1;
      basicInfo.AddedDate = new Date();
      basicInfo.UpdatedBy = 1;
      basicInfo.UpdatedDate = new Date();
      this.basicInfoService.insertDeductorBasicInfo(basicInfo).subscribe(
        result => {
          let serviceResponse = result.Value;
          if (serviceResponse.Item1 == ResponseCode.Success) {
            this.alertService.ShowSuccessMessage(this.messageService.savedSuccessfully);
            let data = { 'deductorId': serviceResponse.Item2 }
            this.router.navigate(['/tds/deductor-details/address-login'], { queryParams: data });
          } else if (serviceResponse.Item1 == ResponseCode.Update) {
            this.alertService.ShowSuccessMessage(this.messageService.updateSuccessfully);
            let data = { 'deductorId': serviceResponse.Item2 }
            this.router.navigate(['/tds/deductor-details/address-login'], { queryParams: data });
          } else {
            this.alertService.ShowErrorMessage(this.messageService.serviceError);
          }
        },
        (error: any) => {
          //this.alertService.ShowErrorMessage(error.error);
        }
      )
    } else {
      this.alertService.ShowErrorMessage('Please Enter Valid Details')
    }
  }
}
