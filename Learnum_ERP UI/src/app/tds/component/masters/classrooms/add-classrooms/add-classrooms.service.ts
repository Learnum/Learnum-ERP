import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIService } from 'src/app/core/services/apiService';
import { classroomDetailsModel } from '../add-classroom.model';
import { BaseService } from 'src/app/core/services/baseService';

@Injectable({
  providedIn: 'root'
})
export class AddClassroomsService extends BaseService
{
  private httpClientWithoutInterceptor: HttpClient;

  private urlInsertClassroomDetails: string = "ClassroomDetails/InsertClassroomDetails";

  constructor(private apiService: APIService, private httpBackend: HttpBackend) {
    super();
    this.httpClientWithoutInterceptor = new HttpClient(httpBackend);
  }

  insertBranchData(classroomDetails: classroomDetailsModel) {
    //const URL = ConfigurationSettings.BASE_API_URL;
    return this.apiService.postBlob(this.urlInsertClassroomDetails,classroomDetails);
  }

}
