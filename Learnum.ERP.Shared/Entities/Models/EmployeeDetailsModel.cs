using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Sockets;
using System.Text;
using System.Threading.Tasks;

namespace Learnum.ERP.Shared.Entities.Models
{
    public class EmployeeDetailsModel : BaseModel
    {
        public long EmployeeId { get; set; }
        public string EmployeeName { get; set; }
        public long EmployeePhone { get; set; }
        public string Email { get; set; }
        public long AadharNumber { get; set; }
        public string DateOfBirth { get; set; }
        public string BloodGroup { get; set; }
        public string Gender { get; set; }
        public string Qualification { get; set; }
        public string FilePath { get; set; }
        public string EmployeePhoto { get; set; }
        public string FileName { get; set; }
        public string MimeType { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public long PostalCode { get; set; }
        public bool IsActive { get; set; }
        public string Role { get; set; }
        public long AddedBy { get; set; }
        public DateTime AddedDate { get; set; }
        public long UpdatedBy { get; set; }
        public DateTime UpdatedDate { get; set; }
    }
}
