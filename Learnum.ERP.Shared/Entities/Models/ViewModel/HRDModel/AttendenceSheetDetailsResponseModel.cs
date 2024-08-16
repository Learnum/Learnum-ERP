using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Learnum.ERP.Shared.Entities.Models.ViewModel.HRDModel
{
    public class AttendenceSheetDetailsResponseModel:BaseModel
    {
        public string Name { get; set; }
        public string Role { get; set; }
        public DateTime Date { get; set; }
        public DateTime Time { get; set; }
    }
}
