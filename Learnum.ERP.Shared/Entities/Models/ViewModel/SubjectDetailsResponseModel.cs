using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Learnum.ERP.Shared.Entities.Models.ViewModel
{
    public class SubjectDetailsResponseModel
    {
        public long SubjectId { get; set; }
        public string SubjectName { get; set; }

        public string SubjectDescription { get; set; }

        public string StatusctName { get; set; }

        public string CourseName { get; set; }
    }
}

