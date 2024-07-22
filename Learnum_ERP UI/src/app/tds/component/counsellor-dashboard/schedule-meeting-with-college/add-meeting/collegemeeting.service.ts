import { Injectable } from '@angular/core';
import { APIService } from 'src/app/core/services/apiService';
import { MeetingDetails } from './collegemeeting.model';

@Injectable({
  providedIn: 'root'
})
export class CollegemeetingService {

  private urlInsertMeetingDetails: string = "ScheduleMeetingDetails/InsertScheduleMeetingDetails";
  private getMeetingList: string = "ScheduleMeetingDetails/getAllScheduleMeetingList";

  private urlgetCollegesList: string = "AddColleges/getAllCollegesList";

  constructor(private apiService: APIService) {
    
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
}
