using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Learnum.ERP.Shared.Entities.Models.ViewModel.Masters
{
    public class TrainerDetailsResponseModel
    {
        public long TrainerId { get; set; }
        public string TrainerName { get; set; }
        public long BranchId { get; set; }
        public long batchId { get; set; }
        public long courseId { get; set; }
        public string SubjectName { get; set; }
        public bool IsActive { get; set; }
    }
}
