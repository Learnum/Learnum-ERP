using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Learnum.ERP.Shared.Entities.Models.ViewModel.CounsellorDashboard
{
    public class AddCollegesResponseModel : BaseModel
    {
        public long CollegeId { get; set; }
        public long BranchId { get; set; }
        public string CollegeName { get; set; }
        public string CollegeAddress { get; set; }
        public string City { get; set; }
        public long PostalCode { get; set; }
        public string CollegeWebsite { get; set; }
        public string AboutCollege { get; set; }
        public bool IsActive { get; set; }
        public string District { get; set; }
        public string BranchName1 { get; set; }
        public long StateId { get; set; }
    }

}
