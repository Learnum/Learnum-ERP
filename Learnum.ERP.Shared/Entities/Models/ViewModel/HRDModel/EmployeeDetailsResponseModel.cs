﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Learnum.ERP.Shared.Entities.Models.ViewModel
{
     public class EmployeeDetailsResponseModel
    {
        public long EmployeeId { get; set; }

        public string EmployeeName { get; set; }

        public string EmployeeEmail { get; set; }

        public string EmployeePhone { get; set; }

        public long AadharNumber { get; set; }

        public DateTime DateOfBirth { get; set; }

        public string BloodGroup { get; set; }
        public string Gender { get; set; }
        public string Qualification { get; set; }

        public string AddressLine { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string PostalCode { get; set; }
        public string EmployeeRole { get; set; }
        public string EmployeeStatus { get; set; }

    }
}