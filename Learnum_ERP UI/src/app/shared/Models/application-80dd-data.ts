import { DatePipe } from "@angular/common";

export class Application80DDData {

  application80ddId: number;
  documentName: string;
  documentPassword: string;
  userInvestmentMappingId: number
  userFinancialId: number;
  companyFinancialId: number;
  pOIStatusId: number;
  certificateDate: Date | string | null;
  certificateNumber: string;
  disabilityTypeId: number;
  applicationFormType:string;
  relationshipTypeId:number;
  personName:string;
  isActive: boolean;
  createdBy: number;
  createdDate: Date | string | null;
  updatedBy: number;
  updatedDate: Date | string | null;

}
export class DisabilityType {
  id: number;
  name: string;
}
export class RelationshipType {
  id: number;
  name: string;
}