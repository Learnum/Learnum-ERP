using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Learnum.ERP.Shared.Entities.Models
{
    public class ClassroomDetailsModel : BaseModel
    {

        public long ClassroomId { get; set; }
        public long BranchId { get; set; }
        public string ClassroomName { get; set; }
        public long StudentCapacity { get; set;}
        public bool IsActive { get; set; }
      
    }
}
