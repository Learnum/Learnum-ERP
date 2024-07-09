using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Learnum.ERP.Shared.Entities.Models
{
    public class BranchManagerDetailsModel
    {
        public long BranchManagerId { get; set; }
        public string BranchManagerName { get; set; }
        public string BranchName { get; set; }
        public bool IsActive { get; set; }
        public long AddedBy { get; set; }
        public DateTime AddedDate { get; set; }
        public long UpdatedBy { get; set; }
        public DateTime UpdatedDate { get; set; }

    }
}
