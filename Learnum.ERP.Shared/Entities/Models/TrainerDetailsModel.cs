using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Learnum.ERP.Shared.Entities.Models
{
    public class TrainerDetailsModel
    {
        public long TrainerId { get; set; }
        public string CourseName { get; set; }
        public string SubjectName { get; set; }
        public string BranchName { get; set; }
        public string BatchName { get; set; }
        public string TrainerName { get; set; }
        public string TrainerBatchName { get; set; }
        public bool IsActive { get; set; }
        public string Role { get; set; }
        public long AddedBy { get; set; }
        public DateTime AddedDate { get; set; }
        public long UpdatedBy { get; set; }
        public DateTime UpdatedDate { get; set; }
    }
}
