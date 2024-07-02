using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Learnum.ERP.Shared.Entities.Models.ViewModel.MySyllabusModel
{
    public class PracticalproblemResponseModel
    {
        public string CourseName { get; set; }
        public string SubjectName { get; set; }
        public string Topic { get; set; }
        public bool PracticalProblem { get; set; }
        public string Question { get; set; }
       
        public string ModelAnswer { get; set; }
        public string Attachment { get; set; }
        public int Marks { get; set; }

        public bool PracticalProblemStatus { get; set; }
    }
}
