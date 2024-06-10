export class EmployeeCompanyDetailsModel {
    UserFinancialYearWiseDetailsId: number;
    UserFinancialId: number | null;
    CompanyFinancialId:number|null;
    UserId:number|null;
    Password:number|null;
    EmpId: string;
    CompanyId: number | null;
    DepartmentId: number | null;
    RoleId: number | null;
    Department:string;
    Address: string;
    Designation: string;
    DateOfJoin: Date | string | null;
    IsActive: boolean | null;
    CreatedBy: number | null;
    CreatedDate: Date | string | null;
    UpdatedBy: number | null;
    UpdatedDate: Date | string | null;
    ReportingManager: string;
    EmployeeTypeDetailsId:number|null;
}