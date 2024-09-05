import { Injectable } from '@angular/core';
import { APIService } from 'src/app/core/services/apiService';
import { StudentCounsellingDetails } from './studentcounselling.model';
import { BaseService } from 'src/app/core/services/baseService';

@Injectable({
  providedIn: 'root'
})
export class StudentcounsellingService extends BaseService {

  private urlInsertStudentCounsellingDetails: string = "StudentCounsellingDetails/InsertStudentCounsellingDetails";
  private urlgetStudentCounsellingDetails: string = "StudentCounsellingDetails/getAllStudentCounsellingList";
  private urlStudentLeadsdetails: string = "StudentLeadDetails/getAllStudentLeadList";
  private urlgetBranchList: string = "BranchDetails/getAllBranchList";
  private urlGetStudentCounselling: string = "StudentCounsellingDetails/getStudentCounsellingDetails";

  constructor(private apiService: APIService) { super(); }

  insertStudentCounsellingDetails(studentCounsellingDetails: StudentCounsellingDetails) {
    return this.apiService.postBlob(this.urlInsertStudentCounsellingDetails, studentCounsellingDetails);
  }
  getStudentCounsellingDetails() {
    return this.apiService.getData(this.urlgetStudentCounsellingDetails);
  }
  getStudentLeads() {
    return this.apiService.getData(this.urlStudentLeadsdetails);
  }
  getBranchList() {
    return this.apiService.getData(this.urlgetBranchList);
  }
  getStudentCounsellingList(counsellingId: number) {
    return this.apiService.getData(this.urlGetStudentCounselling + '/' + counsellingId);
  }
}
