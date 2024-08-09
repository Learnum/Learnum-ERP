using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Learnum.ERP.Shared.Entities.Models.ViewModel.MySyllabusModel
{
    public class TopicDetailsResponseModel : BaseModel
    {
        public long CourseId { get; set; }
        public long SubjectId { get; set; }
        public long TopicId { get; set; }
        public string CourseName { get; set; }
        public string TopicName { get; set; }
        public string SubjectName { get; set; }
        public bool IsActive { get; set; }
    }
}
