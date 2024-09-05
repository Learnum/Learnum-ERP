import { Injectable } from '@angular/core';
import { APIService } from 'src/app/core/services/apiService';

@Injectable({
  providedIn: 'root'
})
export class AddressAndLoginService {
  private insertAddressAndLoginURL: string = "AddressDetails/InsertAddressDetails";
  private getAddressAndLoginDetailsByDeductorIdURL: string = "AddressDetails/getAddressDetailsByDeductorId";

  constructor(private apiService: APIService) { }

  insertAddressAndLoginDetails(data:any)
  {
    return this.apiService.postData(this.insertAddressAndLoginURL,data);    
  }

  getAddressAndLoginDetailsByDeductorId(deductorId:number)
  {
    return this.apiService.getData(this.getAddressAndLoginDetailsByDeductorIdURL +"/"+deductorId);    
  }
}
