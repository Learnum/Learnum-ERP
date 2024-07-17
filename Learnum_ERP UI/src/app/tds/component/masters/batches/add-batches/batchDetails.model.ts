export class BatchesDetailsModel {
    batchId: number;
    branchId: number;
    courseId: number;
    classroomId: number;
    batchName: string;
    courseFeesInstallment: number;
    oneTimeCourseFees: string;
    startOn: string;
    endOn: string;
    isActive: boolean;
    startTime: string;
    endTime: string;
    addedBy: number | null;
    addedDate: Date | null;
    updatedBy: number | null;
    updatedDate: Date | null;
    computerName: string;
}

export class InstallMentDetailsModel {
    installmentId: number;
    installmentNumber: number;
    dueDate: string;
    installmentAmount: number;
}

export class BatchesDetailsReqModel
{
    installMentDetailsModel: InstallMentDetailsModel[] | null;
     batchesDetailsModel: BatchesDetailsModel | null;
  

//     constructor(installMentModel: InstallMentModel, batchesDetailsModel: BatchesDetailsModel) {
//         this.installMentModel = installMentModel;
//         this.batchesDetailsModel = batchesDetailsModel;
// }
}