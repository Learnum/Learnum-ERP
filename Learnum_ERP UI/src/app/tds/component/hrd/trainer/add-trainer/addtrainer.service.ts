import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIService } from 'src/app/core/services/apiService';
import { BaseService } from 'src/app/core/services/baseService';
import { TrainerDetailsModel } from './trainerdetails.model';

@Injectable({
  providedIn: 'root'
})
export class AddtrainerService extends BaseService {

  private httpClientWithoutInterceptor: HttpClient;

  private urlInsertTrainerDetails: string = "BranchDetails/InsertBranchDetails";
  private urlgetTrainerList: string = "BranchDetails/getAllBranchList";

  constructor(private apiService: APIService, private httpBackend: HttpBackend) {
    super();
    this.httpClientWithoutInterceptor = new HttpClient(httpBackend);
  }

  insertTrainerData(TrainerDetails: TrainerDetailsModel) {
    //const URL = ConfigurationSettings.BASE_API_URL;
    return this.apiService.postBlob(this.urlInsertTrainerDetails,TrainerDetails);
  }

  // getBranchList() {
  //   return this.apiService.getData(this.urlgetBranchList);
  // }
}
