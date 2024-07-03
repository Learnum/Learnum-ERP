using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Learnum.ERP.Shared.Entities.Models.ViewModel.CounsellorDashboardModel
{
    public class WebsiteLeadDetailsResponseModel
    {
        public long Studentid { get; set; } 
        public string StudentName { get; set; }
        public string CourseName { get; set; }
        public int Phone { get; set; }
        public string Email { get; set; }
        public string Location { get; set; }
    }
}
