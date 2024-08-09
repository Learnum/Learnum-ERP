using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Learnum.ERP.Shared.Entities.Models.ViewModel.Masters
{
    public class TrainerDetailsResponseModel: BaseModel
    {

        public long TrainerId { get; set; }  
        public long CourseId { get; set; }
        public long SubjectId { get; set; }
        public long BranchId { get; set; }
        public long BatchId { get; set; }
        public string CourseName { get; set; }
        public string SubjectName { get; set; }

        public string BatchName { get; set; }
        public string BranchName { get; set; }
        public string TrainerName { get; set; }
        public bool IsActive { get; set; }
    }
}
