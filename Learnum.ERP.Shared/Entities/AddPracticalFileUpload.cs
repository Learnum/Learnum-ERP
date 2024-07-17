using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Learnum.ERP.Shared.Entities
{
    public class AddPracticalFileUpload :BaseModel
    {
        public long QuestionId { get; set; }
        public string Question { get; set; }
        public string ModelAnswer { get; set; }
        public long Marks { get; set; }
        public bool IsActive { get; set; }
        public string MimeType { get; set; }
        public string DocumentName { get; set; }
        public string FileName { get; set; }
        public string FilePath { get; set; }
    }
}
