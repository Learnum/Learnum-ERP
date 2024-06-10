export class InvestmentCycleMappingModel {
    UserInvestMentmappingId: number;
    IsActive: boolean | null;
    IsSubmitAllow:boolean|null;
    CreatedBy: number | null;
    CreatedDate: Date | string | null;
    UpdatedBy: number | null;
    UpdatedDate: Date | string | null;
    UserFinancialId: number | null;
    DeclarationTypeId:number|null;
    UserId: number | null;
    IsSubmitted: boolean | null;
    SubmittedDate: Date | string | null;
    regimeTypeId:number;
}