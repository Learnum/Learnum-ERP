export class QuestionDetailsModel  {
    PracticalId: number;
    CourseId: number;
    SubjectId: number;
    TopicId: number;
    IsActive: boolean;
    AddedBy: number;
    AddedDate: Date;
    UpdatedBy: number;
    UpdatedDate: Date;
  static File: any;
}

export class PracticalProblemsMasterModel {
    QuestionId: number;
    Question: string;
    ModelAnswer: string;
    Marks: number;
    Status: string;
}


export class PracticalListModel
{
    questionDetailsModel: QuestionDetailsModel| null;
    practicalProblemsMasterModel: PracticalProblemsMasterModel[] | null;
}