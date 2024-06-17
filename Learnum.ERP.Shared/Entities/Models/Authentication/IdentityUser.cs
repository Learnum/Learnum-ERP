using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Learnum.ERP.Shared.Entities.Models.Authentication
{
    public class IdentityUser : BaseModel
    {
        public long? IdentityUserId { get; set; }
        public long? UserId { get; set; }
        public string? UserName { get; set; }
        public string? PasswordHash { get; set; }
        public string? EmailId { get; set; }
        public bool? EmailConfirmed { get; set; }
        public string? SecurityStamp { get; set; }
        public string? PhoneNumber { get; set; }
        public bool? PhoneNumberConfirmed { get; set; }
        public bool? TwoFactorEnabled { get; set; }
        public DateTime LockoutEndDateUtc { get; set; }
        public bool? LockoutEnabled { get; set; }
        public int AccessFailedCount { get; set; }
        public int SID { get; set; }
        public bool? IsActive { get; set; }
        public Guid URID { get; set; }
        public string? ApplicationToken { get; set; }

    }

    public class UserDetails : IdentityUser
    {
        public bool EnableBackOffice { get; set; }
        public long RoleId { get; set; }
        public bool? IsAdmin { get; set; }

    }
}
