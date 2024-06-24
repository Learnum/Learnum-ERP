using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Learnum.ERP.Shared.Entities.Models.Authentication
{
    public class LoginModel
    {
        public string? EmailId { get; set; }
        public string? PasswordHash { get; set; }
        public bool? RememberMe { get; set; }
        public long? UserId { get; set; }
        public string? UserName { get; set; }
        public string? MobileNo { get; set; }
        public string? NewPassword { get; set; }
        public long? OTP { get; set; }
        public string? ApplicationToken { get; set; }
        public Guid? URID { get; set; }

    }

    public class IdentityUserLoginMapping : BaseModel
    {
        public long IdentityUserLoginMappingId { get; set; }
        public long UserId { get; set; }
        public long IdentityUserId { get; set; }
        public bool IsActive { get; set; }


    }
}
