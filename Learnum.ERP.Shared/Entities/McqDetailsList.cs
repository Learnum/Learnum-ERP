using Learnum.ERP.Shared.Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Learnum.ERP.Shared.Entities
{
     public class McqDetailsList
    {
        public McqDetails? mcqDetailsModel { get; set; }

        public List<McqQuestionDetails>? mcqQuestionDetails { get; set; }
    }
}
