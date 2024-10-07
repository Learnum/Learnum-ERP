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
  private urlgetEmployeeList: string = "EmployeeDetails/getEmployeeDetailsList";
  private urlgetEmployeeDetails: string = "EmployeeDetails/getemployeeDetailsById";
  private getAllStatesURL: string = "ApplicationMaster/GetAllStates";

  constructor(private apiService: APIService, private httpBackend: HttpBackend) {
    super();
    this.httpClientWithoutInterceptor = new HttpClient(httpBackend);
  }

  insertEmployeeData(employeeDetails: EmployeeDetailsModel): Observable<any> {
    let employeeDetailsModel1 : EmployeeDetailsModel = new EmployeeDetailsModel()
    employeeDetailsModel1.EmployeeName = employeeDetails.EmployeeName ;
    employeeDetailsModel1.Email = employeeDetails.Email ;
    employeeDetailsModel1.EmployeePhone = employeeDetails.EmployeePhone ;
    employeeDetailsModel1.AadharNumber = employeeDetails.AadharNumber ;
    employeeDetailsModel1.DateofBirth = employeeDetails.DateofBirth ;
    employeeDetailsModel1.Qualification = employeeDetails.Qualification ;
    employeeDetailsModel1.BloodGroup = employeeDetails.BloodGroup ;
    employeeDetailsModel1.Gender = employeeDetails.Gender ;
    employeeDetailsModel1.Address = employeeDetails.Address ;
    employeeDetailsModel1.City = employeeDetails.City ;
    employeeDetailsModel1.StateId = employeeDetails.StateId ;
    employeeDetailsModel1.PostalCode = employeeDetails.PostalCode ;
    employeeDetailsModel1.Role = employeeDetails.Role ;
    employeeDetailsModel1.IsActive = employeeDetails.IsActive ;

   const formData: FormData = new FormData();
   formData.append('EmployeeDetailsModel', JSON.stringify(employeeDetails));
  
   formData.append('File', employeeDetails.file[0]);
   console.log(formData);
   return this.apiService.postBlob(this.urlInsertEmployeeDetails,formData);

  }

  getEmployeeList(): Observable<any> {
    return this.apiService.getData(this.urlgetEmployeeList);
  }

  getEmployeeDetails(EmployeeId: number) {
    return this.apiService.getData(this.urlgetEmployeeDetails + '/' + EmployeeId);
  }

  getAllStates() {
    return this.apiService.getData(this.getAllStatesURL);
  }
}
