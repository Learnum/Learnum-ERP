export class problemDetailsModel{
    questionId: number;
    question: string;
    modelAnswer: string;
    marks: number;
    isActive: boolean;
    FilePath: File;
    //mimeType: string;
    //documentName: string;
    //fileName: string;
    //filePath: string;
    addedBy: number | null;
    addedDate: Date | null;
    updatedBy: number | null;
    updatedDate: Date | null;
    computerName: string;
}

