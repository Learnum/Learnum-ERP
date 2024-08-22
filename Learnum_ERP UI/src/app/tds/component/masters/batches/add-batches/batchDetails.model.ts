export class BatchesDetailsModel {
    batchId: number;
    BatchId:number;
    BranchId: number;
    CourseId: number;
    ClassroomId: number;
    //batchName: string;
    BatchName:string;
    CourseName:string;
    BranchName:string;
    ClassroomName:string;
    courseFeesInstallment: number;
    oneTimeCourseFees: string;
    StartOn: string;
    EndOn: string;
    isActive: boolean;
   
    addedBy: number | null;
    addedDate: Date | null;
    updatedBy: number | null;
    updatedDate: Date | null;
    computerName: string;
}

export class InstallMentDetailsModel {
    InstallmentId: number;
    InstallmentNumber: number;
    DueDate: string;
    InstallmentAmount: number;
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