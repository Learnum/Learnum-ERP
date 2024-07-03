using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Learnum.ERP.Shared.Entities.Models.ViewModel.CounsellorDashboardModel
{
    public class StudentLeadCallDetailsResponseModel
    { 
        public long StudentId { get; set; } 
        public string StudentName { get; set; }
        public DateTime CallDate { get; set; } 
        public string LeadStatus { get; set; }
        public int Phone { get; set; }
        public TimeSpan CallTime { get; set; } 
        public string BranchName { get; set; }
       public string CallConversation { get; set; }
    }
}
