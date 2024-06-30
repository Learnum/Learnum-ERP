using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Learnum.ERP.Shared.Entities.Models
{
    public class ClassroomDetailsModel
    {

        public long BranchId { get; set; }

        public string ClassroomName { get; set; }

        public long StudentCapacity { get; set;}

        public Boolean IsActive { get; set; }
    }
}
