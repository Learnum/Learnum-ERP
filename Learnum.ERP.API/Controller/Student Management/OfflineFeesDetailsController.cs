using Learnum.ERP.Repository.Master;
using Learnum.ERP.Repository.Master.Student_Management;
using Learnum.ERP.Shared.Core;
using Learnum.ERP.Shared.Entities.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Learnum.ERP.API.Controller.Student_Management
{
    [Route("api/[controller]")]
    [ApiController]
    public class OfflineFeesDetailsController : ControllerBase
    {
        private readonly IOfflineFeesDetailsRepository offlineFeesDetailsRepository;
        private readonly ILogger<OfflineFeesDetailsController> logger;

        public OfflineFeesDetailsController(
            ILogger<OfflineFeesDetailsController> _logger,
            IOfflineFeesDetailsRepository _offlineFeesDetailsRepository)
        {
            logger = _logger;
            offlineFeesDetailsRepository = _offlineFeesDetailsRepository;
        }


        [HttpPost("InsertOfflineFeesDetails")]
        public async Task<IActionResult> InsertOfflineFeesDetails(OfflineFeesDetailsModel offlineFeesDetailsModel)
        {
            if (offlineFeesDetailsModel == null)
            {
                return BadRequest("Object is null");
            }
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid model object");
            }

            var result = await offlineFeesDetailsRepository.InsertOfflineFeesDetails(offlineFeesDetailsModel);
            if (result == ResponseCode.Success || result == ResponseCode.Updated)
            {
                return Ok(result);
            }
            return BadRequest("Failed to Save");
        }

        [HttpGet("getOfflineFeesDetailsList")]
        public async Task<IActionResult> GetOfflineFeesDetailsList()
        {
            var data = await offlineFeesDetailsRepository.GetOfflineFeesDetailsList();
            if (data != null)
            {
                return Ok(data);
            }
            return NotFound("No record found");
        }

        [HttpGet("GetOfflineFeesDetailsByID/{OfflineFeesPaymentId}")]
        public async Task<IActionResult> GetOfflineFeesDetailsByID(long? OfflineFeesPaymentId)
        {
            if (OfflineFeesPaymentId == null)
            {
                return BadRequest("Object is null");
            }
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid model object");
            }

            var result = await offlineFeesDetailsRepository.GetOfflineFeesDetailsByID(OfflineFeesPaymentId);
            return Ok(result);
        }
    }
}
