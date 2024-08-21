using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Learnum.ERP.Shared.Entities
{
    public class EmployeePhotoupload : BaseModel
    {
        public long EmployeeId { get; set; }
        public string EmployeeName { get; set; }
        public long EmployeePhone { get; set; }
        public string Email { get; set; }
        public long AadharNumber { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string BloodGroup { get; set; }
        public string Gender { get; set; }
        public string Qualification { get; set; }

        public string Address { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public long PostalCode { get; set; }
        public string Role { get; set; }
        public bool IsActive { get; set; }
        public string MimeType { get; set; }
        public string DocumentName { get; set; }
        public string FileName { get; set; }
        public string FilePath { get; set; }
    }
}
