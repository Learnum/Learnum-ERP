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
        public string AddressLine1 { get; set; }
        public string AddressLine2 { get; set; }
        public string City { get; set; }
        public long PostalCode { get; set; }
        public long StateId { get; set; }
        public long CountryId { get; set; }
        public bool IsActive { get; set; }
    }
}
