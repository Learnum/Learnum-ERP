﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Learnum.ERP.Shared.Entities.Models
{
    public class BranchCounsellorDetailsModel : BaseModel
    {
        public long BranchID {  get; set; }
        public string CounsellorName { get; set; }
        public string BranchName { get; set; }
        public string Status { get; set; }
    }
}