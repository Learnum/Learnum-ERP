using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Learnum.ERP.Shared.Entities.Models
{
    public class McqDetails:BaseModel
    {
        public long McqId { get; set; }

        public long CourseId { get; set; }
        
        public long SubjectId { get; set; }

        public long TopicId {get; set; }

        public bool? IsActive { get; set; }

    }
}
