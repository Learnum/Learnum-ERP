export class POITrackingSearchParametersModel {
    isSubmitted: boolean;
    isConsider: boolean;
    isResend: boolean;
    companyFinancialId: number;
    userFinancialId:number;
    pOITrackingTypeId: number;
    investmentCycleTypeId: number;
    pageNumber: number;
    pageSize: number;
    searchText: string;
    ApprovalForResend:boolean;
    ApprovalForConsider:boolean;
    departmentId: number | null;
    advisorUserFinancialId:number;
    userInvestMentmappingId:number;
// ITD_UserInvestmentMappingId:number;
// POI_UserInvestmentMappingId:number;
}