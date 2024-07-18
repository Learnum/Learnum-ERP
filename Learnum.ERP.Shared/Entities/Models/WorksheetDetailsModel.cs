using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Learnum.ERP.Shared.Entities.Models
{
    public class WorksheetDetailsModel: BaseModel
    {
        public long? WorkId { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Date { get; set; }
        public string Role { get; set; }
        public bool? IsActive { get; set; }

    }
}
