import { Injectable } from '@angular/core';
import { ConfigurationSettings } from 'src/app/core/models/configuration';
import { APIService } from 'src/app/core/services/apiService';
import { CommunicationDetailTypeMappingModel } from '../Models/communication-detail-type-mapping.model';
import { CommunicationType } from '../Models/communication-type.model';
import { UserCommunicationDetailsModel } from '../Models/user-communication-details.model';
import { UserCommunicationMappingModel } from '../Models/user-communication-mapping.model';

@Injectable({ providedIn: 'root' })

export class CommunicationService {
  urlInsertUserCommunicationDetails: string = "ITDeclaration/insertUserCommunicationDetails";
  urlUpdateUserCommunicationDetails: string = "ITDeclaration/updateUserCommunicationDetails";
  urlGetUserCommunicationDetails: string = "ITDeclaration/getUserCommunicationDetails";

  constructor(public apiService: APIService) { }

  public insertUserCommunicationDetails(userCommunicationDetails: UserCommunicationDetailsModel) {
    userCommunicationDetails.companyFinancialId = ConfigurationSettings.getCompanyFinancialId();
    userCommunicationDetails.companyName = ConfigurationSettings.getCompanyUrl();
    userCommunicationDetails.userId=ConfigurationSettings.getUserId();
    //userCommunicationDetails.companyLink = 'https://poi.taxblock.in/' + '' + userCommunicationDetails.companyName;
    return this.apiService.postData(this.urlInsertUserCommunicationDetails, userCommunicationDetails);
  }

  public updateUserCommunicationDetails(userCommunicationMappingViewModel: UserCommunicationMappingModel) {
    return this.apiService.postData(this.urlUpdateUserCommunicationDetails, userCommunicationMappingViewModel);
  }

  public getUserCommunicationDetails(isRead: boolean, communicationTypeId: CommunicationType) {
    let param = {
      userFinancialId: ConfigurationSettings.getUserFinancialId(),
      isRead: isRead,
      communicationTypeId: communicationTypeId
    };
    return this.apiService.postData(this.urlGetUserCommunicationDetails, param);
  }

  public generateUserCommunicationDetails(notification: any, userList: Array<any>): UserCommunicationDetailsModel {
    let userCommunicationDetails: UserCommunicationDetailsModel = new UserCommunicationDetailsModel();
    userCommunicationDetails.communicationDetails.createdBy = ConfigurationSettings.getUserFinancialId();
    userCommunicationDetails.communicationDetails.createdDate = new Date();

    if (notification=='email') {
      let emailCommunication = new CommunicationDetailTypeMappingModel();
      emailCommunication.communicationTypeId = CommunicationType.Email;
      userCommunicationDetails.communicationDetailTypeMapping.push(emailCommunication);
    }
    
    if (notification=='notification') {
      let inAppNotification = new CommunicationDetailTypeMappingModel();
      inAppNotification.communicationTypeId = CommunicationType.InAppNotification;
      userCommunicationDetails.communicationDetailTypeMapping.push(inAppNotification);
    }

    userList.forEach((item) => {
     
        let userCommunicationMappingModel = new UserCommunicationMappingModel();
        userCommunicationMappingModel.userFinancialId = item.userFinancialId;
        userCommunicationMappingModel.email = item.emailId;
        userCommunicationMappingModel.mobileNo = item.mobileNo;
        userCommunicationMappingModel.employeeName = item.employeeName;
        userCommunicationDetails.userCommunicationMapping.push(userCommunicationMappingModel);
      
    });
    return userCommunicationDetails;
  }

  public validateUserCommunicationDetails(userCommunicationDetails: UserCommunicationDetailsModel): string {
    let errorMessage: string = "";

    if (userCommunicationDetails.userCommunicationMapping.length < 1) {
      errorMessage = "Please select at least one user";
    }
    return errorMessage;
  }
}