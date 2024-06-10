
export class AddressSelectList {
    stateList: Array<any> = [];
    cityList: Array<any> = [];
    countryList: Array<any> = [];
}
export class AddressDetails {
    IsCurrent: number;
    StateId: number;
    UserId:number;
    ClientProfileId: number;
    CountryId:number;
    AddressId: number;
    FlatDoor: string;
    RoadStreet: string;
    BuildingName: string;
    AreaLocality: string;
    Remark: string;
    City: string;
    District: string;
    StateCode: number;
    CountryCode: number;
    Pincode: number;
    ZipCode: string;
    AddressStatusId: number;
    AddedBy: number;
    AddedDate: Date;
    UpdatedBy: number;
    UpdatedDate: Date;
    AddressTypeId : AddressType;
  }
  export enum AddressType {
    Current = 1,
    Permanent = 0,
  }