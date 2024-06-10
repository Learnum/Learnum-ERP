import { BaseModel } from "src/app/tds/model/BaseModel"

export class DeductorBasicInfoModel extends BaseModel {
    UserId: number
    DeductorId: number
    DeductorName: string
    PAN: string
    TAN: string
    GSTN: string
    MobileNo: string
    EMailId: string
    DeductorTypeId: number
    DepartmentId: number
    StateId: number
    StatusId: number
    IsActive: boolean
}