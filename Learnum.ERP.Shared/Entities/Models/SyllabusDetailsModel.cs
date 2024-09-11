using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Learnum.ERP.Shared.Entities.Models
{
     public class SyllabusDetailsModel
    {
        public long SyllabusId { get; set; }
        public long CourseId { get; set; }
        public long SubjectId { get; set; }
        public string TopicName { get; set; }
        public bool IsActive { get; set; }
        public long AddedBy { get; set; }
        public DateTime AddedDate { get; set; }
        public long UpdatedBy { get; set; }
        public DateTime UpdatedDate { get; set; }
    }
}
