using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Learnum.ERP.Shared.Entities.Models
{
    public class StudentLeadDetailsModel :BaseModel
    {
        public long StudentId { get; set; }
        public string StudentName { get; set; }
        public long CollegeId { get; set; }
        public long BranchId { get; set; }
        public long StudentPhone { get; set; }
        public long ParentPhone { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public long PostalCode { get; set; }
        public string LeadSource { get; set; }
        public string StudentEmail { get; set; }
        public string Education { get; set; }
        public string Gender { get; set; }
        public bool IsActive { get; set; }
    }
}
