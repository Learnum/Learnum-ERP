using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Learnum.ERP.Shared.Entities.Models.Masters
{
    public class ApplicationMaster : BaseModel
    {
        public long ApplicationId { get; set; }
        public string? ApplicationName { get; set; }
        public string? LogoName { get; set; }
        public string? Description { get; set; }
        public long ApplicationCategoryId { get; set; }
        public string? ApplicationCategoryName { get; set; }
        public bool IsActive { get; set; }

    }
    public class ApplicationMasterModel : ApplicationMaster
    {
        public long AdminUserId { get; set; }

    }
}
