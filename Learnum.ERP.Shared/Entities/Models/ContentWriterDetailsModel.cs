using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Learnum.ERP.Shared.Entities.Models
{
    public class ContentWriterDetailsModel:BaseModel
    {
        public long CourseId { get; set; }
        public long SubjectId { get; set; }

        public long ContentWriterId { get; set; }

        public string ContentWriterName { get; set; }
       
        public bool? IsActive { get; set; }
    }
}
