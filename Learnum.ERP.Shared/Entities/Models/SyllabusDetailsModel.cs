using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Learnum.ERP.Shared.Entities.Models
{
     public class SyllabusDetailsModel:BaseModel
    {
        public long SyllabusId { get; set; }
        public long CourseId { get; set; }
        public long SubjectId { get; set; }
        public string TopicName { get; set; }
        public bool IsActive { get; set; }

    }
}
