﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Learnum.ERP.Shared.Entities.Models.ViewModel.CounsellorDashboardModel
{
    public class StudentLeadDetailsResponseModel
    {
        public long StudentId { get; set; }
        public string StudentName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string CollegeName { get; set; }
        public string BranchName { get; set; }
        public int StudentPhone { get; set; }
        public string LeadSource { get; set; }
        public string Education { get; set; }
        public string ParentsPhone { get; set; }
        public string StudentEmail { get; set; }
        public string Gender { get; set; }
        public string Address { get; set; }
        public string CityOrDistrict { get; set; }
    }
}