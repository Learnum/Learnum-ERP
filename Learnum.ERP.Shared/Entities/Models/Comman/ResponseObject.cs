using Learnum.ERP.Shared.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Learnum.ERP.Shared.Entities.Models.Comman
{
    public class ResponseObject
    {
        public ResponseCode ResponseCode { get; set; }
        public object Data { get; set; }
        public string Message { get; set; }
    }
}
