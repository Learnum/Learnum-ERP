import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIService } from 'src/app/core/services/apiService';
import { BaseService } from 'src/app/core/services/baseService';
import { WorksheetDetailsModel } from './worksheetdetails.model';

@Injectable({
  providedIn: 'root'
})
export class AddWorksheetservices extends BaseService {

  private httpClientWithoutInterceptor: HttpClient;

  private urlInsertWorksheetDetails: string = "WorksheetDetails/InsertWorkSheetDetails";
  private urlgetWorksheetList: string = "WorksheetDetails/getWorkSheetList";

  constructor(private apiService: APIService, private httpBackend: HttpBackend) {
    super();
    this.httpClientWithoutInterceptor = new HttpClient(httpBackend);
  }

  insertWorksheetData(WorksheetDetails: WorksheetDetailsModel) {
    //const URL = ConfigurationSettings.BASE_API_URL;
    return this.apiService.postBlob(this.urlInsertWorksheetDetails,WorksheetDetails);
  }
 
  getworksheetList(){
    return this.apiService.getData(this.urlgetWorksheetList);
  }

  }


