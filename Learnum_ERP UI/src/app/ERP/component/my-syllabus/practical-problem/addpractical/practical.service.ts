import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIService } from 'src/app/core/services/apiService';
import { PracticalListModel, QuestionDetailsModel } from './PracticalDetailsModel';
import { BaseService } from 'src/app/core/services/baseService';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PracticalService extends BaseService {

  private urlgetCourseList: string = "CourseDetails/getAllCourseList";
  private urlInsertPracticalDetails: string = "CourseDetails/getAllCourseList";
  private urlgetSubjectList: string = "SubjectDetails/getAllSubjectList";
  private urlgetTopicList : string = "TopicDetails/getAllTopicList";

  httpClientWithoutInterceptor: HttpClient;
  


  constructor(private apiService: APIService, private httpBackend: HttpBackend) {
    super();
    this.httpClientWithoutInterceptor = new HttpClient(httpBackend);
  }

  insertPracticalproblemData( practicalListModel:PracticalListModel) : Observable<any> {
  
   
    const formData: FormData = new FormData();
    formData.append('questionDetailsModel', JSON.stringify(PracticalListModel));
    formData.append('practicalProblemsMasterModel', JSON.stringify(PracticalListModel));


    formData.append('File', QuestionDetailsModel.File[0]);
    console.log(formData);
    return this.apiService.postData(this.urlInsertPracticalDetails,FormData);
  }


  getcourseList() {
    return this.apiService.getData(this.urlgetCourseList);
  }
  getsubjectList() {
    return this.apiService.getData(this.urlgetSubjectList);
  }

  getTopicList()
  {
    return this.apiService.getData(this.urlgetTopicList);
  }
}
