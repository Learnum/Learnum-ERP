export class TrainerDetailsModel {
    TrainerId: number;
    CourseId: number;
    BranchId: number;
    BatchId: number;
    SubjectId: number;
    SubjectName: string;
    BranchName: string;
    BatchName: string;
    CourseName: string;
    TrainerName: string;
    isActive: boolean;
    AddedBy: number | null;
    AddedDate: Date | null;
    UpdatedBy: number | null;
    UpdatedDate: Date | null;
}