import { UserCommunicationMappingModel } from "./user-communication-mapping.model";

export class POIReleaseModel {
    investmentCycleId: number | null;
    UserFinancialId: number | null;
    applicableTo:number;
    applicableToName:string;
    code: string;
    displayName: string;
    startDate: Date | string | null;
    endDate: Date | string | null;
    isActive: boolean;
    createdBy: number | null;
    createdDate: Date | string | null;
    updatedBy: number | null;
    updatedDate: Date | string | null;
    companyFinancialId: number;
    investmentCycleTypeId: number;
    cycleType: String;
    pageNumber:number;
    pageSize:number;
    isMailSent:boolean;
    isSMSSent:boolean;
    isNotificationSent:boolean;
    gender:string;
}