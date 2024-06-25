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

        public string StudentCapacity { get; set;}

        public string ClassroomStatus { get; set;}
    }
}
