using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Learnum.ERP.Shared.Core
{
    public enum ResponseCode
    {
        Success = 1,
        Failed = 10000,
        ApplicationError = 10001,
        DataBaseError = 10002,
        InvalidUserNameOrPassword = 10003,
        NotFound = 10004,
        AlreadyExists = 10005,
        InUse = 10006,
        NotAllowed = 10007,
        AlreadyCancelled = 10008,
        AlreadyRedeemed = 10009,
        EmailAlreadyExists = 10010,
        MobileAlreadyExists = 10011,
        UserNameAlreadyExists = 10012,
        UserRoleAlreadyExists = 10013,
        UploadDocument = 10014,
        PayNow = 10015,
        Updated = 11116
    }
}
