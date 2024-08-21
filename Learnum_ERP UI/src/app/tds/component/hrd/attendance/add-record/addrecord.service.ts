import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIService } from 'src/app/core/services/apiService';
import { BaseService } from 'src/app/core/services/baseService';
import { AttendenceSheetDetailsModel } from './attendanceDetails.model';

@Injectable({
  providedIn: 'root'
})
export class AddrecordService extends BaseService {

  private urlInsertAttendenceDetails: string = "AttendenceSheetDetails/InsertAttendenceSheetDetails";
  private urlgetAttendenceDetails: string = "AttendenceSheetDetails/getAllAttendenceSheetList";
  private urlGetAttendance: string = "AttendenceSheetDetails/getAttendenceDetailsDetailsById";


  private httpClientWithoutInterceptor: HttpClient;

  constructor(private apiService: APIService, private httpBackend: HttpBackend) {
    super();
    this.httpClientWithoutInterceptor = new HttpClient(httpBackend);
  }

  insertrecordsData(AttendenceSheetDetails: AttendenceSheetDetailsModel) {
    return this.apiService.postBlob(this.urlInsertAttendenceDetails,AttendenceSheetDetails);
  }
  getAttendanceDetails()
  {
    return this.apiService.getData(this.urlgetAttendenceDetails);

  }

  getAttendenceDetails(AttendenceId: number) {
    return this.apiService.getData(this.urlGetAttendance+ '/' + AttendenceId);
  }
}
