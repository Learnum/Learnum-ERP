using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Learnum.ERP.Shared.Entities.Models
{
    public class BirthdayDetailsModel: BaseModel
    {
        public int BirthdayID { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Role { get; set; }
        public DateTime DateOfBirth { get; set; }
        public int Day { get; set; }
        public int Month { get; set; }
        public string Status { get; set; }
    }
}
