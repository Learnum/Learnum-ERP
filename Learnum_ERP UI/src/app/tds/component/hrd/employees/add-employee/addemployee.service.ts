import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/core/services/baseService';
import { Observable } from 'rxjs-compat';
import{EmployeeDetails} from './add-employee.model'
import { APIService } from 'src/app/core/services/apiService';

@Injectable({
  providedIn: 'root'
})
export class addemployeeService extends BaseService {


  private urlInsertEmployee: string = "EmployeeDetails/insertEmployeeDetails";
  private urlGetEmployee: string = "EmployeeDetails/getEmployeeDetails";
  private urlgetEmployeeList: string = "EmployeeDetails/getAllEmployeeList";

  constructor(private apiService: APIService) {
    super();
   }

  insertEmployeeData(EmployeeDetails: EmployeeDetails) {
    return this.apiService.postData(this.urlInsertEmployee, EmployeeDetails);
  }

  getEmployeeDetails(EmployeeDetailId: number) {
    return this.apiService.getData(this.urlGetEmployee + '/' + EmployeeDetailId);
  }

  getEmployeeList() {
    return this.apiService.getData(this.urlgetEmployeeList);
  }
}
