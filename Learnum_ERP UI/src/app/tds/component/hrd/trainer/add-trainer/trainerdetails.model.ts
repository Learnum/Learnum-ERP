export class TrainerDetailsModel {
    trainerId: number;
    courseId: number;
    branchId: number;
    batchId: number;
    subjectName: string;
    trainerName: string;
    isActive: boolean;
    addedBy: number | null;
    addedDate: Date | null;
    updatedBy: number | null;
    updatedDate: Date | null;
}