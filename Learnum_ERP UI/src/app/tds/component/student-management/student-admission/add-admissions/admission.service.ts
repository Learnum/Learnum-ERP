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
  private urlgetBatchDetailsByBranchId: string = "StudentAdmissionsDetails/getBatchDetails";
  private urlgetAddStudentList: string = "StudentDetails/getAllStudentList";
  private urlGetAddStudentList: string = "StudentDetails/getStudentDetails";

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
  getBatchDetailsByBranchId(branchId: number) {
    return this.apiService.getData(this.urlgetBatchDetailsByBranchId + '/' + branchId);
  }
  getAddStudentList() {
    return this.apiService.getData(this.urlgetAddStudentList);
  }
  getAddStudentDetailsByStudentId(studentId: number) {
    return this.apiService.getData(this.urlGetAddStudentList + '/' + studentId);
  }
}