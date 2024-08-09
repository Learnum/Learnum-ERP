using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata;
using System.Text;
using System.Threading.Tasks;

namespace Learnum.ERP.Shared.Entities.Models.ViewModel.Student_Management
{
    public class OfflineFeesDetailsResponseModel:BaseModel
    {
        public long OfflineFeesPaymentId { get; set; }
        public DateTime DateOfPayment { get; set; }
        public string ModeOfPayment { get; set; }
        public long ReferenceNumber { get; set; }
        public string StudentName { get; set; }
        public long StudentId { get; set; }
        public long PhoneNumber { get; set; }
        public long CourseId { get; set; }
        public String CourseName {  get; set; }
        public long BranchId { get; set; }
        public string BranchName { get; set; }
        public long BatchId { get; set; }
        public string BatchName { get; set; }
        public long Amountpaid { get; set; }
        public string Remarks { get; set; }
        public bool IsActive { get; set; }
    }
}
