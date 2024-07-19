using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Learnum.ERP.Shared.Entities.Models
{
    public class SyllabusStatusModel : BaseModel
    {
        public long TrainerId {  get; set; }
        public long BranchId { get; set; }

    }
}
