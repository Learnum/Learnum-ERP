using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;

    namespace Learnum.ERP.Shared.Entities
    {
        public class FileUpload : BaseModel
        {
        public long CourseId { get; set; }
        public string CourseName { get; set; }
        public string Description { get; set; }
        public bool IsActive { get; set; }
        public string MimeType { get; set; }
        public string DocumentName { get; set; }
        public string FileName { get; set; }
        public string FilePath { get; set; }
        
    }
    }
