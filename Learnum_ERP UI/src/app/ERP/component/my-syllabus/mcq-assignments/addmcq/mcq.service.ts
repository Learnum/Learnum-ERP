import { Injectable } from '@angular/core';
import { APIService } from 'src/app/core/services/apiService';
import { observable } from 'rxjs';
import { BaseService } from 'src/app/core/services/baseService';

@Injectable({
  providedIn: 'root'
})
export class McqService extends BaseService{

 
  private urlgetCourseList: string = "CourseDetails/getAllCourseList";
  private urlgetSubjectList: string = "SubjectDetails/getAllSubjectList";
  private urlInsertMcqDetails: string = "McqDetails/InsertMcqDetails";
  private urlgetAddMCQDetailsById: string = "McqDetails/getMcqDetailsById";
  private urlgetMcqList: string = "McqDetails/getAllMcqDetails";
  private urlgetTopicList : string = "TopicDetails/getAllTopicList";

  constructor(private apiService: APIService) {
    super();
  }

  insertMcqData(data: any) {
    return this.apiService.postData(this.urlInsertMcqDetails,data);
  }

  getAddMCQDetailsById(McqId: number) {
    return this.apiService.getData(this.urlgetAddMCQDetailsById + '/' + McqId);
  }

 getMcqDetails()
  {
    return this.apiService.getData(this.urlgetMcqList);
  }

  getcourseList() {
    return this.apiService.getData(this.urlgetCourseList);
  }

  getTopicList()
  {
    return this.apiService.getData(this.urlgetTopicList);
  }

  getsubjectList() {
    return this.apiService.getData(this.urlgetSubjectList);
  }

}
