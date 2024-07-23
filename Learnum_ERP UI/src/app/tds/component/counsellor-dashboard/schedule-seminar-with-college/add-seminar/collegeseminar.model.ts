export class SeminarDetailsModel  {
    seminarId: number;
    collegeId: number;
    spockPerson: string;
    seminarDate: string;
    seminarTime: string;
    seminarLocation: string;
    seminarStatus: string;
    seminarAgenda: string;
    isActive: boolean;
    addedBy: number | null;
    addedDate: Date | null;
    updatedBy: number | null;
    updatedDate: Date | null;
    computerName: string;
}