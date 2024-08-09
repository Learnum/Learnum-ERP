
using Learnum.ERP.Repository.Master;
using Learnum.ERP.Repository.Master.HRD_repo;
using Learnum.ERP.Shared.Core;
using Learnum.ERP.Shared.Entities.Models;
using Microsoft.AspNetCore.Mvc;

namespace Learnum.ERP.API.Controller.HRD
{

    [Route("api/[controller]")]
    [ApiController]
    public class BranchCounsellorDetailsController: ControllerBase
    {
        private readonly IBranchCounsellorDetailsRepository branchcounsellorDetailsRepository;
        private readonly ILogger<BranchCounsellorDetailsController> logger;

        public BranchCounsellorDetailsController(
            ILogger<BranchCounsellorDetailsController> _logger,
           IBranchCounsellorDetailsRepository _branchCounsellorDetailsRepository)
        {
            logger = _logger;
            branchcounsellorDetailsRepository = _branchCounsellorDetailsRepository;
        }

        [HttpPost("InsertBranchCounsellorDetails")]
        public async Task<IActionResult> InsertBranchCounsellorDetails(BranchCounsellorDetailsModel branchcounsellorDetailsModel)
        {
            if (branchcounsellorDetailsModel == null)
            {
                return BadRequest("Object is null");
            }
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid model object");
            }

            var result = await branchcounsellorDetailsRepository.InsertBranchCounsellorDetails(branchcounsellorDetailsModel);
            if (result == ResponseCode.Success || result == ResponseCode.Updated)
            {
                return Ok(result);
            }
            return BadRequest("Failed to Save");
        }

        [HttpGet("getAllBranchCounsellorList")]
        public async Task<IActionResult> GetBranchCounsellorDetailsList()
        {
            var data = await branchcounsellorDetailsRepository.GetBranchCounsellorDetailsList();
            if (data != null)
            {
                return Ok(data);
            }
            return NotFound("No record found");
        }


        [HttpGet("getBranchCounsellorDetails/{CounsellorId}")]
        public async Task<IActionResult>GetBranchCounsellorDetails(long? CounsellorId)
        {
            if (CounsellorId == null)
            {
                return BadRequest("Object is null");
            }
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid model object");
            }

            var result = await branchcounsellorDetailsRepository.GetBranchCounsellorDetails(CounsellorId);
            return Ok(result);
        }
    }
}
