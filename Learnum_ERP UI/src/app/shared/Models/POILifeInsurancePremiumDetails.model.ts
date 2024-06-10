import { POIDocument } from "./poiDocument.model";
export class POILifeInsurancePremium {
    UserLicMappingId: number;
    LipId: number;
    SumAssured: string;
    PolicyCommencementDate: Date | string | null;
    PolicyPaymentDate: Date | string | null;
    PolicyNumber: string;
    PaidForType: number;
    PremiumPaid: string;
    Disability: boolean | null;
    InvestmentSubCategoryId: number;
    UserInvestmentMappingId: number | null;
    QualifiedAmount: number | null;
    IsActive: boolean | null;
    poiStatusId: number | null;
    AdviserRemark: string | null;
    CreatedBy: number;
    CreatedDate: Date | string | null;
    UpdatedBy: number;
    UpdatedDate: Date | string | null;
}
export class LifeInsurancePremiumTotal {
    LIPId: number | null;
    TotalAmountAsPerDocument: number | null;
    TotalQualifiedAmount: number | null;
    TotalPremiumPaid: number | null;
    CreatedBy: number | null;
    UpdatedBy: number | null;
    CreatedDate: Date | string | null;
    UpdatedDate: Date | string | null;
}
export class POILifeInsurancePremiumAccepted{
    UserLicMappingId :number;
    LipId :number;
    SumAssured :string;
    PolicyCommencementDate :Date | string | null;
    PolicyPaymentDate :Date | string | null;
    PolicyNumber:number;
    PaidForType:number;
    //PremiumPaid :string;
    Disability :boolean | null;
    InvestmentSubCategoryId: number;
    UserInvestmentMappingId: number | null;
    QualifiedAmount:number|null;
    IsActive :boolean | null;  
    CreatedBy :number;
    CreatedDate :Date | string | null;
    UpdatedBy :number;
    UpdatedDate :Date | string | null;
    IsAccepted :boolean | null;  



}



export class POILIP {
    LifeInsurancePremiumTotal: LifeInsurancePremiumTotal | null;
    POILifeInsurancePremium: POILifeInsurancePremium | null;
    lstPOILifeInsurancePremium: POILifeInsurancePremium[] | null;
    POIDocument: POIDocument[] | null;
}