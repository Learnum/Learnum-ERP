import { NotYetLinkedModule } from "src/app/poi/component/employer/panaadhar-link-status/not-yet-linked/not-yet-linked.module";
import { CoOwners } from "./coOwners.model";
import { TenantDetails } from "./tenantDetails.model";
import { POIDocument } from "./poiDocument.model";

export class HouseProperty {
    housePropertyId: number;
    housePropertyType: string | null;
    userInvestmentMappingId: number | null;
    investmentSubCategoryId: number | null;
    estimatedAnualRentRecieved: number | null;
    grossAnualRentRecieved: number | null;
    municipalTaxPaid: number| null;
    unrealizedRent: number | null;
    interestPaidOnHousingLoan: number | null;
    principalPaidOnHP: number | null;
    totalEMIPaid: number | null;
    pinCode: number | null;
    address: string | null;
    town: string | null;
    stateId: string | null;
    countryId: string | null;
    nameofBank: string;
    panofBank: string;
    remarkofBank: string;
    nameofTenant: string;
    addressOfBank:string |null;
    panofTenant: string;
    remarkofTenant: string;
    poiStatusId : number;
    adviserRemark :string | null; 
    createdBy: number | null;
    updatedBy: number | null;
    createdDate: Date | string | null;
    updatedDate: Date | string | null;
    investmentSubmissionSubCategoryDetailsId: number;
    taxableAmount: number | null;
    taxableIncome: number | null;
}
export class POIHouseProperty{
    HouseProperty: HouseProperty | null;
    POIDocument: POIDocument[] | null;
}