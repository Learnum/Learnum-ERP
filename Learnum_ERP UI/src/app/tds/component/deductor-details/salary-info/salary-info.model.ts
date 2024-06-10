 export class SalaryInfoModel
{
    SalaryInfoId:number;
    EntryType:number;
    DeductorId:number;
    SalarySectionName: string;
    SalarySectionTypeId:number;
    IsActive:Boolean;
    AddedBy: number | null;
    AddeDate: Date | string | null;
    UpdatedBy: number | null;
    UpdatedDate: Date | string | null; 
}