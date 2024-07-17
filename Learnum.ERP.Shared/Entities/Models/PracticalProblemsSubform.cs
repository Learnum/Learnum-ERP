using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Learnum.ERP.Shared.Entities.Models
{
    public class PracticalProblemsSubform : BaseModel
    {
        public long QuestionId { get; set; }
        public string Question { get; set; }
        public string ModelAnswer { get; set; }
        public long Marks { get; set; }
        public bool IsActive { get; set; }
    }


    public class PracticalFormData
    {
        public string PracticalProblemsSubform { get; set; }
        public IFormFile File { get; set; }


    }
}
