import { Injectable } from '@angular/core';
import { APIService } from 'src/app/core/services/apiService';
import { BaseModel } from 'src/app/ERP/model/BaseModel';
import { SubjectModel } from './add-subject.model';

@Injectable({
  providedIn: 'root'
})
export class AddSubjectsService extends BaseModel{

  
  private urlInsertSubjectDetails: string = "SubjectDetails/InsertSubjectDetails";
  private urlgetSubjectDetails: string = "SubjectDetails/getAllSubjectList";
  private urlGetSubject: string = "SubjectDetails/getSubjectDetails";
  private urlgetCourseList: string = "CourseDetails/getAllCourseList";


  constructor(private apiService: APIService) {
    super();
  }

  insertSubjectDetails(subjectDetails: SubjectModel) {
    return this.apiService.postBlob(this.urlInsertSubjectDetails,subjectDetails);
  }
  getSubjectList() {
    return this.apiService.getData(this.urlgetSubjectDetails);
  }
  getClassroomList() {
    return this.apiService.getData(this.urlgetCourseList);
  }
  getSubjectDetails(subjectId: number) {
    return this.apiService.getData(this.urlGetSubject + '/' + subjectId);
  }
  
}
