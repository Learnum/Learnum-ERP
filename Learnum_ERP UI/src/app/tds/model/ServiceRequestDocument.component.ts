
export class ServiceRequestDocument {
    ServiceRequestDocumentId: number;
    ServiceRequestURId :string;
    ServiceRequestId: number;
    DocumentTypeId: number;
    DocumentName: string;
    FileName: string;
    FilePath: string;
    Remark: string | null;
    Password: string | null;
    IsValid: boolean | null;
    UserType: number;
    AddedBy: number | null;
    UpdatedBy: number | null;
    AddedDate: Date | string | null;
    UpdatedDate: Date | string | null;
    Amount: number | null;
    URID: string;
    RoleId:number;
}


export class ServiceRequestDocumentDataVM extends ServiceRequestDocument {
    DocumentType: string;
}

export class ServiceRequestDocumentData extends ServiceRequestDocument{
    FileData: string;
}

export class ServiceRequestDocumentVM
{
    public ServiceRequestDocumentData: Array<ServiceRequestDocumentData>;
}

export class Form16Document extends ServiceRequestDocument{
    IncomeTaxEfillingRequestId:number
}
