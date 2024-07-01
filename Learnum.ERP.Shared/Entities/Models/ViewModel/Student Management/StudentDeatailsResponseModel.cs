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
        public Boolean IsActive { get; set; }
    }
}
