using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Learnum.ERP.Shared.Entities.Models.ViewModel.MySyllabusModel
{
    public class McqDetailsResponseModel
    {
        public long CourseId { get; set; }
        public string CourseName { get; set; }
        public string SubjectName { get; set; }

        public string Status { get; set; }

        public string Question { get; set; }
        public string OptionA { get; set; }
        public string OptionB { get; set; }
        public string OptionC { get; set; }
        public string OptionD { get; set; }
        public string Answer { get; set; }

        public int Marks { get; set; }

    }
}
