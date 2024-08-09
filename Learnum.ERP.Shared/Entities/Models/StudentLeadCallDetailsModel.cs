using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Learnum.ERP.Shared.Entities.Models
{
    public class StudentLeadCalldetailsModel : BaseModel
    {
        public long CallId { get; set; }
        public long StudentId { get; set; }
        public long Phone { get; set; }
        public DateTime PhoneCallDate { get; set; }
        public DateTime PhoneCallTime { get; set; }
        public long BranchId { get; set; }
        public string LeadStatus { get; set; }
        public string CallConversation { get; set; }
        public bool IsActive { get; set; }
    }
}
