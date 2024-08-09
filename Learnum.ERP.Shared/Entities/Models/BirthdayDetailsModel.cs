using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Learnum.ERP.Shared.Entities.Models
{
    public class BirthdayDetailsModel: BaseModel
    {
        public long? BirthId { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Role { get; set; }
        public DateTime? Date { get; set; }
        public string Day { get; set; }
        public string Month { get; set; }
        public bool IsActive { get; set; }
    }
}
