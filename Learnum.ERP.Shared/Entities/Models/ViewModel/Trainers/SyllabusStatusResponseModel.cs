using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Learnum.ERP.Shared.Entities.Models.ViewModel.Trainers
{
    public class SyllabusStatusResponseModel :BaseModel
    {
        public long TrainerId { get; set; }
        public long BranchId { get; set; }
        public string BranchName { get; set; }
    }
}
