import { Injectable } from '@angular/core';
import { APIService } from 'src/app/core/services/apiService';
import { MeetingDetails } from './collegemeeting.model';
import { BaseService } from 'src/app/core/services/baseService';

@Injectable({
  providedIn: 'root'
})
export class CollegemeetingService extends BaseService {

  private urlInsertMeetingDetails: string = "ScheduleMeetingDetails/InsertScheduleMeetingDetails";
  private getMeetingList: string = "ScheduleMeetingDetails/getAllScheduleMeetingList";
  private urlgetCollegesList: string = "AddColleges/getAllCollegesList";
  private urlGetMettingDetails: string = "ScheduleMeetingDetails/getMeetingDetails";

  constructor(private apiService: APIService) {
    super();
  }

  insertMeetingDetails(scheduleMeetingDetails: MeetingDetails) {
    return this.apiService.postBlob(this.urlInsertMeetingDetails,scheduleMeetingDetails);
  }

  getCollegeMeetingList() {
    return this.apiService.getData(this.getMeetingList);
  }

  getCollegeList() {
    return this.apiService.getData(this.urlgetCollegesList);
  }
  getMettingDetails(meetingId: number) {
    return this.apiService.getData(this.urlGetMettingDetails + '/' + meetingId);
  }
}
