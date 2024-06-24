using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper.Contrib.Extensions;

namespace Learnum.ERP.Shared.Entities.Models.Authentication
{
    [Table("RegistrationMaster")]
    public class RegistrationMaster : BaseModel
    {
        [Key]
        public long? UserId { get; set; }
        public string? UserName { get; set; }
        public string? EmailId { get; set; }
        public string? PasswordHash { get; set; }
        public string? MobileNo { get; set; }
        public bool? IsAdmin { get; set; }
        public bool? IsActive { get; set; }
        public string? OTP { get; set; }

    }
}
