
export class RegistrationMaster{
    userId: number;
    userName: string;
    emailId: string;
    mobileNo: number;
    passwordHash: string;
    isAdmin : boolean;
    isActive : boolean;
    createdBy: number | null;
    createdDate: Date | string | null;
    udatedBy: number | null;
    updatedDate: Date | string | null;
}