using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Learnum.ERP.Shared.Entities.Models.ViewModel.BuisnessLeadModel
{
    public class BuisnessLeadDetailsResponseModel : BaseModel
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
