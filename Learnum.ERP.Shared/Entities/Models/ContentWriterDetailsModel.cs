﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Learnum.ERP.Shared.Entities.Models
{
    public class ContentWriterDetailsModel
    {
        public long Courseid { get; set; }
        public string Course { get; set; }
        public string ContentWriter { get; set; }
        public string Subject { get; set; }
        public string Status { get; set; }


    }
}