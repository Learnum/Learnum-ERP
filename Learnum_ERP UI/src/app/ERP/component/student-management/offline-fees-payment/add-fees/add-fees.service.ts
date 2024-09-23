import { Injectable } from '@angular/core';
import { APIService } from 'src/app/core/services/apiService';
import { BaseService } from 'src/app/core/services/baseService';
import { addfeesModel } from './addfeesmodel';

@Injectable({
  providedIn: 'root'
})
export class AddFeesService extends BaseService{
 
  private urlInsertfeesDetails: string = "OfflineFeesDetails/InsertOfflineFeesDetails";
  private urlgetfeesList: string = "OfflineFeesDetails/getOfflineFeesDetailsList";
  private urlGetofflineFeesListByID: string = "OfflineFeesDetails/GetOfflineFeesDetailsByID";

  private urlgetAddStudentList: string = "StudentDetails/getAllStudentList";
  private urlgetCourseList: string = "StudentAdmissionsDetails/GetAllCourses";
  private urlgetBranchList: string = "StudentAdmissionsDetails/GetAllBranches";
  private urlgetBatchDetailsByBranchId: string = "StudentAdmissionsDetails/getBatchDetails";
  private urlGetBatchDtails: string = "BatchesDetails/getBatchDetails";

   constructor(private apiService: APIService) {
    super();
  }
  
  getfeesList() {
    return this.apiService.getData(this.urlgetfeesList);
  }
  insertfeesDetails(OfflineFessDetails: addfeesModel) {
    return this.apiService.postBlob(this.urlInsertfeesDetails,OfflineFessDetails);
  }
  getOfflineFessDetailsById(OfflineFeesPaymentId:number){
    return this.apiService.getData(this.urlGetofflineFeesListByID+ '/' + OfflineFeesPaymentId);
  }
  getAddStudentList() {
    return this.apiService.getData(this.urlgetAddStudentList);
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
