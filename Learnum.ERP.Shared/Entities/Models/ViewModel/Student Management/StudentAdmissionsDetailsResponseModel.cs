using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Learnum.ERP.Shared.Entities.Models.ViewModel.Student_Management
{
    public class StudentAdmissionsDetailsResponseModel:BaseModel
    {
        public long AdmissionId { get; set; }
        public DateTime DateOfAdmission { get; set; }
        public long CourseId { get; set; }
        public string CourseName { get; set; }
        public long BranchId { get; set; }
        public string BranchName { get; set; }
        public long BatchId { get; set; }
        public string BatchName { get; set; }
        public long StudentId { get; set; }
        public string StudentName { get; set; }
        public bool IsActive { get; set; }
        public string FeesType { get; set; }
        public long CourseFees { get; set; }
        public long StudentNumber { get; set; }

    }
}
