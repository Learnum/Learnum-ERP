import { BaseModel } from "src/app/tds/model/BaseModel";

export class ChallanDetailsModal extends BaseModel {
    ChallanId: number;
    IsActive:boolean;
    BSRCode: number;
    DateOfTaxDeposite: number;
    ChallanNo: number;
    ChallanStatus: string;
    TDSAmount: number;
    EducationCess: number;
    Surcharge: number;
    TotalTaxDeposite: number;
    FeeAmount: number;
    InterestAmount: number;
    OtherPenaltyAmount: number;
    TotalAmount: number;
    PaymentTypeId: string;
    PaidBy: string;
    SectionCodeTypeId: string;
    AmountUtilized: number;
    BalanceAmount: number
}
