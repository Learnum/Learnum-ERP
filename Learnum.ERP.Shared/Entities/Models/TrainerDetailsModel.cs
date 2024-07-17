using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Learnum.ERP.Shared.Entities.Models
{
    public class TrainerDetailsModel : BaseModel
    {
        public long TrainerId { get; set; }
        public long courseId { get; set; }
        public long branchId { get; set; }
        public long batchId { get; set; }
        public string SubjectName { get; set; }
        public string TrainerName { get; set; }
        public bool IsActive { get; set; }
}
}
