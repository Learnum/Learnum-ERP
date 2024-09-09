export class McqDetails  {
    mcqId: number;
    courseId: number;
    subjectId: number;
    topicId: number;
    isActive: boolean;
    addedBy: number | null;
    addedDate: Date | null;
    updatedBy: number | null;
    updatedDate: Date | null;
    computerName: string;
}


export class McqQuestionDetails {
    questionId: number;
    question: string;
    optionA: string;
    optionB: string;
    optionC: string;
    optionD: string;
    answer: string;
    marks: number;
    isActive: boolean;
}