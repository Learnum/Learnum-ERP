import { Time } from "@angular/common";

export class SeminarDetailsModel  {
    seminarId: number;
    collegeId: number;
    spockPerson: string;
    SeminarDate: string;
    SeminarTime: string;
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