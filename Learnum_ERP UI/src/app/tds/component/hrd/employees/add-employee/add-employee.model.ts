export class EmployeeDetailsModel {
    EmployeeId: number;
    EmployeeName: string;
    Email: string;
    EmployeePhone: number;
    AadharNumber: number;
    DateOfBirth: string | null;
    Qualification: string;
    BloodGroup: string;
    Gender: string;
    // filePath: string;
    // employeePhoto: string;
    file: File;
    Address: string;
    City: string;
    State: string;
    PostalCode: number;
    Role: string;
    IsActive: boolean;
    addedBy: number | null;
    addedDate: Date | null;
    updatedBy: number | null;
    updatedDate: Date | null;
    computerName: string;
}
