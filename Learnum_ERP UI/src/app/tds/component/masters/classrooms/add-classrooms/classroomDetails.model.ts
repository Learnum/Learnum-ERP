export class ClassroomModel {
    [x: string]: any;
    branchId: number;
    classroomId: number;
    classroomName: string;
    studentCapacity: number;
    isActive: boolean;
    addedBy: number | null;
    addedDate: Date | null;
    updatedBy: number | null;
    updatedDate: Date | null;
    computerName: string;
}