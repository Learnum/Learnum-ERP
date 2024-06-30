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

        public Boolean IsActive { get; set; }
        //public string MimeType { get; set; }
        //public string DocumentName { get; set; }
        //public string FileName { get; set; }
        //public string FilePath { get; set; }
        public IFormFile File { get; set; }
    }
}
