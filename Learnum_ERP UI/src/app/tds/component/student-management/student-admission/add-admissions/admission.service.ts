import { Injectable } from '@angular/core';
import { APIService } from 'src/app/core/services/apiService';
import { StudentAdmissionsModel } from './addadmission.model';

@Injectable({
  providedIn: 'root'
})
export class AdmissionService {

  private urlInsertStudentDetails: string = "StudentAdmissionsDetails/InsertStudentAdmissionsDetails";
  private urlgetBranchList: string = "StudentAdmissionsDetails/GetAllBranches";
  private urlgetCourseList: string = "StudentAdmissionsDetails/GetAllCourses";

  constructor(private apiService: APIService) {}

  insertStudentData(studentAdmissionsModel: StudentAdmissionsModel) {
    return this.apiService.postBlob(this.urlInsertStudentDetails,studentAdmissionsModel);
  }
  getBranchList() {
    return this.apiService.getData(this.urlgetBranchList);
  }
  getCourseList() {
    return this.apiService.getData(this.urlgetCourseList);
  }


}