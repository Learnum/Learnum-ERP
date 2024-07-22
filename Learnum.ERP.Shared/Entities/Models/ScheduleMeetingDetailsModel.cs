using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Learnum.ERP.Shared.Entities.Models
{
    public class ScheduleMeetingDetailsModel : BaseModel
    {
        public long MeetingId { get; set; }
        public long CollegeId { get; set; }
        public string Meetingwith { get; set; }
        public DateTime MeetingDate { get; set; }
        public DateTime MeetingTime { get; set; }
        public string MeetingLocation { get; set; }
        public string MeetingAgenda { get; set; }
        public bool IsActive { get; set; }
   
    }
}
