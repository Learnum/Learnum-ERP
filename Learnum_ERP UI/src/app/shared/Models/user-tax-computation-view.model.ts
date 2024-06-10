export class UserTaxComputationViewModel {
    sRNo: number;
    section: string;
    perticulars: string;
    oldRegimeAmount: number;
    newRegimeAmount: number;
    taxSaverRemark: string;
    docs: number;
    proofs: number;
    dataTypeId: number;
    IsOldRegimeAllow:boolean;
    IsNewRegimeAllow:boolean;
    declartionTypeId:number;
}

export enum ComputationDataType
{
    Data =0,
    DataHeader=1,
    GroupHeader=2
}