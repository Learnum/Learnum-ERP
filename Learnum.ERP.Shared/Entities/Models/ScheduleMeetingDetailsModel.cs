using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Learnum.ERP.Shared.Entities.Models
{
    public class ScheduleMeetingDetailsModel : BaseModel
    {
        public long CollegeId { get; set; }
        public string CollegeName { get; set; }
        public string MeetingWith { get; set; }
        public string MeetingDate { get; set; }
        public string MeetingTime { get; set; }
        public string MeetingLocation { get; set; }
        public string MeetingAgenda { get; set; }
    }
}
