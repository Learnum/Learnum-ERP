export class EmployeeAddressDetailsModel {
    AddressUserMappingId: number;
    AddressDetailsId: number | null;
    UserFinancialId: number | null;
    //UserId:number|null;
    CompanyFinancialId:number|null;
    Address: string;
    Pincode: number | null;
    CityId: number | null;
    cityName: string;
    StateId: number | null;
    stateName: string;
    CountryId: number | null;
    countryName: string;
    IsActive: boolean | null;
    CreatedBy: number | null;
    CreatedDate: Date | string | null;
    UpdatedBy: number | null;
    UpdatedDate: Date | string | null;
    
}