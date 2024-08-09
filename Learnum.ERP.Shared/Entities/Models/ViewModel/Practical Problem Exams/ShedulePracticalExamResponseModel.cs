using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Learnum.ERP.Shared.Entities.Models.ViewModel.Practical_Exams
{
    public class ShedulePracticalExamResponseModel:BaseModel
    {
        public long SchedulePracticalExamId { get; set; }
        public long CourseId { get; set; }

        public string CourseName { get; set; }

        public long SubjectId { get; set; }

        public string SubjectName { get; set; }

        public long BranchId { get; set; }

        public string BranchName { get; set; }

        public long BatchId { get; set; }

        public string BatchName { get; set; }

        public long TopicId { get; set; }
        public string TopicName { get; set; }
        public long PaperSetNo { get; set; }
        public DateTime DateofExam { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public long PracticalProblemStatus { get; set; }

    }
}
