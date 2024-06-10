import { Injectable } from '@angular/core';
import { APIService } from 'src/app/core/services/apiService';
import { SalaryInfoModel } from './salary-info.model';


@Injectable()
export class SalaryInfoService {
  private urlgetStateList: string = "ApplicationMaster/GetSalarySectionType";
  private URLSaveSalaryInfoData:string="SalarySectionInfo/InsertSalarySectionInfo";
  private urlgetAllSalaryInformation:string="SalarySectionInfo/GetAllSalaryInformation";
  private URLonActiveDeactive:string="SalarySectionInfo/UpdateSalaryInfoStatus";

  
  constructor(private apiService: APIService) { }

  getSalarySectionTypeList() {
    return this.apiService.getData(this.urlgetStateList);
  }
 
  SaveSalaryInfoData(salaryinfomodel:SalaryInfoModel)
  {
    salaryinfomodel.AddedBy =1
    salaryinfomodel.AddeDate = new Date(Date.now());
    salaryinfomodel.UpdatedBy =1
    salaryinfomodel.UpdatedDate = new Date(Date.now());
    return this.apiService.postData(this.URLSaveSalaryInfoData, salaryinfomodel);
  }
  getAllSalaryInformation()
  {
    return this.apiService.getData(this.urlgetAllSalaryInformation);

  }
  onActiveDeactive(salaryinfomodel:SalaryInfoModel)
  {
    return this.apiService.postData(this.URLonActiveDeactive, salaryinfomodel);

  }
}
