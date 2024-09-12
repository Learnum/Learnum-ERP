export class SendFeesReminderModel {
    SendFeesId: number;
    CourseId: number;
    BranchId: number;
    BatchId: number;
    DueDate: string;
    InstallmentAmount: number;
    IsActive: boolean;
    StudentPhone: number;
    AddedBy: number | null;
    AddedDate: Date | null;
    UpdatedBy: number | null;
    UpdatedDate: Date | null;
    ComputerName: string;
}