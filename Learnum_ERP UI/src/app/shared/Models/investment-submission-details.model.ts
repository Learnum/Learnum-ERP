export class InvestmentSubmissionDetailsModel {
    investmentSubmissionId: number;
    enteredAmount: number | null;
    qualifiedAmount: number | null;
    taxableAmount: number | null;
    tDSAmount: number | null;
    userComment: string;
    acceptedAmount: number | null;
    isAccepted: string;
    reason: string;
    isActive: boolean | null;
    createdBy: number | null;
    createdDate: Date | string | null;
    updatedBy: number | null;
    updatedDate: Date | string | null;
    investmentSubCategoryId: number | null;
    userInvestmentMappingId: number | null;
    employerDefinedAmount:number|null;
    particulars: string;
    InvestmentCategoryId:number|null;
}