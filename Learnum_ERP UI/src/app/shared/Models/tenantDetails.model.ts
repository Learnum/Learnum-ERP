export class TenantDetails {
    TenantDetailsId: number;
    ScheduleHPId: number | null;
    NameofTenant: string;
    PANofTenant: string;
    AadhaarofTenant: string;
    PANTANofTenant: string;
    IsActive: boolean | null;
    CreatedBy: number | null;
    UpdatedBy: number | null;
    CreatedDate: Date | string | null;
    UpdatedDate: Date | string | null;
}