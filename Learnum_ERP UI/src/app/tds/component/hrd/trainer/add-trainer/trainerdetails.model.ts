export class TrainerDetailsModel {
    trainerId: number;
    courseName: string;
    subjectName: string;
    branchName: string;
    batchName: string;
    trainerName: string;
    trainerBatchName: string;
    isActive: boolean;
    role: string;
    addedBy: number | null;
    addedDate: Date | null;
    updatedBy: number | null;
    updatedDate: Date | null;
}