export class WorksheetDetailsModel {
    workId: number | null;
    name: string;
    email: string;
    date: string;
    role: string;
    TodaysWork :string;
    isActive: boolean | null;
    addedBy: number | null;
    addedDate: Date | null;
    updatedBy: number | null;
    updatedDate: Date | null;
    computerName: string;
}