export class Deduction80c{
    Deduction80CId:number;
    FY: string;
    IncomeTaxEfillingRequestId: number | null;
    InvestmentTypeId:number;
    Amount:number;
    IsActive: boolean;
    AddedBy: number | null;
    AddedDate: Date | string | null;
    UpdatedBy: number | null;
    UpdatedDate: Date | string | null;
}
export class Deduction80cView extends Deduction80c{
    InvestmentType:string
    public Deduction80CList: Array<Deduction80c>;
}