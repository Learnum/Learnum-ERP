using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Net.Sockets;
using System.Text;
using System.Threading.Tasks;

namespace Learnum.ERP.Shared.Entities.Models
{
    public class EmployeeDetailsModel : BaseModel
    {
        public long EmployeeId { get; set; }
        public string EmployeeName { get; set; }
        public long EmployeePhone { get; set; }
        public string? Email { get; set; }
        public long AadharNumber { get; set; }
        public string? DateOfBirth { get; set; }
        public string? BloodGroup { get; set; }
        public string? Gender { get; set; }
        public string? Qualification { get; set; }
        //  public string FilePath { get; set; }
        // public string EmployeePhoto { get; set; }
        //  public string FileName { get; set; }
        // public string MimeType { get; set; }
        //public string? Address { get; set; }
        //public string? City { get; set; }
        //public string? State { get; set; }
        //public long PostalCode { get; set; }
        public string? Role { get; set; }
        public bool IsActive { get; set; }
        public IFormFile File { get; set; }

    }

    //public class EmployeeModel
    //{
    //    public string EmployeeName { get; set; }
    //    public string Email { get; set; }
    //    public string EmployeePhone { get; set; }

    //    //[StringLength(12, MinimumLength = 12)]
    //    public string AadharNumber { get; set; }

    //    //[DataType(DataType.Date)]
    //    public DateTime DateOfBirth { get; set; }

    //    public string BloodGroup { get; set; }

    //    public string Gender { get; set; }

    //    public string Qualification { get; set; }

    //    public byte[] EmployeePhoto { get; set; }

    //    public AddressDetails CurrentAddress { get; set; }

    //    public AddressDetails PermanentAddress { get; set; }

    //    public string Role { get; set; }

    //    public bool IsActive { get; set; }
    //}
    //public class AddressDetails
    //{
    //    public string Address { get; set; }

    //    public string City { get; set; }

    //    public string State { get; set; }

    //    //[StringLength(6, MinimumLength = 6)]
    //    public string PostalCode { get; set; }
    //}
}
