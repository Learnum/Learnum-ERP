using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Learnum.ERP.Shared.Entities.Models
{
    public class WebsiteLeadDetailsModel :BaseModel
    {
        public long StudentId { get; set; }
        public string StudentName { get; set; }
        public long CourseId { get; set; }
        public long Phone { get; set; }
        public string Email { get; set; }
        public string YourLocation { get; set; }
        public bool IsActive { get; set; }
    }
}
