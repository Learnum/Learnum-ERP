using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Learnum.ERP.Shared.Entities.Models
{
    public class BranchCounsellorDetailsModel : BaseModel
    {
        public long? CounsellorId { get; set; }
        public long? BranchId { get; set; }
        public string CounsellorName { get; set; }
        public bool? IsActive { get; set; }
    }
}
