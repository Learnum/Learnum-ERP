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
        public long CallId { get; set; }
        public long StudentId { get; set; }
        public string StudentName {  get; set; }
        public long Phone { get; set; }
        public DateTime PhoneCallDate { get; set; }
        public DateTime PhoneCallTime { get; set; }
        public long BranchId { get; set; }
        public string BranchName { get; set; }
        public string LeadStatus { get; set; }
        public string CallConversation { get; set; }
        public bool IsActive { get; set; }
    }
}
