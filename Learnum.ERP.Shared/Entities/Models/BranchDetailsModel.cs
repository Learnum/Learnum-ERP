using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Learnum.ERP.Shared.Entities.Models
{
  
    public class BranchDetailsModel : BaseModel
    {
    public long BranchId {get;set;}
	public string BranchName {get;set;}
	public string Town {get;set;}
	public string City {get;set;}
	public string State {get;set;}
	public long PostalCode {get;set;}
	public bool IsActive {get;set;}

    }
}
