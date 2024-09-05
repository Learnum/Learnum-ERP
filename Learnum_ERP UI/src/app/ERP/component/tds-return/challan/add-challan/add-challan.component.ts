import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { AddChallanService } from './add-challan.service';
import { AlertService } from 'src/app/core/services/alertService';
import { ResponseCode } from 'src/app/core/models/responseObject.model';
import { MessageService } from 'src/app/core/services/message.service';
import { VerifyChallanModel } from './verify-challan.model';
import { ChallanDetailsModal } from './challan-details-modal';
import { formatDate } from '@angular/common';


@Component({
  selector: 'add-challan',
  templateUrl: './add-challan.component.html',
  styleUrls: ['./add-challan.component.scss'],
})
export class AddChallanComponent {
  form = new FormGroup({});
  PreviousEmployementSalaryModel = {}
  fields: FormlyFieldConfig[];
  options: FormlyFormOptions = {};
  paymentTypeList = [];
  getPaidByBookList = [];
  getSectionCodeList = [];
  selected: any;
  addChallanModel: any = {};
  verifyChallanModel = new VerifyChallanModel();
  ChallanDetailsModal: any = new ChallanDetailsModal();
  data = [];
  editData: any;
  NowDate: any = new Date();


  constructor(
    private router: Router,
    private addChallanService: AddChallanService,
    private alertService: AlertService,
    private messageService: MessageService,
    private activateRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.setParameter();
    this.GetPaymentTypeList();
    this.GetPaidByBookList();
    this.GetSectionCodeList();
    this.editData = this.activateRoute.snapshot.queryParams;
    if (this.editData.source == 'edit') {
      this.onClickEditChallan(this.editData.ChallanId)
    }
  }

  GetPaymentTypeList() {
    this.addChallanService.getPaymentTypeList().subscribe(
      (result: any) => {
        this.paymentTypeList = result.Value;
        this.setParameter();
        this.paymentTypeList = result.Value;
        this.selected = this.paymentTypeList[0].paymentTypeId;
      },
      (error: any) => {
        this.alertService.ShowErrorMessage(error.error);
      }
    );
  }

  GetPaidByBookList() {
    this.addChallanService.getPaidByBookList().subscribe(
      (result: any) => {
        this.getPaidByBookList = result.Value;
        this.setParameter();
        this.getPaidByBookList = result.Value;
        this.selected = this.getPaidByBookList[0].paidbyBookEntryorOtherwiseId;
      },
      (error: any) => {
        this.alertService.ShowErrorMessage(error.error);
      }
    );
  }

  GetSectionCodeList() {
    this.addChallanService.getSectionCodeList().subscribe(
      (result: any) => {
        this.getSectionCodeList = result.Value;
        this.setParameter();
        this.getSectionCodeList = result.Value;
        this.selected = this.getSectionCodeList[0].sectionCodeId;
      },
      (error: any) => {
        this.alertService.ShowErrorMessage(error.error);
      }
    );
  }

  setParameter() {
    this.fields = [
      {
        fieldGroupClassName: 'row card-body p-2',
        //key: 'ChallanDetailsModal',
        fieldGroup: [

          {
            className: 'col-md-3',
            type: 'input',
            key: 'BSRCode',
            templateOptions: {
              placeholder: 'Enter BSR Code',
              label: "BSR Code",
              type: 'number',
              required: true,
            },
            validation: {
              messages: {
                required: 'This field is required',
              },
            },
          },
          {
            className: 'col-md-3',
            type: 'input',
            key: 'DateOfTaxDeposite',
            templateOptions: {
              placeholder: 'Date',
              type: 'date',
              label: "Date Of Tax Deposite",
              required: true,
              attributes: {
                max: formatDate(this.NowDate, 'YYYY-MM-dd', 'en-IN'),
              },
            },
            validation: {
              messages: {
                required: 'This field is required',
              },
            },
          },
          {
            className: 'col-md-3',
            type: 'input',
            key: 'ChallanNo',
            props: {
              placeholder: 'Enter Chalan Serial Number',
              required: true,
              type: 'number',
              label: "Chalan Serial Number",
            },
            validation: {
              messages: {
                required: 'This field is required',
              },
            },
          },
          {
            className: 'col-md-3',
            type: 'input',
            key: 'ChallanStatus',
            templateOptions: {
              label: "Challan Status",
              placeholder: 'Enter challan Status',
              required: true,
            },
            validation: {
              messages: {
                required: 'This field is required',
              },
            },
          },
          {
            className: 'col-md-3',
            type: 'input',
            key: 'TDSAmount',
            // defaultValue: 0,
            props: {
              placeholder: 'Enter TDS',
              required: true,
              type: 'number',
              label: "TDS",
            },
            validation: {
              messages: {
                required: 'This field is required',
              },
            },
          },

          {
            className: 'col-md-3',
            type: 'input',
            key: 'EducationCess',
            props: {
              placeholder: 'Enter Education Cess',
              required: true,
              type: 'number',
              label: "Education Cess",
            },
            validation: {
              messages: {
                required: 'This field is required',
              },
            },
          },
          {
            className: 'col-md-3',
            type: 'input',
            key: 'Surcharge',
            props: {
              placeholder: 'Enter Surcharge',
              required: true,
              type: 'number',
              label: "Surcharge",
            },
            validation: {
              messages: {
                required: 'This field is required',
              },
            },
          },
          {
            className: 'col-md-3',
            type: 'input',
            key: 'TotalTaxDeposite',
            props: {
              placeholder: 'Enter Total Tax Deposited',
              required: true,
              type: 'number',
              label: "Total Tax Deposited",
            },
            validation: {
              messages: {
                required: 'This field is required',
              },
            },
          },
          {
            className: 'col-md-3',
            type: 'input',
            key: 'FeeAmount',
            props: {
              placeholder: 'Enter Fee',
              required: true,
              type: 'number',
              label: "Fee",
            },
            validation: {
              messages: {
                required: 'This field is required',
              },
            },
          },
          {
            className: 'col-md-3',
            type: 'input',
            key: 'InterestAmount',
            props: {
              placeholder: 'Enter Interest',
              required: true,
              type: 'number',
              label: "Interest",
            },
            validation: {
              messages: {
                required: 'This field is required',
              },
            },
          },
          {
            className: 'col-md-3',
            type: 'input',
            key: 'OtherPenaltyAmount',
            props: {
              placeholder: 'Enter Others/Penalty',
              required: true,
              type: 'number',
              label: "Others/Penalty",
            },
            validation: {
              messages: {
                required: 'This field is required',
              },
            },
          },
          {
            className: 'col-md-3',
            type: 'input',
            key: 'TotalAmount',
            props: {
              placeholder: 'Enter Total Amount',
              required: true,
              type: 'number',
              label: "Total Amount",
            },
            validation: {
              messages: {
                required: 'This field is required',
              },
            },
          },
          {
            className: 'col-md-3',
            type: 'select',
            key: 'PaymentTypeId',
            //defaultValue: '1',
            props: {
              //placeholder: 'Select Type',
              required: true,
              valueProp: 'PaymentTypeId',
              labelProp: 'PaymentType',
              label: "Payment Type",
              //options: this.paymentTypeList,
              options: [
                { PaymentType: 'Please Select Payment Type', disabled: true, selected: true },
                ...this.paymentTypeList,
              ],
            },
            validation: {
              messages: {
                required: 'This field is required',
              },
            },
          },
          {
            className: 'col-md-3',
            type: 'select',
            key: 'PaidBy',
            //defaultValue: '1',
            props: {
              //placeholder: 'Select Type',
              required: true,
              valueProp: 'PaidByTypeId',
              labelProp: 'PaidByName',
              label: "Paid by Book Entry or Otherwise?",
              options:this.getPaidByBookList,
              // options: [
              //   { PaymentType: 'Please Select Case Type', disabled: true, selected: true },
              //   ...this.getPaidByBookList,
              // ],
            },
            validation: {
              messages: {
                required: 'This field is required',
              },
            },
          },
          {
            className: 'col-md-3',
            type: 'select',
            key: 'SectionCodeTypeId',
            //defaultValue: '1',
            props: {
              //placeholder: 'Select Type',
              required: true,
              valueProp: 'SectionCodeId',
              labelProp: 'SectionCode',
              label: "Section Code",
              options: this.getSectionCodeList,
              // options: [
              //   { PaymentType: 'Please Select Case Type', disabled: true, selected: true },
              //   ...this.getSectionCodeList,
              // ],
            },
            validation: {
              messages: {
                required: 'This field is required',
              },
            },
          },
          {
            className: 'col-md-3',
            type: 'input',
            key: 'AmountUtilized',
            props: {
              placeholder: 'Enter Amount Utilized',
              required: true,
              type: 'number',
              label: "Amount Utilized",
            },
            validation: {
              messages: {
                required: 'This field is required',
              },
            },
          },
          {
            className: 'col-md-3',
            type: 'input',
            key: 'BalanceAmount',
            props: {
              placeholder: 'Enter Balance Amount',
              required: true,
              type: 'number',
              label: "Balance Amount",
            },
            validation: {
              messages: {
                required: 'This field is required',
              },
            },
          },
        ],
      },
    ]
  }

  onCancleClick() {
    this.router.navigateByUrl('tds/tds-return')
  }

  onSubmit(form: any): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.InsertAddChallanData();
      //this.getAllChallanDetails();
      this.router.navigateByUrl('tds/tds-return')
    }
    else {
      this.alertService.ShowErrorMessage('Please fill in all required fields.');
    }
  }
  getAllChallanDetails() {
    throw new Error('Method not implemented.');
  }

  InsertAddChallanData() {
    let challanmodel = this.ChallanDetailsModal;
    challanmodel.AddedBy = 1;
    challanmodel.AddedDate = new Date();
    challanmodel.UpdatedBy = 1;
    challanmodel.UpdatedDate = new Date();
    challanmodel.IsActive = true
    return this.addChallanService.insertAddChallanData(challanmodel).subscribe(
      (result: any) => {
        let serviceResponse = result.Value;
        if (serviceResponse == ResponseCode.Success) {
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
        this.alertService.ShowErrorMessage(error.error);
      }
    );
  }

  //pop-up for new-return-from
  onVerifyChallanClick() {
    document.getElementById('onverifyclickmodel').click();
  }

  //Save pop-up form for new retrun on new-retun button
  OnSaveClick() {
    this.addChallanService.verifyChallan(this.verifyChallanModel).subscribe(
      (result: any) => {
        let serviceResponse = result.Value;
      },
      (error: any) => {
        this.alertService.ShowErrorMessage(error.error);
      }
    );
  }

  onClickEditChallan(ChallanId: number) {
    this.addChallanService.getChallanById(ChallanId).subscribe(
      (result: any) => {
        if (result && result.Value) {
          this.ChallanDetailsModal = result.Value;
          this.ChallanDetailsModal.DateOfTaxDeposite = this.addChallanService.formatDate(this.ChallanDetailsModal.DateOfTaxDeposite);
        } else {
          console.error('No data found for ChallanId: ' + ChallanId);
        }
      },
      (error: any) => {
        console.error('Error retrieving employee details:', error);
        if (error && error.status === 404) {
          console.error('Employee not found.');
        } else {
          console.error('An unexpected error occurred. Please try again later.');
        }
      }
    );
  }
} 
