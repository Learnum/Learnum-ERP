using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace Learnum.ERP.Shared.Entities.Models
{
    public class TrainerDetailsModel : BaseModel
    {

        public long TrainerId { get; set; }
        public long CourseId { get; set; }
        public long SubjectId { get; set; }
        public long BranchId { get; set; }
        public long BatchId { get; set; }
        public string TrainerName { get; set; }
        public bool IsActive { get; set; }

    }
       
       
    }

