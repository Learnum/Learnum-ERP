export class UserListForStatusChanges{
    userFinancialId: number | null;
    userId: number | null;
    investmentSubmissionId: number;
    investmentCycleId: number | null;
    investmentCycleTypeId: number | null;
    companyFinancialId: number;
    userInvestMentmappingId: number;
    isSubmitted: boolean;
    isSubmitAllow: boolean;
    isResend: number;
    isConsider: number;
    emailId:string;
    mobileNo:string;
    employeeName:string;
}

export class UserListForStatusChangesVM {
    userListForStatusChanges: Array<UserListForStatusChanges>;
}