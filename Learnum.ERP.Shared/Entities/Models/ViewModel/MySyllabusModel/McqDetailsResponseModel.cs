using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Learnum.ERP.Shared.Entities.Models.ViewModel.MySyllabusModel
{
    public class McqDetailsResponseModel: BaseModel
    {
        public long McqId { get; set; }

        public long CourseId { get; set; }

        public string CourseName { get; set; }

        public long SubjectId { get; set; }

        public string SubjectName { get; set; }

        public long TopicId { get; set; }

        public string TopicName { get; set; } 

        public bool? IsActive { get; set; }
      
        
       

       

      
    }
}
