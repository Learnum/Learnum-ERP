import { Injectable } from '@angular/core';
import { APIService } from 'src/app/core/services/apiService';


@Injectable({providedIn:'root'})
export class DeductorDetailsService {
  private urlGetUserList: string = "";
  private urlGetViewUserSelectList: string = "";
  private urlSaveUser: string = "";
  private getAllStatesURL : string = "ApplicationMaster/GetAllStates";
  private getDeductorTypeURL : string = "ApplicationMaster/GetDeductorType";
  private getDepartmentURL : string = "ApplicationMaster/GetAllDepartment";
  private getStatusURL : string = "ApplicationMaster/GetAllStatus";
  constructor(private apiService: APIService){

  }
 getAllStates(){
  return this.apiService.getData(this.getAllStatesURL);
 }

 getDeductorType(){
  return this.apiService.getData(this.getDeductorTypeURL);
 }

 getDepartment(){
  return this.apiService.getData(this.getDepartmentURL);
 }

 getStatus(){
  return this.apiService.getData(this.getStatusURL);
 }

 
}
