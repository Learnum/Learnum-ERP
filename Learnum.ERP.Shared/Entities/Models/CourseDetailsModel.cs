using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Learnum.ERP.Shared.Entities.Models
{
    public class CourseDetailsModel : BaseModel
    {
        public long CourseId { get; set; }

        public string CourseName { get; set; }

        public string Description { get; set; }

        public bool IsActive { get; set; }
      
       // public IFormFile File { get; set; }
    }

    public class CourseFormData
    {
        public string CourseDetailsModel { get; set; }
        public IFormFile File { get; set; }
       
    }
}
