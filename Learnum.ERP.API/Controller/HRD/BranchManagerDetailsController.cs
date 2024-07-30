using Learnum.ERP.Repository.Master;
using Learnum.ERP.Repository.Master.HRD_repo;
using Learnum.ERP.Repository.Master.Masters;
using Learnum.ERP.Shared.Core;
using Learnum.ERP.Shared.Entities.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Learnum.ERP.API.Controller.HRD
{
     [Route("api/[controller]")]
        [ApiController]

        public class BranchManagerDetailsController : ControllerBase
        {
            private readonly IBranchManagerDetailsRepository branchmanagerDetailsRepository;
            private readonly ILogger<BranchManagerDetailsController> logger;

         public BranchManagerDetailsController(
                ILogger<BranchManagerDetailsController> _logger,
                IBranchManagerDetailsRepository _branchmanagerDetailsRepository)
            {
                logger = _logger;
               branchmanagerDetailsRepository = _branchmanagerDetailsRepository;
            }

            [HttpPost("InsertBranchManagerDetails")]
            public async Task<IActionResult> InsertBranchManagerDetails(BranchManagerDetailsModel branchmanagerDetailsModel)
            {
                if (branchmanagerDetailsModel == null)
                {
                    return BadRequest("Object is null");
                }
                if (!ModelState.IsValid)
                {
                    return BadRequest("Invalid model object");
                }

                var result = await branchmanagerDetailsRepository.InsertBranchManagerDetails(branchmanagerDetailsModel);
                if (result == ResponseCode.Success || result == ResponseCode.Updated)
                {
                    return Ok(result);
                }
                return BadRequest("Failed to Save");
            }

        [HttpGet("getAllBranchManagerList")]
        public async Task<IActionResult> GetBranchManagerDetailsList()
        {
            var data = await branchmanagerDetailsRepository.GetBranchManagerDetailsList();
            if (data != null)
            {
                return Ok(data);
            }
            return NotFound("No record found");
        }

        [HttpGet("getBranchManagerDetails/{BranchManagerId}")]
        public async Task<IActionResult> GetBranchManagerDetails(long? BranchManagerId)
        {
            if (BranchManagerId == null)
            {
                return BadRequest("Object is null");
            }
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid model object");
            }

            var result = await branchmanagerDetailsRepository.GetBranchManagerDetails(BranchManagerId);
            return Ok(result);
        }
    }
    }

