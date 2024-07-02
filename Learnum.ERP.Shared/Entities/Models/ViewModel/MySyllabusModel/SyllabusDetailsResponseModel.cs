using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Learnum.ERP.Shared.Entities.Models.ViewModel.MySyllabusModel
{
    public class SyllabusDetailsResponseModel
    {
        public long CourseId {  get; set; }
        public string CourseName { get; set; }
        public string NameOfTopic { get; set; }
        public string SubjectName { get; set; }
        public string TopicStatus { get; set; }
        public string Heading { get; set; }
        public string Content { get; set; }
        public string Attachments { get; set; }
        public string References { get; set; }
        public string SubtopicStatus { get; set; }
    }
}
