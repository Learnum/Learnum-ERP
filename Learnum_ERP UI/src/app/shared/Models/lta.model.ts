import { POIDocument } from "./poiDocument.model";

export class LTA {
    LTAId: number | null;
    TotalRentPaid: number | null;
    UserInvestmentMappingId: number | null;
    CreatedBy: number | null;
    UpdatedBy: number | null;
    CreatedDate: Date | string | null;
    UpdatedDate: Date | string | null;
}

export class LTADetails {
    LTADetailsId: number | null;
    JourneyStartDate: Date | string | null;
    JourneyEndDate: Date | string | null;
    BlockUtilizedEarlierId: number;
    JourneyModeId: number;
    JourneyStartPlace: string;
    JourneyEndPlace: string;
    LTAId: number | null;
    QualifiedAmount: number | null;
    poiStatusId: number |null;
    AdviserRemark: string |null;
    CreatedBy: number | null;
    UpdatedBy: number | null;
    CreatedDate: Date | string | null;
    UpdatedDate: Date | string | null;
}

export class POILTA {
    LTA: LTA | null;
    LTADetails: LTADetails | null;
    lstLTADetails: LTADetails[] | null;
    POIDocument: POIDocument[] | null;
}