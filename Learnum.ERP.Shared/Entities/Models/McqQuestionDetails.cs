using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Learnum.ERP.Shared.Entities.Models
{
     public  class McqQuestionDetails:BaseModel
    {
        public long QuestionId { get; set; }

        public string Question {  get; set; }
        public string optionA { get; set; }
        public string optionB { get; set; }
        public string optionC { get; set; }
        public string optionD { get; set; }
        public string Answer { get; set; }
        public long marks { get; set; }
        public bool IsActive { get; set; }
    }
}
