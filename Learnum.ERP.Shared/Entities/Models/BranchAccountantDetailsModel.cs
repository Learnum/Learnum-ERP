using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Learnum.ERP.Shared.Entities.Models
{
    public class BranchAccountantDetailsModel : BaseModel
    {
        public long BranchAccountantId { get; set; }
        public long BranchId { get; set; }
        public string AccountantName { get; set; }
       
        public bool? IsActive { get; set; }

    }
}
