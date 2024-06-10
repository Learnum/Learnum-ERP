import { POIDocument } from "./poiDocument.model";

export class HRA {
    HRAId: number | null;
    TotalHRAReceived: number | null;
    TotalRentPaid: number | null;
    TotalExemptedHRA: number | null;
    TotalTaxableHRA: number | null;
    UserInvestmentMappingId: number | null;
    CreatedBy: number | null;
    UpdatedBy: number | null;
    CreatedDate: Date | string | null;
    UpdatedDate: Date | string | null;
}

export class HRADetails{
    HRADetailsId: number | null;
    NameOfLandlord: string | null;
    PanOfLandlord: string | null;
    PinCode: number | null;
    Address: string | null;
    CityId: number | null;
    IsMetro: boolean | null;
    RentStartDate: Date | string | null;
    RentEndDate: Date | string | null;
    HRAId: number | null;
    TotalMonthlyRentPaid: number | null;
    CreatedBy: number | null;
    UpdatedBy: number | null;
    CreatedDate: Date | string | null;
    UpdatedDate: Date | string | null;
    poiStatusId:number |null;
    TotalMonthlyRentAccepted: number | null;
    AdviserRemark : string | null;
}

export class RentForMonths{
    RentForMonthId : number | null;
    MonthName: string | null;
    RentAmount: number | null;
    HRADetailsId: number | null;
    CreatedBy: number | null;
    UpdatedBy: number | null;
    CreatedDate: Date | string | null;
    UpdatedDate: Date | string | null;
}

export class ITDHouseRentAllowace{
    HRA: HRA | null;
    HRADetails : HRADetails| null;
    RentForMonths: RentForMonths[] | null;
    lstHRADetails: HRADetails[] | null;
}

export class POIHouseRentAllowace{
    HRA: HRA | null;
    HRADetails : HRADetails| null;
    RentForMonths: RentForMonths[] | null;
    lstHRADetails: HRADetails[] | null;
    POIDocument: POIDocument[] | null;
    
}