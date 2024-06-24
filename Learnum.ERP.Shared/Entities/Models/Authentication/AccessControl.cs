using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Learnum.ERP.Shared.Entities.Models.Authentication
{
    public class AccessControl
    {
        public long UserId { get; set; }
        public long UserRoleMappingId { get; set; }
        public long ApplicationId { get; set; }
        public long RoleId { get; set; }
        public long FinancialYearId { get; set; }
        public bool IsActive { get; set; }
        public long? AddedBy { get; set; }
        public DateTime? AddedDate { get; set; }
        public long? UpdatedBy { get; set; }
        public DateTime? UpdatedDate { get; set; }
    }
}
