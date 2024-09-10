export class McqDetailsModel  {
    McqId: number;
    CourseId: number;
    SubjectId: number;
    CourseName: string;
    SubjectName: string;
    TopicId: number;
    TopicName:string;
    IsActive: boolean;
    AddedBy: number | null;
    AddedDate: Date | null;
    UpdatedBy: number | null;
    UpdatedDate: Date | null;
    computerName: string;
}


export class McqQuestionDetails {
    QuestionId: number;
    Question: string;
    optionA: string;
    optionB: string;
    optionC: string;
    optionD: string;
    Answer: string;
    marks: number;
    IsActive: boolean;
}

export class MCQDetailsList {
    mcqDetailsModel: McqDetailsModel;
    mcqQuestionDetails: McqQuestionDetails[];
    
  }