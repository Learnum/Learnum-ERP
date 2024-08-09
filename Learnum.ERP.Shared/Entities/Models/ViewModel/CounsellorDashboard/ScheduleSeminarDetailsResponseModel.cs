using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Learnum.ERP.Shared.Entities.Models.ViewModel.CounsellorDashboardModel
{
    public class ScheduleSeminarDetailsResponseModel
    {
        public long SeminarId { get; set; }
        public long CollegeId { get; set; }
        public string CollegeName { get; set; }
        public string SpockPerson { get; set; }
        public DateTime SeminarDate { get; set; }
        public DateTime SeminarTime { get; set; }
        public string SeminarLocation { get; set; }
        public string SeminarStatus { get; set; }
        public string SeminarAgenda { get; set; }
        public bool IsActive { get; set; }
    }
}
