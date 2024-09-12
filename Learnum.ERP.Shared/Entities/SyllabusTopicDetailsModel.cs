using Learnum.ERP.Shared.Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Learnum.ERP.Shared.Entities
{
    public class SyllabusTopicDetailsModel
    {
        public SyllabusDetailsModel? syllabusDetailsModel { get; set; }
        public List<TopicInformationModel>? topicInformationModel { get; set; }
    }
}
