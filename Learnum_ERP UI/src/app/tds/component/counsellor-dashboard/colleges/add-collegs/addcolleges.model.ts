
export class AddcollegesDetails{
    collegeId: number;
    branchId: number;
    collegeName: string;
    collegeAddress: string;
    collegeWebsite: string;
    branchName: string;
    aboutCollege: string;
    isActive: boolean;
    addedBy: number | null;
    addedDate: Date | null;
    updatedBy: number | null;
    updatedDate: Date | null;
    computerName: string;
}
export class ContactDetails {
  contactId: number;
  collegeId: number;
  name: string;
  phoneNumber: number;
  email: string;
  roleId: number;
}

export class DepartmentDetails{
  departmentId: number;
  collegeId: number;
  courseId: number;
  seats: number;
  isActive: boolean;
}

export class CollegeContactDetails {
  addcollegesDetails: AddcollegesDetails;
  contactDetails: ContactDetails[];
  departmentDetails: DepartmentDetails[];
  }

