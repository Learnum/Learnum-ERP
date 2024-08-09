using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Learnum.ERP.Shared.Entities.Models.ViewModel
{
    public class BatchesDetailsResponseModel :BaseModel
    {
        public long BatchId { get; set; }
        public long BranchId { get; set; }

        public long CourseId { get; set; }

        public long ClassroomId { get; set; }

        public string BatchName { get; set; }

        public string CourseName { get; set;}

        public string ClassroomName { get; set;}

        public string BranchName { get; set; }
        public string CourseFeesInstallment { get; set; }

        public string OneTimeCourseFees { get; set; }

        public DateTime StartOn { get; set; }

        public DateTime EndOn { get; set; }

        public Boolean IsActive { get; set; }

        public DateTime StartTime { get; set; }

        public DateTime EndTime { get; set; }
    }
}
