using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Learnum.ERP.Shared.Entities.Models.ViewModel.HRDModel
{
    public  class TrainerDetailsResponseModel
    {
        public long TrainerId { get; set; }
        public string CourseName { get; set; }
        public string SubjectName { get; set; }
        public string BranchName { get; set; }
        public string BatchName { get; set; }
        public string TrainerName { get; set; }
        public string TrainerBatchName { get; set; }
    }
}
