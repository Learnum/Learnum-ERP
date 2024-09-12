using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Learnum.ERP.Shared.Entities.Models
{
    public class SendFeesReminderModel : BaseModel
    {
        public long SendFeesId { get; set; }
        public long CourseId { get; set; }
        public long BranchId { get; set; }
        public long BatchId { get; set; }
        public DateTime DueDate { get; set; }
        public long InstallmentAmount { get; set; }
        public bool IsActive { get; set; }
    }
}
