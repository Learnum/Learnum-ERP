import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/core/services/baseService';
import{ EmployeeDetailsModel} from './add-employee.model'
import { APIService } from 'src/app/core/services/apiService';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs-compat';
import { observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddemployeeService extends BaseService {


  private httpClientWithoutInterceptor: HttpClient;

  private urlInsertEmployeeDetails: string = "BranchDetails/InsertBranchDetails";
  private urlgetEmployeeList: string = "BranchDetails/getAllBranchList";

  constructor(private apiService: APIService, private httpBackend: HttpBackend) {
    super();
    this.httpClientWithoutInterceptor = new HttpClient(httpBackend);
  }

  insertEmployeeData(employeeDetails: EmployeeDetailsModel) {
    //const URL = ConfigurationSettings.BASE_API_URL;
    return this.apiService.postBlob(this.urlInsertEmployeeDetails,employeeDetails);
  }

  getEmployeeList() {
    return this.apiService.getData(this.urlgetEmployeeList);

  }
  
}
