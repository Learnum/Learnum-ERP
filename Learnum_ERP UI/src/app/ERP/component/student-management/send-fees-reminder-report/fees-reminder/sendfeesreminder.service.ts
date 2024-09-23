import { Injectable } from '@angular/core';
import { APIService } from 'src/app/core/services/apiService';
import { SendFeesReminderModel } from './sendfeespayment.model';
@Injectable({
  providedIn: 'root'
})
export class SendfeesreminderService {

  constructor(private apiService: APIService) { }

  private urlInsertSendFeesReminder: string = "SendFeesReminder/InsertSendFeesReminder";
  private urlgetSendFeesReminderList: string = "SendFeesReminder/getSendFeesReminderList";
  private urlgetSendFeesReminderBySendFeesId: string = "SendFeesReminder/GetSendFeesReminderBySendFeesId";
  private urlgetCourseList: string = "StudentAdmissionsDetails/GetAllCourses";
  private urlgetBranchList: string = "StudentAdmissionsDetails/GetAllBranches";
  private urlgetBatchDetailsByBranchId: string = "StudentAdmissionsDetails/getBatchDetails";
  private urlGetBatchDtails: string = "BatchesDetails/getBatchDetails";

  insertSendFeesReminder(SendFeesReminder: SendFeesReminderModel) {
    return this.apiService.postBlob(this.urlInsertSendFeesReminder,SendFeesReminder);
  }
  getSendFeesReminderList() {
    return this.apiService.getData(this.urlgetSendFeesReminderList);
  }
  getSendFeesReminderBySendFeesId(SendFeesId:number){
    return this.apiService.getData(this.urlgetSendFeesReminderBySendFeesId+ '/' + SendFeesId);
  }
  getCourseList() {
    return this.apiService.getData(this.urlgetCourseList);
  }
  getBranchList() {
    return this.apiService.getData(this.urlgetBranchList);
  }
  getBatchDetailsByBranchId(branchId: number) {
    return this.apiService.getData(this.urlgetBatchDetailsByBranchId + '/' + branchId);
  }
  getBatchDetails(BatchId: number) {
    return this.apiService.getData(this.urlGetBatchDtails + '/' + BatchId);
  }
}
