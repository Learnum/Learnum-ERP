import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIService } from 'src/app/core/services/apiService';
import { BaseService } from 'src/app/core/services/baseService';
import { schedulepracticalmodel } from './schedulepracticalmodel';

@Injectable({
  providedIn: 'root'
})
export class SchedulePracticalProblemService extends BaseService{

  private urlgetBranchList: string = "BranchDetails/getAllBranchList";
  private urlgetCourseList: string = "CourseDetails/getAllCourseList";
  private urlgetSubjectList: string = "SubjectDetails/getAllSubjectList";
  private urlgetBatchList: string = "BatchesDetails/getAllBatchesList";
  private urlGetScheduleList: string = "ShedulePracticalExam/getGetShedulePracticalDetailsById";
  private urlgetPracticalProblemList: string = "ShedulePracticalExam/getShedulePracticalExamList";
  private urlInsertScheduleDetails: string = "ShedulePracticalExam/ShedulePracticalExam";


  constructor(private apiService: APIService) {
    super();
  }

  insertScheduleProblemData(SchedulePracticalProblemDetails: schedulepracticalmodel) {
    return this.apiService.postBlob(this.urlInsertScheduleDetails,SchedulePracticalProblemDetails);
  }
  getBranchList() {
    return this.apiService.getData(this.urlgetBranchList);
  }
  getcourseList() {
    return this.apiService.getData(this.urlgetCourseList);
  }
  getsubjectList() {
    return this.apiService.getData(this.urlgetSubjectList);
  }
  getBatchList(){
    return this.apiService.getData(this.urlgetBatchList);
  }
  getScheduleProblemDetails(schedulePracticalExamId:number){
    return this.apiService.getData(this.urlGetScheduleList+ '/' + schedulePracticalExamId);
  }
  getPracticalProblemList(){
    return this.apiService.getData(this.urlgetPracticalProblemList);
  }
}
