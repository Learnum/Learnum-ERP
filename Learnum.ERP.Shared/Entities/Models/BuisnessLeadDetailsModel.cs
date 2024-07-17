using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Learnum.ERP.Shared.Entities.Models
{
    public class BuisnessLeadDetailsModel: BaseModel
    {
        public long BusinessId { get; set; }
        public string Name { get; set; }
        public long PhoneNumber { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string District { get; set; }
        public string State { get; set; }
        public long PostalCode { get; set; }
        public string Country { get; set; }
        public bool IsActive { get; set; }

    }
}
