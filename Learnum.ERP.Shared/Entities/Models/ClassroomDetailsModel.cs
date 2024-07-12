using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Learnum.ERP.Shared.Entities.Models
{
    public class ClassroomDetailsModel : BaseModel
    {

        public long BranchId { get; set; }

        public long ClassroomId { get; set; }

        public string ClassroomName { get; set; }
        public long StudentCapacity { get; set;}
        public Boolean IsActive { get; set; }
        public long AddedBy { get; set; }
        public DateTime AddedDate { get; set; }
        public long UpdatedBy { get; set; }
        public DateTime UpdatedDate { get; set; }
    }
}
