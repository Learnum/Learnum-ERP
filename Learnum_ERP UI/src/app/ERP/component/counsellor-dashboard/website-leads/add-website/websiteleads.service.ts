import { Injectable } from '@angular/core';
import { APIService } from 'src/app/core/services/apiService';
import { WebsiteLeadDetails } from './websiteleads.model';

@Injectable({
  providedIn: 'root'
})
export class WebsiteleadsService {

  private urlInsertWebsiteDetails: string = "WebsiteLeadDetails/InsertWebsiteLeadDetails";
  private urlgetWebsiteLeadDetails: string = "WebsiteLeadDetails/getAllWebsiteLeadList";
  private urlGetWebsiteLeadList: string = "WebsiteLeadDetails/getWebsiteLeadDetails";
  private urlgetCourseList: string = "CourseDetails/getAllCourseList";

  constructor(private apiService: APIService) { }

  insertWebsiteDetails(websiteLeadDetails: WebsiteLeadDetails) {
    return this.apiService.postBlob(this.urlInsertWebsiteDetails,websiteLeadDetails);
  }
  getWebsiteList() {
    return this.apiService.getData(this.urlgetWebsiteLeadDetails);
  }
  getClassroomList() {
    return this.apiService.getData(this.urlgetCourseList);
  }
  getWebsiteLeadList(studentId: number) {
    return this.apiService.getData(this.urlGetWebsiteLeadList + '/' + studentId);
  }
}
