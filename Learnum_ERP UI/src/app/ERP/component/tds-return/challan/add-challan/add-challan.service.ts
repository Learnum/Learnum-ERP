import { Injectable } from '@angular/core';
import { APIService } from 'src/app/core/services/apiService';
import { VerifyChallanModel } from './verify-challan.model';
import { ChallanDetailsModal } from './challan-details-modal';
import { BaseModel } from 'src/app/ERP/model/BaseModel';
import { BaseService } from 'src/app/core/services/baseService';

@Injectable()
export class AddChallanService extends BaseService {
  private urlgetPaymentTypeList: string = "ApplicationMaster/GetPaymentType";
  private urlgetPaidByBookList: string = "ApplicationMaster/GetPaidByType";
  private urlgetSectionCodeList: string = "ApplicationMaster/GetSectionCode";
  private urlinsertAddChallanData: string = "ChallanDetails/insertChallanDetails";
  private urlverifyChallan: string = "";
  private urlgetChallanById: string = "ChallanDetails/GetChallanByChallanId"
  constructor(private apiService: APIService) {
    super();
   }
  getPaymentTypeList() {
    return this.apiService.getData(this.urlgetPaymentTypeList);
  }
  getPaidByBookList() {
    return this.apiService.getData(this.urlgetPaidByBookList);
  }
  getSectionCodeList() {
    return this.apiService.getData(this.urlgetSectionCodeList);
  }
  insertAddChallanData(challanDetailsModel: ChallanDetailsModal) {
    return this.apiService.postData(this.urlinsertAddChallanData, challanDetailsModel);
  }
  verifyChallan(verifyChallanModel: VerifyChallanModel) {
    return this.apiService.postData(this.urlverifyChallan, verifyChallanModel);
  }
  getChallanById(ChallanId: number) {
    return this.apiService.getData(this.urlgetChallanById + "/" + ChallanId);
  }
}
