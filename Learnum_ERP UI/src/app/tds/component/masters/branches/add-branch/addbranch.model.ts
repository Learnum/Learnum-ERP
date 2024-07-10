export class BranchDetailsModel {
  branchId: number;
  branchName: string;
  town: string;
  city: string;
  state: string;
  postalCode: number;
  isActive: boolean;
  addedBy: number | null;
  addedDate: Date | null;
  updatedBy: number | null;
  updatedDate: Date | null;
  computerName: string;
}
