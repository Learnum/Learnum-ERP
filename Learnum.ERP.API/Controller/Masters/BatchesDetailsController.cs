using Learnum.ERP.API.Controller.Branch;
using Learnum.ERP.Repository.Master;
using Learnum.ERP.Shared.Core;
using Learnum.ERP.Shared.Entities.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Learnum.ERP.API.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class BatchesDetailsController : ControllerBase
    {
        private readonly IBatchesDetailsRepository batchesDetailsRepository;
        private readonly ILogger<BatchesDetailsController> logger;

        public BatchesDetailsController(
            ILogger<BatchesDetailsController> _logger,
            IBatchesDetailsRepository _batchesDetailsRepository)
        {
            logger = _logger;
            batchesDetailsRepository = _batchesDetailsRepository;
        }

        [HttpPost("InsertBatchesDetails")]
        public async Task<IActionResult> InsertBatchesDetails(BatchesDetailsModel batchesDetailsModel)
        {
            if (batchesDetailsModel == null)
            {
                return BadRequest("Object is null");
            }
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid model object");
            }

            var result = await batchesDetailsRepository.InsertBatchesDetails(batchesDetailsModel);
            if (result == ResponseCode.Success || result == ResponseCode.Updated)
            {
                return Ok(result);
            }
            return BadRequest("Failed to Save");
        }

        [HttpGet("getAllBatchesList")]
        public async Task<IActionResult> GetBatchesDetailsList()
        {
            var data = await batchesDetailsRepository.GetBatchesDetailsList();
            if (data != null)
            {
                return Ok(data);
            }
            return NotFound("No record found");
        }
    }
}
