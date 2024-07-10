using Learnum.ERP.Repository.Master;
using Learnum.ERP.Shared.Core;
using Learnum.ERP.Shared.Entities.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Learnum.ERP.API.Controller.Branch
{
    [Route("api/[controller]")]
    [ApiController]
    public class BranchDetailsController : ControllerBase
    {
        private readonly IBranchDetailsRepository branchDetailsRepository;
        private readonly ILogger<BranchDetailsController> logger;

        public BranchDetailsController(
            ILogger<BranchDetailsController> _logger,
            IBranchDetailsRepository _branchDetailsRepository)
        {
            logger = _logger;
            branchDetailsRepository = _branchDetailsRepository;
        }

        [AllowAnonymous]

        [HttpPost("InsertBranchDetails")]
        public async Task<IActionResult> InsertBranchDetails(BranchDetailsModel branchDetailsModel)
        {
            if (branchDetailsModel == null)
            {
                return BadRequest("Object is null");
            }
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid model object");
            }

            var result = await branchDetailsRepository.InsertBranchDetails(branchDetailsModel);
            if (result == ResponseCode.Success || result == ResponseCode.Updated)
            {
                return Ok(result);
            }
            return BadRequest("Failed to Save");
        }

        [HttpGet("getAllBranchList")]
        public async Task<IActionResult> GetBranchDetailsList()
        {
            var data = await branchDetailsRepository.GetBranchDetailsList();
            if (data != null)
            {
                return Ok(data);
            }
            return NotFound("No record found");
        }
    }
}
