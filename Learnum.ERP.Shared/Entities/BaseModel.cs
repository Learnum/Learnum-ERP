using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Learnum.ERP.Shared.Entities
{
    public class BaseModel
    {
        public long? AddedBy { get; set; }
        public DateTime? AddedDate { get; set; }
        public long? UpdatedBy { get; set; }
        public DateTime? UpdatedDate { get; set; }

        public string ComputerName = Environment.MachineName;
    }
}
