import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIService } from 'src/app/core/services/apiService';
import { BaseService } from 'src/app/core/services/baseService';
import { ContentWriterDetailsModel } from '../addcontentWriter.model';

@Injectable({
  providedIn: 'root'
})
export class AddcontentWriterService extends BaseService{

  private httpClientWithoutInterceptor: HttpClient;

  private urlInsertContentWriterDetails: string = "ContentWriterDetails/InsertContentWriterDetails";
  private urlContentWriterList: string = "ContentWriterDetails/getAllContentWriterList";
  private urlgetCourseList: string = "CourseDetails/getAllCourseList";
  private urlgetSubjectList: string = "SubjectDetails/getAllSubjectList";
  private urlGetContentWriter: string = "ContentWriterDetails/getContentWriterDetails";


  constructor(private apiService: APIService, private httpBackend: HttpBackend) {
    super();
    this.httpClientWithoutInterceptor = new HttpClient(httpBackend);
  }

  insertContentWriterData(branchContentWriterDetails: ContentWriterDetailsModel) {
    return this.apiService.postBlob(this.urlInsertContentWriterDetails,branchContentWriterDetails);
  }
  getContentWriterList(){
    return this.apiService.getData(this.urlContentWriterList);
  }
  getcourseList() {
    return this.apiService.getData(this.urlgetCourseList);
  }

  getsubjectList() {
    return this.apiService.getData(this.urlgetSubjectList);
  }

  getContentWriterDetails(ContentWriterId: number) {
    return this.apiService.getData(this.urlGetContentWriter+ '/' + ContentWriterId);
  }
}
