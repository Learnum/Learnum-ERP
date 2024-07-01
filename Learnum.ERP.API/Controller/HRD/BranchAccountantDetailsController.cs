using Learnum.ERP.Repository.Master.HRD_repo;
using Learnum.ERP.Shared.Core;
using Learnum.ERP.Shared.Entities.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;

namespace Learnum.ERP.API.Controller.HRD
{
    public class BranchAccountantDetailsController : ControllerBase
    {
        private readonly IBranchAccountantDetailsRepository branchaccountantDetailsRepository;
        private readonly ILogger<BranchAccountantDetailsController> logger;

        public BranchAccountantDetailsController(
            ILogger<BranchAccountantDetailsController> _logger,
           IBranchAccountantDetailsRepository _branchaccountantDetailsRepository)
        {
            logger = _logger;
            branchaccountantDetailsRepository = _branchaccountantDetailsRepository;
        }

        [HttpPost("InsertBranchAccountantDetails")]
        public async Task<IActionResult> InsertBranchAccountantDetails(BranchAccountantDetailsModel branchaccountantDetailsModel)
        {
            if (branchaccountantDetailsModel == null)
            {
                return BadRequest("Object is null");
            }
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid model object");
            }

            var result = await branchaccountantDetailsRepository.InsertBranchAccountantDetails(branchaccountantDetailsModel);
            if (result == ResponseCode.Success || result == ResponseCode.Updated)
            {
                return Ok(result);
            }
            return BadRequest("Failed to Save");
        }

        [HttpGet("getAllBranchAccountantList")]
        public async Task<IActionResult> GetBranchAccountantDetailsList()
        {
            var data = await branchaccountantDetailsRepository.GetBranchAccountantDetailsList();
            if (data != null)
            {
                return Ok(data);
            }
            return NotFound("No record found");
        }
    }
}
