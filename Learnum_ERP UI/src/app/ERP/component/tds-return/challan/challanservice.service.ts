import { Injectable } from '@angular/core';
import { APIService } from 'src/app/core/services/apiService';

@Injectable({
  providedIn: 'root'
})
export class ChallanserviceService {
  private urlgetChallanList: string = "ChallanDetails/getAllChallanDetails";

  constructor(private apiService: APIService) { }

  getAllChallanDetails() {
    return this.apiService.getData(this.urlgetChallanList);
  }
}
