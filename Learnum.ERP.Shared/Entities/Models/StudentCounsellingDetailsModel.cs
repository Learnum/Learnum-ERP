using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Learnum.ERP.Shared.Entities.Models
{
    public class StudentCounsellingDetailsModel : BaseModel
    {
        public long CounsellingId { get; set; }
        public long StudentId { get; set; }
        public long Phone { get; set; }
        public DateTime CounsellingDate { get; set; }
        public DateTime CounsellingTime { get; set; }
        public long BranchId { get; set; }
        public string CounsellingStatus { get; set; }
        public string CounsellingConversation { get; set; }
        public bool IsActive { get; set; }
    }
}
