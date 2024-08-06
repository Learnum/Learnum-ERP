export class StudentAdmissionsModel{
    admissionId: number;
    dateOfAdmission: string;
    courseId: number;
    branchId: number;
    batchId: number;
    studentId: number;
    isActive: boolean;
    addedBy: number | null;
    addedDate: Date | null;
    updatedBy: number | null;
    updatedDate: Date | null;
    computerName: string;
}