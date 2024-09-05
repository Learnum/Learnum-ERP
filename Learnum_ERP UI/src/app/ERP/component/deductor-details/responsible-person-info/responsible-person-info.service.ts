import { Injectable } from '@angular/core';
import { APIService } from 'src/app/core/services/apiService';
import { ResponsiblePersonDetails } from './responsible-person-data.model';


@Injectable()
export class ResponsiblePersonInfoService {
  private urlinsertResponisblePersonInfo: string = "ResponsiblePersonInfo/insertResponisblePersonInfo";
  private urlgetStateList: string = "ApplicationMaster/GetAllStates";
  private URLgetResponisblePersonInfoByDeductorId: string = "ResponsiblePersonInfo/getResponisblePersonInfoByDeductorId";
  constructor(private apiService: APIService) { }
  insertResponisblePersonInfo(responsiblePersonDetails:ResponsiblePersonDetails)
  {
    responsiblePersonDetails.AddedBy=1;
    responsiblePersonDetails.AddedDate=new Date(Date.now());
    responsiblePersonDetails.UpdatedDate = new Date(Date.now());
    responsiblePersonDetails.UpdatedBy=1;


    return this.apiService.postData(this.urlinsertResponisblePersonInfo,responsiblePersonDetails);

    
  }
  getStateList() {
    return this.apiService.getData(this.urlgetStateList);
  }
  getResponisblePersonInfoByDeductorId(DeductorId)
  {
    return this.apiService.getData(this.URLgetResponisblePersonInfoByDeductorId + "/" + DeductorId);

  }
 
}
