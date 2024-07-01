using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Learnum.ERP.Shared.Entities.Models.ViewModel
{
    public class CourseDetailsResponseModel
    {
        public long CourseId { get; set; }

        public string CourseName { get; set; }

        public string Description { get; set; }

        public string CourseStatus { get; set; }
    }
}
