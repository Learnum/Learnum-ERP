﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Learnum.ERP.Shared.Entities.Models
{
    public class BatchesDetailsModel : BaseModel
    {
        public long BatchId { get; set; }
        public long BranchId { get; set; }

        public long CourseId { get; set; }

        public long ClassroomId { get; set; }   

        public string BatchName { get; set; }

        public long CourseFeesInstallment {  get; set; }

        public string OneTimeCourseFees {  get; set; }

        public DateTime StartOn { get; set; }

        public DateTime EndOn { get; set; }

        public bool IsActive { get; set; }

       
    }

    public class BatchDetailsPayload
    {
        public BatchesDetailsModel BatchDetails { get; set; }
        public List<InstallMentModel> InstallmentDetails { get; set; }
    }

    public class InstallMentModel 
    {
        public long InstallmentId { get; set; }
        public int InstallmentNumber { get; set; }
        public DateTime DueDate { get; set; }
        public decimal InstallmentAmount { get; set; }

    }

}
