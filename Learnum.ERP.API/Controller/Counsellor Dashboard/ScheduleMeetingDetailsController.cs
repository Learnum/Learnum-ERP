using Learnum.ERP.API.Controller.HRD;
using Learnum.ERP.Repository.Master;
using Learnum.ERP.Repository.Master.Counsellor_Dashboard_repo;
using Learnum.ERP.Shared.Core;
using Learnum.ERP.Shared.Entities.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Learnum.ERP.API.Controller.Counsellor_Dashboard
{
    [Route("api/[controller]")]
    [ApiController]
    public class ScheduleMeetingDetailsController : ControllerBase
    {
        private readonly IScheduleMeetingDetailsRepository schedulemeetingDetailsRepository;
        private readonly ILogger<ScheduleMeetingDetailsController> logger;

        public ScheduleMeetingDetailsController(
            ILogger<ScheduleMeetingDetailsController> _logger,
            IScheduleMeetingDetailsRepository _schedulemeetingDetailsRepository)
        {
            logger = _logger;
            schedulemeetingDetailsRepository = _schedulemeetingDetailsRepository;
        }

        [HttpPost("InsertScheduleMeetingDetails")]
        public async Task<IActionResult> InsertScheduleMeetingDetails(ScheduleMeetingDetailsModel schedulemeetingDetailsModel)
        {
            if (schedulemeetingDetailsModel == null)
            {
                return BadRequest("Object is null");
            }
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid model object");
            }

            var result = await schedulemeetingDetailsRepository.InsertScheduleMeetingDetails(schedulemeetingDetailsModel);
            if (result == ResponseCode.Success || result == ResponseCode.Updated)
            {
                return Ok(result);
            }
            return BadRequest("Failed to Save");
        }

        [HttpGet("getAllScheduleMeetingList")]
        public async Task<IActionResult> GetScheduleMeetingDetailsList()
        {
            var data = await schedulemeetingDetailsRepository.GetScheduleMeetingDetailsList();
            if (data != null)
            {
                return Ok(data);
            }
            return NotFound("No record found");
        }
    }
}
