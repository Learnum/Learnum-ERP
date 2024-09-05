
export class SubjectModel {
  courseId: number;
  subjectId: number;
  subjectName: string;
  subjectDescription: string;
  isActive: boolean;
  AddedBy: number | null;
  AddedDate: Date | null;
  UpdatedBy: number | null;
  UpdatedDate: Date | null;
  computerName: string;
}