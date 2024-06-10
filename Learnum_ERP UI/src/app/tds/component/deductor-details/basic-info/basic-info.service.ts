import { Injectable } from '@angular/core';
import { APIService } from 'src/app/core/services/apiService';
import { DeductorBasicInfoModel } from './basic-info.model';


@Injectable({providedIn:'root'})
export class BasicInfoService {
  private urlinsertDeductorBasicInfo: string = "DeductorBasicInfo/insertDeductorBasicInfo";
  private urlgetDeductorBasicInfo: string = "DeductorBasicInfo/getDeductorBasicInfo";
  constructor(private apiService: APIService) { }


  insertDeductorBasicInfo(deductorBasicInfo)
  {
    return this.apiService.postData(this.urlinsertDeductorBasicInfo,deductorBasicInfo);
  }

  GetDeductorBasicInfo(deductorId)
  {
    return this.apiService.getData(this.urlgetDeductorBasicInfo + '/' + deductorId);
  }
}
