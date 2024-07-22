import { ContactDetails } from "./contactdetails.model";
import { DepartmentDetails } from "./departmentdetails.model";

export class AddcollegesDetails{
    collegeId: number;
    branchId: number;
    collegeName: string;
    collegeAddress: string;
    collegeWebsite: string;
    branchName: string;
    aboutCollege: string;
    //isActive: boolean;
    addedBy: number | null;
    addedDate: Date | null;
    updatedBy: number | null;
    updatedDate: Date | null;
    computerName: string;
}

export class CollegeContactDetails {
  addcollegesDetails: AddcollegesDetails;
  contactDetails: ContactDetails[];
  departmentDetails: DepartmentDetails[];
  

    constructor(
      addcollegesDetails: AddcollegesDetails,
      contactDetails: ContactDetails[],
      departmentDetails: DepartmentDetails[]   // Replace `any` with a specific type if available
      ) {
        this.addcollegesDetails = addcollegesDetails;
        this.contactDetails = contactDetails;
        this.departmentDetails = departmentDetails;
      }
  }

