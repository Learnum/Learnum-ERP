export class ExemptIncome {
    ExemptIncomeId: number;
    UserFinancialId: number | null;
    CompanyFinancialId:number|null;
    ExemptIncomeTypeId: number | null;
    Narration: string;
    Amount: number | null;
    IsActive: boolean | null;
    AddedBy: number | null;
    UpdatedBy: number | null;
    AddedDate: Date | string | null;
    UpdatedDate: Date | string | null;
}