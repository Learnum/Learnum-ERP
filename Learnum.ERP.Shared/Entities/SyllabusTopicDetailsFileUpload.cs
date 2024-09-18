using Learnum.ERP.Shared.Entities.Models;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Learnum.ERP.Shared.Entities
{

    public class TopicInformationModelFileUpload : BaseModel
    {
        public long TopicId { get; set; }
        public string Heading { get; set; }
        public string Content { get; set; }
        public string Reference { get; set; }
        public string SubTopic { get; set; }

        public string MimeType { get; set; }
        public string DocumentName { get; set; }
        public string FileName { get; set; }
        public string FilePath { get; set; }

    }





    public class SyllabusListModel
    {
        public SyllabusDetailsModel? syllabusDetailsModel { get; set; }
        public List<TopicInformationModel>? topicInformationModel { get; set; }

        public IFormFile File { get; set; }
    }
}
