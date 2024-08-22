using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Learnum.ERP.Shared.Entities.Models
{
    public class ContactDetails   
    {
        public long ContactId { get; set; }
       // public long CollegeId { get; set; }
        public string Name { get; set; }
        public long PhoneNumber { get; set; }
        public string Email { get; set; }
        public long RoleId { get; set; }
        //public bool IsActive { get; set; }
      
    }
}
