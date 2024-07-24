using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Learnum.ERP.Shared.Entities.Models.ViewModel.Student_Management
{
    public class StudentDeatailsResponseModel
    {
        public long StudentId { get; set; }
        public string StudentName { get; set; }
        public string StudentEmail { get; set; }
        public long StudentPhone { get; set; }
        public long AadharNumber { get; set; }
        public DateTime DateofBirth { get; set; }
        public string Education { get; set; }
        public string BloodGroup { get; set; }
        public string Gender { get; set; }
        public string Town { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public long PostalCode { get; set; }
        public string FatherName { get; set; }
        public string FatherOccupation { get; set; }
        public long FatherPhone { get; set; }
        public string MotherName { get; set; }
        public string MotherOccupation { get; set; }
        public long MotherPhone { get; set; }
        public string StudentRole { get; set; }
        public bool IsActive { get; set; }
        public string MimeType { get; set; }
        public string DocumentName { get; set; }
        public string FileName { get; set; }
        public string FilePath { get; set; }
    }
}
