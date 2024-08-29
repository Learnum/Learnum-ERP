export class BranchDetailsModel {
  branchId: number;
  branchName: string;
  address: string;
  City: string;
  //CityId: number;
  StateName: string;
  StateId: number;
  postalCode: number;
  isActive: boolean;
  AddedBy: number | null;
  AddedDate: Date | null;
  UpdatedBy: number | null;
  UpdatedDate: Date | null;
  computerName: string;
}
