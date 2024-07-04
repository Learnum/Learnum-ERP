using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Learnum.ERP.Shared.Entities.Models.ViewModel.HRDModel
{
   public class BranchManagerDetailsResponseModel
    {
        public long BranchId { get; set; }
        public string BranchManagerName { get; set; }
        public string BranchName { get; set; }
        public string Status { get; set; }

    }
}
