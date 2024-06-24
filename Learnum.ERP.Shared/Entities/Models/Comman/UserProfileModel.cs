using Learnum.ERP.Shared.Entities.Models.Authentication;
using Learnum.ERP.Shared.Entities.Models.Masters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Learnum.ERP.Shared.Entities.Models.Comman
{
    public class AddUserDetais : BaseModel
    {
        public long UserId { get; set; }//1 
        public string UserName { get; set; }//2 
        public string EmailId { get; set; }//3
        public string MobileNo { get; set; }//4 
        public bool IsActive { get; set; }//5 
        public bool IsAdmin { get; set; }//6
        public long AdminUserId { get; set; }
        public string? Password { get; set; }

    }
    public class AddUserDetaisVM : AddUserDetais
    {
        public string? Status { get; set; }


    }
    public class UserProfileModel
    {

        public long UserId { get; set; }//1 
        public string GSTINNO { get; set; }//5
        public string PANNO { get; set; }//6
        public string OrganizationName { get; set; }//7
        public string FlatDoor { get; set; }//8
        public string BuildingName { get; set; }//9
        public string? RoadStreet { get; set; }//10
        public string City { get; set; }//11
        public string? District { get; set; }//12
        public long PINCode { get; set; }//13
        public long StateId { get; set; }//14
        public long? CountryId { get; set; }//15
        public bool IsGSTInvoiceRequired { get; set; }//16
        public string? AreaLocality { get; set; }//17
        public long? AddedBy { get; set; }//18
        public DateTime? AddedDate { get; set; }//19
        public long? UpdatedBy { get; set; }//20
        public DateTime? UpdatedDate { get; set; }//21
        public string UserName { get; set; }//5
        public long MobileNo { get; set; }//6
        public string EmailId { get; set; }//7
    }

    public class UserProfileModelVM : UserProfileModel
    {

        public long UserId { get; set; }//1 
        public string UserName { get; set; }//5
        public long MobileNo { get; set; }//6
        public string EmailId { get; set; }//7
        public bool IsAdmin { get; set; }//6


    }
    public class GetAllUserslistForAdminModel
    {
        public List<AddUserDetais> lstAddUserDetais { get; set; }
        public List<ApplicationMasterModel> lstApplicationMaster { get; set; }
        public List<IdentityRole> lstIdentityRole { get; set; }

    }
}
