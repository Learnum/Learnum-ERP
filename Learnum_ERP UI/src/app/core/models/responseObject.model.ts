export class ResponseObject {
    ResponseCode: ResponseCode;
    data: any;
    message: string;
}

export enum ResponseCode {
    Success = 1,
    Failed = -2,
    ApplicationError = -3,
    DataBaseError = -4,
    NotFound = -5,
    NotAllowed = -6,
    InUse = -7,
    AlreadyExists = 10005,
    AlreadyCancelled = -9,
    EmailAlreadyExists = 10010,
    PANAlreadyExists = 10011,
    UserNameAlreadyExists = 10012,
    InvalidUserNameOrPassword = -13,
    UserNotValidFor80G=10000,
    Update=11116
}