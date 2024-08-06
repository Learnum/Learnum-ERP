using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Learnum.ERP.Shared.Entities.Models
{
    public class StudentAdmissionsDetailsModel :BaseModel
    {
        public long AdmissionId { get; set; }
        public DateTime DateOfAdmission { get; set; }
        public long CourseId { get; set; }
        public long BranchId { get; set; }
        public long BatchId { get; set; }
        public long StudentId { get; set; }
        public bool IsActive { get; set; }

    }
}
