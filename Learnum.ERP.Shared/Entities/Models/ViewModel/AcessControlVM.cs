using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Learnum.ERP.Shared.Entities.Models.ViewModel
{
    public class AcessControlVM
    {
        public long? UserRoleMappingId { get; set; }
        public long UserId { get; set; }
        public long? RoleId { get; set; }
        public long? ApplicationId { get; set; }
        public long? FinancialYearId { get; set; }
        public string? UserName { get; set; }
        public long IdentityUserId { get; set; }
        public string? RoleName { get; set; }
        public string? ApplicationName { get; set; }
        public bool IsActive { get; set; }
        public string? Status { get; set; }


    }
}
