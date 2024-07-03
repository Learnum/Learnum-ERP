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
        public long StudentId { get; set; } 
        public string StudentName { get; set; }
        public DateTime CounsellingDate { get; set; }
        public string CounsellingStatus { get; set; }
        public string Phone { get; set; }
        public TimeSpan CounsellingTime { get; set; } 
        public string BranchName { get; set; }
        public string CounsellingConversation { get; set; }
    }
}
