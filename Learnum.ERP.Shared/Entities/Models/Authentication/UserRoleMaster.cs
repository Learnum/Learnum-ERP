using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Learnum.ERP.Shared.Entities.Models.Authentication
{
    public class UserRoleMaster : BaseModel
    {
        public long? UserRoleId { get; set; }
        public long? UserId { get; set; }
        public long? RoleId { get; set; }
        //public Guid URID { get; set; }
        public long? ApprovedBy { get; set; }
        public DateTime? ApplicableFrom { get; set; }

    }
}
