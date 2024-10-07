export class SyllabusDetailsModel {
  SyllabusId: number;
  CourseId: number;
  //CourseName:string;
  SubjectId: number;
  //SubjectName:string;
  TopicName: string;
  IsActive: boolean;
  AddedBy: number | null;
  AddedDate: Date | null;
  UpdatedBy: number | null;
  UpdatedDate: Date | null;
  ComputerName: string;
}

export class TopicInformationModel {
  TopicId: number;
  SyllabusId: number;
  Heading: string;
  Content: string;
  Reference: string;
  SubTopic: string;
  File: File;
  static File: any;
}

export class SyllabusListModel {
  syllabusDetailsModel: SyllabusDetailsModel | null;
  topicInformationModel: TopicInformationModel[] | null;
}

