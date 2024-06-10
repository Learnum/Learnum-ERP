export class Deduction80DPOIDetails {
    Deduction80DDetailsId: number;
    Deduction80DId: number | null;
    Particulars: string;
    SelfAndFamily: number | null;
    Parents: number | null;
    EligibleSelf: number | null;
    EligibleParents: number | null;
    RemarkSelf:string;
    RemarkParents:string;
    SubCategoryIdSelf:number;
    SubCategoryIdParent:number;
    IsActive: boolean | null;
    AddedBy: number | null;
    AddedDate: Date | string | null;
    UpdatedBy: number | null;
    UpdatedDate: Date | string | null;
}