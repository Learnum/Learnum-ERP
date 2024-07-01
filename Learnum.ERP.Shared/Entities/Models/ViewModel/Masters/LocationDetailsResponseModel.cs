using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Learnum.ERP.Shared.Entities.Models.ViewModel
{
    public class LocationDetailsResponseModel: BaseModel
    {
        public long LocationId { get; set; }

        public string Location { get; set; }

        public string LocationIP { get; set; }

        public string IPStatus { get; set; }
    }
}
