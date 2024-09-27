import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIService } from 'src/app/core/services/apiService';
import { BaseService } from 'src/app/core/services/baseService';
import { EmployeeDetailsModel } from './employee.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService extends BaseService {

 
  private httpClientWithoutInterceptor: HttpClient;

  private urlInsertEmployeeDetails: string = "EmployeeDetails/InsertEmployeeDetails";
  private urlgetEmployeeList: string = "EmployeeDetails/getAllEmployeeList";
  private urlgetEmployeeDetails: string = "EmployeeDetails/getemployeeDetailsById";


  constructor(private apiService: APIService, private httpBackend: HttpBackend) {
    super();
    this.httpClientWithoutInterceptor = new HttpClient(httpBackend);
  }

  insertEmployeeData(employeeDetails: EmployeeDetailsModel): Observable<any> {
    return this.apiService.postBlob(this.urlInsertEmployeeDetails, employeeDetails);
  }

  getEmployeeList(): Observable<any> {
    return this.apiService.getData(this.urlgetEmployeeList);
  }

  getEmployeeDetails(EmployeeDetailId: number) {
    return this.apiService.getData(this.urlgetEmployeeDetails + '/' + EmployeeDetailId);
  }
}
