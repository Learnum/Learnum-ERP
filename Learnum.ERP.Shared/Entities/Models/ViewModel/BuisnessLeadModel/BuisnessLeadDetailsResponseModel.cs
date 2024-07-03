using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Learnum.ERP.Shared.Entities.Models.ViewModel.BuisnessLeadModel
{
    public class BuisnessLeadDetailsResponseModel
    { 
        public long userID { get; set; }
        public string Name { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public string CityOrDistrict { get; set; }
        public string StateOrProvince { get; set; }
        public long PostalCode { get; set; }
        public string Country { get; set; }

        public long? AddedBy { get; set; }
        public DateTime? AddedDate { get; set; }
        public long? UpdatedBy { get; set; }
        public DateTime? UpdatedDate { get; set; }
    }
}
