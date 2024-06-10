export class EmployeeSalaryDetailsPerquisitesModel
{
    UserFinancialDetailMappingId: number;
    UserId: number;
    UserFinancialId: number;
    FinancialYearMetadataId: number;
    Name: string;
    CompanyFinancialId: number;
    monthlyIncome: number;
    annulyIncome: number;
    monthlyRecoverable: number;
    annualRecoverable : number;
    IsActive: boolean;
    CreatedBy: number;
    CreatedDate: Date;
    UpdatedBy: number;
    UpdatedDate: Date;
}