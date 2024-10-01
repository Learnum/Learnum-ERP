export class EmployeeDetailsModel {
    EmployeeId: number;
    EmployeeName: string;
    Email: string;
    EmployeePhone: number;
    AadharNumber: number;
    DateofBirth: string | null;
    Qualification: string;
    BloodGroup: string;
    Gender: string;
    file: File;
    Address: string;
    City: string;
    StateId: number;
    PostalCode: number;
    Role: string;
    IsActive: boolean | null;
    AddedBy: number | null;
    AddedDate: Date | null;
    UpdatedBy: number | null;
    UpdatedDate: Date | null;
    ComputerName: string;
}
