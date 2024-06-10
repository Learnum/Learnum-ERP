export class AgricultureIncomeDetails{
    AgriIncomeDetailsId: number;
    AgriIncomeId: number | null;
    District: string;
    PinCode: number | null;
    Measurement: number | null;
    OwnershipStatus: string;
    SourceOfWater: string;
    IsActive: boolean | null;
    AddedBy: number | null;
    UpdatedBy: number | null;
    AddedDate: Date | string | null;
    UpdatedDate: Date | string | null;
}