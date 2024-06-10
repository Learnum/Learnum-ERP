import { CommunicationDetailTypeMappingModel } from "./communication-detail-type-mapping.model";
import { CommunicationDetailsModel } from "./communication-details.model";
import { UserCommunicationMappingModel } from "./user-communication-mapping.model";

export class UserCommunicationDetailsModel
    {
        public companyFinancialId:number;
        public emailTemplateType:number;
        public companyName:string;
        public companyLink:string;
        public userId:number;
        public notificationData: string;
        public communicationDetails: CommunicationDetailsModel;
        public communicationDetailTypeMapping: CommunicationDetailTypeMappingModel[];
        public userCommunicationMapping: UserCommunicationMappingModel[];

        constructor()
        {
            this.communicationDetails = new CommunicationDetailsModel();
            this.communicationDetailTypeMapping = [];
            this.userCommunicationMapping = [];

        }

    }