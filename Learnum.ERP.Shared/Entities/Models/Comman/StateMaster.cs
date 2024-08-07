using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Learnum.ERP.Shared.Entities.Models.Comman
{
    public class StateMaster: BaseModel
    {
        public long StateId { get; set; }
        public string? StateName { get; set; }
        public long? StateCode { get; set; }
        public long? CountryId { get; set; }
    }
}
