export class StudentAdmissionsModel{
    AdmissionId: number;
    DateOfAdmission: string;
    CourseId: number;
    BranchId: number;
    BatchId: number;
    StudentId: number;
    IsActive: boolean;
    FeesType: string;
    CourseFees: number;
    StudentPhone: number;
    AddedBy: number | null;
    AddedDate: Date | null;
    UpdatedBy: number | null;
    UpdatedDate: Date | null;
    ComputerName: string;
}
