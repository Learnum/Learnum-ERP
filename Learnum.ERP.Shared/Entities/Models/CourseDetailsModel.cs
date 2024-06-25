using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Learnum.ERP.Shared.Entities.Models
{
    public class CourseDetailsModel
    {
        public long CourseId { get; set; }

        public string CourseName { get; set; }

        public string Description { get; set; }

        public string CourseStatus { get; set; }
    }
}
