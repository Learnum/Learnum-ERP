export class ResetPasswordModel {
    UserId: number | null;
    Password: string; // as old password
    NewPassword:string;
    IsActive: boolean | null;
    CreatedBy: number | null;
    CreatedDate: Date | string | null;
    UpdatedBy: number | null;
    UpdatedDate: Date | string | null;
}