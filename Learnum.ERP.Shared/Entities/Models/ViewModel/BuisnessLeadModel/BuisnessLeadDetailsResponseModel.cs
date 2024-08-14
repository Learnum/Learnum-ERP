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
        public string AddressLine1 { get; set; }
        public string AddressLine2 { get; set; }
        public string City { get; set; }
        public long PostalCode { get; set; }
        public long StateId { get; set; }
        public long CountryId { get; set; }
        public bool IsActive { get; set; }
    }
}
