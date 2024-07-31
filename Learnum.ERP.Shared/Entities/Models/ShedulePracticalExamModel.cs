using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Learnum.ERP.Shared.Entities.Models
{
    public class ShedulePracticalExamModel: BaseModel
    {
        public long SchedulePracticalExamId { get; set; }
        public long CourseId { get; set; }
        public long SubjectId { get; set; }
        public long BranchId { get; set; }
        public long BatchId { get; set; }
        public long TopicId { get; set; }
        public long PaperSetNo { get; set; }
        public DateTime DateofExam { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public long PracticalProblemStatus { get; set; }
       
    }
}
