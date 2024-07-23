using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Learnum.ERP.Shared.Entities.Models
{
    public class AddCollegesDetails : BaseModel
    {
        public long BranchId { get; set; }
        public string? CollegeName { get; set; }
        public string? CollegeAddress { get; set; }
        public string? City { get; set; }
        public string? State { get; set; }
        public long PostalCode { get; set; }
        public string? CollegeWebsite { get; set; }
        public string? BranchName { get; set; }
        public string? AboutCollege { get; set; }
       /* public long AddedBy { get; set; }
        public DateTime AddedDate { get; set; }
        public long UpdatedBy { get; set; }
        public DateTime UpdatedDate { get; set; }*/
    }
}
