
export class SubjectModel {
  courseId: number;
  subjectId: number;
  subjectName: string;
  subjectDescription: string;
  isActive: boolean;
  addedBy: number | null;
  addedDate: Date | null;
  updatedBy: number | null;
  updatedDate: Date | null;
  computerName: string;
}