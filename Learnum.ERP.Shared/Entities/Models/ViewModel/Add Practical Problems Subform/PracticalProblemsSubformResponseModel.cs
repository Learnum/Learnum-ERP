﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Learnum.ERP.Shared.Entities.Models.ViewModel.Add_Practical_Problems_Subform
{
    public class PracticalProblemsSubformResponseModel
    {
        public long QuestionId { get; set; }
        public string Question { get; set; }
        public string ModelAnswer { get; set; }
        public long Marks { get; set; }
        public bool IsActive { get; set; }
    }
}
