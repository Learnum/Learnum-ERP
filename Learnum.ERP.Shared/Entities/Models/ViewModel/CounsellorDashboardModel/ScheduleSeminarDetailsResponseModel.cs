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
        public long CollegeId { get; set; }
        public string CollegeName { get; set; }
        public string SpockPerson { get; set; }
        public string SeminarDate { get; set; }
        public string SeminarTime { get; set; }
        public string SeminarLocation { get; set; }
        public string SeminarStatus { get; set; }
        public string SeminarAgenda { get; set; }
    }
}
