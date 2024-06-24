using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Learnum.ERP.Shared.Entities.Models.Authentication
{
    public class IdentityRole : BaseModel
    {
        public long RoleId { get; set; }
        public string Name { get; set; }
        public Guid URID { get; set; }
    }

    public class UserAppRoleMapping : IdentityRole
    {
        public long UserRoleMappingId { get; set; }
        public long UserId { get; set; }
        public long ApplicationId { get; set; }
        public long FinancialYearId { get; set; }
        public Guid URID { get; set; }
        public long ApprovedBy { get; set; }
        public DateTime ApplicableFrom { get; set; }
    }

}
