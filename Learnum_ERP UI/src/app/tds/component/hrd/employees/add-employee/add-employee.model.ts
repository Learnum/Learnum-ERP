export class EmployeeDetailsModel {
    employeeId: number;
    employeeName: string;
    employeePhone: number;
    email: string;
    aadharNumber: number;
    dateOfBirth: string;
    bloodGroup: string;
    gender: string;
    qualification: string;
    //filePath: string;
    //employeePhoto: string;
    file: File;
    address: string;
    city: string;
    state: string;
    postalCode: number;
    role: string;
    isActive: boolean;
    addedBy: number | null;
    addedDate: Date | null;
    updatedBy: number | null;
    updatedDate: Date | null;
    computerName: string;
}
