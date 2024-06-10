

import { Injectable, OnDestroy } from "@angular/core";

import { BehaviorSubject, Observable } from 'rxjs';
import { ConfigurationSettings } from "src/app/core/models/configuration";
import { APIService } from "src/app/core/services/apiService";
import { MessageSendModel } from "src/app/shared/Models/message-send.model";
import { LayoutDetails } from "./layout-details.model";

@Injectable({providedIn:'root'})
export class TDSLayoutService {

  public currentLayoutDetails: BehaviorSubject<LayoutDetails> = new BehaviorSubject<LayoutDetails>(new LayoutDetails());
  public panAadhaarLinkStatus: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public allContentDetails: BehaviorSubject<any> = new BehaviorSubject<any>([]);
 
  private URLGetAllContent: string = "ContentConfigurationDetails/getallcontentconfigurationdetails";
  private URLGetUserListForMessage: string = "Message/getAdvisorNameList";
  urlOnSendMessageClick: string="Message/sendMessage";
  URLGetAllMessage:string="Message/getAllMessageList";
  URLGetAllAdvisorList:string ="Message/getAllAdvisorNameList";
  URLGetMessageCount:string="Message/getCount";
  constructor(public apiService: APIService,){}


  setCurrentLayoutData(data: any) {
    this.currentLayoutDetails.next(data);
  }
  setpanAadhaarLinkStatus(data: any) {
    this.panAadhaarLinkStatus.next(data);
  }
  setAllContentData(data: any) {
    this.allContentDetails.next(data);
  }

  GetAllContent(companyFinancialId, isFrom){
    return this.apiService.getData(this.URLGetAllContent + '/' + companyFinancialId + '/' + isFrom);
  }

  GetUserListForMessage()
  {
    let RoleId=Number(ConfigurationSettings.getUserRoleId());
    let ToUserFinancialId = Number(ConfigurationSettings.getUserFinancialId());
    let ToCompanyFinancialId = Number(ConfigurationSettings.getCompanyFinancialId());
    return this.apiService.getData(this.URLGetUserListForMessage + '/' + ToUserFinancialId + '/' + ToCompanyFinancialId + '/' + RoleId);
  }
  
  GetMessageCount()
  {
    let FromUserFinancialId = Number(ConfigurationSettings.getUserFinancialId());
    let FromCompanyFinancialId = Number(ConfigurationSettings.getCompanyFinancialId());
    return this.apiService.getData(this.URLGetMessageCount + '/' + FromUserFinancialId + '/' + FromCompanyFinancialId);
  }
  GetAllAdvisorList()
  {
    let FromUserFinancialId = Number(ConfigurationSettings.getUserFinancialId());
    let FromCompanyFinancialId = Number(ConfigurationSettings.getCompanyFinancialId());
    let CompanyFinancialId= Number(ConfigurationSettings.getCompanyFinancialId());
    let RoleId=Number(ConfigurationSettings.getUserRoleId());
    return this.apiService.getData(this.URLGetAllAdvisorList + '/' + FromUserFinancialId + '/' + FromCompanyFinancialId+'/'+RoleId +'/'+CompanyFinancialId);
  }
  onSendMessageClick(messageSendModel:MessageSendModel)
  {
    messageSendModel.createdBy = ConfigurationSettings.getUserId();
    messageSendModel.createdDate = new Date(Date.now());
    messageSendModel.updatedBy = ConfigurationSettings.getUserId();
    messageSendModel.updatedDate = new Date(Date.now());
    return this.apiService.postData(this.urlOnSendMessageClick, messageSendModel);

  }

  GetAllMessage(toCompanyFinancialId,toUserFinancialId,fromUserFinancialId,fromCompanyFinancialId,roleId)
  {
    return this.apiService.getData(this.URLGetAllMessage + '/' + toCompanyFinancialId + '/' + toUserFinancialId + '/' + fromUserFinancialId + '/' + fromCompanyFinancialId +'/'+roleId);

  }
}