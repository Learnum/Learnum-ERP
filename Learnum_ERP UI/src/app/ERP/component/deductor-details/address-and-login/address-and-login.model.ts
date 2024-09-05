export class AddressAndLoginDetails
{
    AddressDetailId:number;
    DeductorId : number;
    BranchName:string;
    FlatDoor:string;
    BuildingName:string;
    RoadStreet:string;
    AreaLocality:string;
    City:string;
    District:string;
    PinCode:string;
    StateId:number;
    IsActive:boolean;
    AddedBy:number|null;
	AddedDate:Date|null;
    UpdatedBy:number|null;	
    UpdatedDate:Date|null;

}

export class DeductorLoginDetails{
    DeductorLoginId : number;
    DeductorId : number;
    TracesLoginId : number;
    TracesPassword : string;
    IncomeTaxLoginId : number;
    IncomeTaxPassword : string;
    UserId : number;
}