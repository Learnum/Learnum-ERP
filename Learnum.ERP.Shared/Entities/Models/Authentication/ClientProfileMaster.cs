using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Learnum.ERP.Shared.Entities.Models.Authentication
{
    public class ClientProfileMaster : BaseModel
    {
        public long ClientProfileId { get; set; }
        public long UserId { get; set; }
        public long ProfileTypeId { get; set; }
        public string FName { get; set; }
        public string Mname { get; set; }
        public string LName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Gender { get; set; }
        public string PANNo { get; set; }
        public string CompanyName { get; set; }
        public string CompanyUrl { get; set; }
        public string CompanyPAN { get; set; }
        public string CompanyTAN { get; set; }
        public string OfficalWebsite { get; set; }
        public DateTime EstablishedDate { get; set; }
        public string AadharNo { get; set; }
        public string PhoneNo { get; set; }
        public string ProfileTag { get; set; }
        public Boolean IsPrimary { get; set; }
        public string EmailId { get; set; }
        public string MobileNo { get; set; }
        public string Password { get; set; }
        public long IsActive { get; set; }
    }
}
