using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Learnum.ERP.Shared.Entities.Models.Comman
{
    public class CountryMaster:BaseModel
    {
        public long CountryId { get; set; }
        public string? CountryName { get; set; }
        public long? CountryCode { get; set; }
    }
}
