using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Learnum.ERP.Shared.Entities.Models
{
    public class WebsiteLeadDetailsModel :BaseModel
    {
        public long Studentid { get; set; }
        public string StudentName { get; set; }
        public string CourseName { get; set; }
        public int Phone { get; set; }
        public string Email { get; set; }
        public string Location { get; set; }
    }
}
