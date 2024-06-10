export class POIDocument {
    investmentSubmissionSubCategoryFileDetailsId: number;
    investmentSubmissionSubCategoryDetailsId: number;
    userInvestmentMappingId: number;
    amountAsPerDocument: number;
    tdsAsPerDocument: number;
    documentName: string;
    documentPath: string;
    mimeType: string;
    isActive: boolean;
    acceptedAmount: number;
    acceptedTDS: number;
    poiStatusId: number;
    poiStatus: string;
    isAccepted: boolean;
    createdBy: number;
    createdDate: Date;
    updatedBy: number;
    updatedDate: Date;
    uploadedFile: File;
    employeeRemark: string;
    employerRemark: string;
    interestAmount: number;
    principalPaid: number;
    acceptedInterestAmount: number;
    acceptedPrincipalPaid: number;
    documentTypeId: number;
    totalQualifiedAmount: number;
    totalTaxableAmount: number;
    investmentSubCategoryId: number | null;
    declarationTypeId: number | null;

}