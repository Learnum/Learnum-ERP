import { Injectable } from '@angular/core';
import { APIService } from 'src/app/core/services/apiService';
import { StudentLeadcalls } from './studentcalls.model';

@Injectable({
  providedIn: 'root'
})
export class StudentcallsService {

  private urlInsertStudentCallDetails: string = "StudentLeadCallDetails/InsertStudentLeadCallDetails";
  private urlgetStudentCallDetails: string = "StudentLeadCallDetails/getAllStudentLeadCallList";
  private urlStudentLeadsdetails: string = "StudentLeadDetails/getAllStudentLeadList";
  private urlGetStudentcall: string = "StudentLeadDetails/getStudentDetails";
  private urlgetBranchList: string = "BranchDetails/getAllBranchList";

  constructor(private apiService: APIService) { }

  insertStudentCallDetails(studentLeadCallDetails: StudentLeadcalls) {
    return this.apiService.postBlob(this.urlInsertStudentCallDetails, studentLeadCallDetails);
  }
  getStudentCallDetails() {
    return this.apiService.getData(this.urlgetStudentCallDetails);
  }
  getStudentLeads() {
    return this.apiService.getData(this.urlStudentLeadsdetails);
  }
 
  getBranchList() {
    return this.apiService.getData(this.urlgetBranchList);
  }
  getStudentDetails(callId: number) {
    return this.apiService.getData(this.urlGetStudentcall + '/' + callId);
  }
}
