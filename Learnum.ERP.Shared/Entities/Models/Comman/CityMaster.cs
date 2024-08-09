using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Learnum.ERP.Shared.Entities.Models.Comman
{
    public class CityMaster:BaseModel
    {
        public long CityId { get; set; }
        public string? CityName { get; set; }
        public long? StateId { get; set; }
        public string? PinCode { get; set; }
    }
}
