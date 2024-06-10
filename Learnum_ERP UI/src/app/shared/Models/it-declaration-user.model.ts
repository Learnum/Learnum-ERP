export class ITDeclarationUserModel
{
    userFinancialId: number | null;
    investmentCycleId: number | null;
    companyFinancialId: number;
    userInvestMentmappingId: number;
    isSubmitted: boolean;
    submittedDate: Date | string;
    index: number;
    employeeId: string;
    employeeName: string;
    department: string;
    isResend:number;
    isConsider:number;
    isSubmitAllow:boolean;
    resendDate:Date|string;
    updatedBy:number;
    updatedDate:Date|string;
    roleId:number;
}