export class InvestmentSubmissionHeaderModel {
    UserInvestmentMappingId: number;
    DeclarationTypeId: number;
    TotalQualifiedAmount : number;
    TotalEnteredAmount : number;
    CreatedBy: number | null;
    CreatedDate: Date | string | null;
    UpdatedBy: number | null;
    UpdatedDate: Date | string | null;
}