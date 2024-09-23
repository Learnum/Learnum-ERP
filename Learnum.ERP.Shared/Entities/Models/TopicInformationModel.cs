using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Learnum.ERP.Shared.Entities.Models
{
    public class TopicInformationModel
    {
        public string Heading { get; set; }
        public string Content { get; set; }
        public string Reference { get; set; }
        public string SubTopic { get; set; }
        public IFormFile File { get; set; }
    }

    public class TopicFormData
    {
        public string SyllabusDetailsModel { get; set; }
        public string TopicInformationModel { get; set; }
    }

}
