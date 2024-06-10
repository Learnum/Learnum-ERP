export class ExcelExportColumnModel {
    EmployeeId: string;
    EmployeeName: string;
    Department: string;
    Pan: string;
    Email: string;
    Mobile: string;
    Status: string;
    Role: string;
    CertificateDate:Date | string | null;
}
export class ExcelExportModel {
      Metadataname:string;
      Name:string;
      SalarySectionName:string;
      InvesmentSubCategoryName:string;
      IsVisible:boolean;

}
export class ExcelDashboardExport
{
    subject:string;
    createdBy:number;
    createdDate:Date|string|null;
    isActive:boolean;
}
export class ExcelExportITDDeclarationColumnModel {
    EmployeeId:number;
    EmployeeName:string;
    Department:string;
    PANNo:string;
    EmailId:string;
    ContactNo:number;
    SubmittedDate:Date;
    Advisor:string;
}