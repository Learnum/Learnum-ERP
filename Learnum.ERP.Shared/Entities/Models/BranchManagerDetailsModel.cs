using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Learnum.ERP.Shared.Entities.Models
{
    public class BranchManagerDetailsModel:BaseModel
    {
        public long BranchManagerId { get; set; }
        public long BranchId {  get; set; }

       public string BranchManagerName  { get; set; }
        public bool IsActive { get; set; }
       
    }
}
