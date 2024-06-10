export class ITDeclarationSearchParametersModel {
    isSubmitted: boolean;
    isResend:boolean;
    companyFinancialId: number;
    investmentCycleTypeId: number;
    iTDeclarationTypeId:number;
    pageSize: number | null;
    pageNumber: number | null;
    searchText: string;
    departmentId: number | null;
}