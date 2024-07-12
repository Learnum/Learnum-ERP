export class BranchDetailsModel {
  branchManagerId: number;
  branchManagerName: string;
  branchName: string;
  isActive: boolean;
  addedBy: number | null;
  addedDate: Date | null;
  updatedBy: number | null;
  updatedDate: Date | null;
  computerName: string;
}
