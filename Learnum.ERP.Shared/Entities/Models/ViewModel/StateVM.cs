using Learnum.ERP.Shared.Entities.Models.Comman;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Learnum.ERP.Shared.Entities.Models.ViewModel
{
    public class StateVM : StateMaster
    {
        public List<CityMaster>? cityMasters { get; set; }
    }
}
