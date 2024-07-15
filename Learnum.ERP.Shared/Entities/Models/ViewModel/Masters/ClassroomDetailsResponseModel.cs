using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Learnum.ERP.Shared.Entities.Models.ViewModel
{
    public class ClassroomDetailsResponseModel
    {
        public long ClassRoomId { get; set; }
        public long BranchId { get; set; }

        public string BranchName { get; set; }

        public string ClassroomName { get; set; }

        public string StudentCapacity { get; set; }

        public bool IsActive { get; set; }
    }
}
