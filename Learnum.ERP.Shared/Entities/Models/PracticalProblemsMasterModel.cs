using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Learnum.ERP.Shared.Entities.Models
{
    public class PracticalProblemsMasterModel : BaseModel
    {
        public long QuestionId { get; set; }
        public string Question { get; set; }
        public string ModelAnswer { get; set; }
        public long Marks { get; set; }
        public string status { get; set; }
    }


    public class PracticalFormData
    {
        public string PracticalProblemsMasterModel { get; set; }
        public IFormFile File { get; set; }
    }
}
