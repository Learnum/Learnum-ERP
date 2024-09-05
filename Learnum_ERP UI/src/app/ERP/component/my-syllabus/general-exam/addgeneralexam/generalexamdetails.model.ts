export class GeneralExamDetailsModel {
    courseId: number;
    courseName: string;
    subjectName: string;
    examName: string;
    question: string;
    optionA: string;
    optionB: string;
    optionC: string;
    optionD: string;
    answer: string;
    attachment: string;
    marks: number;
    practicalProblem: boolean;
    status: string;
    generalExamStatus: string;
    isActive: boolean;
    addedBy: number | null;
    addedDate: Date | null;
    updatedBy: number | null;
    updatedDate: Date | null;
    computerName: string;
}
