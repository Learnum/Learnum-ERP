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
  addedBy: number | null;
  addedDate: Date | null;
  updatedBy: number | null;
  updatedDate: Date | null;
  computerName: string;
}
