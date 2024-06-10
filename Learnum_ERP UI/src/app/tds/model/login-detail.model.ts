export class LoginDetailModel {
    LoginId: number;
    CompanyId: number | null;
    CompanyFinancialId: number | null;
    UserInvestmentMappingId: number | null;
    UserName: string;
    Password: string;
    LoginAttempt: number | null;
    Otp: number | null;
    OtpCreatedDate: Date | string | null;
    IsActive: boolean | null;
    CreatedBy: number | null;
    CreatedDate: Date | string | null;
    UpdatedBy: number | null;
    UpdatedDate: Date | string | null;
}