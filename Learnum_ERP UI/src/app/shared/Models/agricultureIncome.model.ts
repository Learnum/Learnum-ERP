import { AgricultureIncomeDetails } from "./agricultureIncomeDetails.model";
import { ExemptIncome } from "./exemptIncome.model";
import { OtherIncome } from "./OtherIncome.model";

export class AgricultureIncome {
   
    AgriIncomeId: number;
    GrossAgricultureReceipt: number | null;
    ExpenditureOnAgriculture: number | null;
    UnabsorbedAgriculturLoss: number | null;
    NetAgricultureReceipt: number | null;
    UserFinancialId: number | null;
    CompanyFinancialId:number|null;
    IsActive: boolean | null;
    AddedBy: number | null;
    UpdatedBy: number | null;
    AddedDate: Date | string | null;
    UpdatedDate: Date | string | null;
}

export class AgricultureIncomeData {
    public OtherIncomeList: Array<OtherIncome>;
    public ExemptIncomeList: Array<ExemptIncome>;
    public AgricultureIncome: AgricultureIncome;
    public AgricultureIncomeDetails: Array<AgricultureIncomeDetails>;
}