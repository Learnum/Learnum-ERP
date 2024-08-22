using Learnum.ERP.Shared.Entities.Models;
using System;
using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;

    namespace Learnum.ERP.Shared.Entities
    {
    public class CollegeContactDetails
    {
        public AddCollegesDetails? addCollegesDetails { get; set; }
        public List<ContactDetails>? contactDetails { get; set; }
        public List<DepartmentDetails>? departmentDetails { get; set; }

    }
    //public class CollegeContactDetails
    //{
    //    public AddcollegesDetails AddcollegesDetails { get; set; }
    //    public List<ContactDetails> ContactDetails { get; set; }
    //    public List<DepartmentDetails> DepartmentDetails { get; set; }
    //}
}
   
