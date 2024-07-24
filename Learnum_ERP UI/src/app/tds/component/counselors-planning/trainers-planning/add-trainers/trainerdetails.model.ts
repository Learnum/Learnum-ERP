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
    addedBy: number | null;
    addedDate: Date | null;
    updatedBy: number | null;
    updatedDate: Date | null;
}