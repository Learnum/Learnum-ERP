using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Learnum.ERP.Shared.Entities.Models
{
    public class SubjectDetailsModel :BaseModel
    {
        public long CourseId { get; set; }
        public long SubjectId { get; set; }
        public string SubjectName { get; set; }

        public string SubjectDescription { get; set; }

        public bool IsActive { get; set; }

    }
}
