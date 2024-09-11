export class SyllabusDetailsModel {
    syllabusId: number;
    courseId: number;
    subjectId: number;
    topicName: string;
    isActive: boolean;
    AddedBy: number | null;
    AddedDate: Date | null;
    UpdatedBy: number | null;
    UpdatedDate: Date | null;
    computerName: string;
}

export class TopicInformationModel  {
    topicId: number;
    heading: string;
    content: string;
    reference: string;
    subTopic: string;
}

export class SyllabusList {
    syllabusDetailsModel: SyllabusDetailsModel;
    topicInformationModel: TopicInformationModel[];
    
  }
