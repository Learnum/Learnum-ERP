﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Learnum.ERP.Shared.Entities.Models
{
    public class MyPracticalExamModel:BaseModel
    {
        public long StudentId { get; set; }

        public string Answer { get; set; }

        public bool IsActive { get; set; }
    }
}
