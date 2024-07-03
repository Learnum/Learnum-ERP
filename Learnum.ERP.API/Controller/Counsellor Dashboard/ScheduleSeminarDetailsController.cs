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
    public class ScheduleSeminarDetailsController : ControllerBase
    {
        private readonly IScheduleSeminarDetailsRepository scheduleseminarDetailsRepository;
        private readonly ILogger<ScheduleSeminarDetailsController> logger;

        public ScheduleSeminarDetailsController(
            ILogger<ScheduleSeminarDetailsController> _logger,
            IScheduleSeminarDetailsRepository _scheduleseminarDetailsRepository)
        {
            logger = _logger;
            scheduleseminarDetailsRepository = _scheduleseminarDetailsRepository;
        }

        [HttpPost("InsertScheduleSeminarDetails")]
        public async Task<IActionResult> InsertEmployeeDetails(ScheduleSeminarDetailsModel scheduleSeminarDetailsModel)
        {
            if (scheduleSeminarDetailsModel == null)
            {
                return BadRequest("Object is null");
            }
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid model object");
            }

            var result = await scheduleseminarDetailsRepository.InsertScheduleSeminarDetails(scheduleSeminarDetailsModel);
            if (result == ResponseCode.Success || result == ResponseCode.Updated)
            {
                return Ok(result);
            }
            return BadRequest("Failed to Save");
        }

        [HttpGet("getAllScheduleSeminarList")]
        public async Task<IActionResult> GetScheduleSeminarDetailsList()
        {
            var data = await scheduleseminarDetailsRepository.GetScheduleSeminarDetailsList();
            if (data != null)
            {
                return Ok(data);
            }
            return NotFound("No record found");
        }
    }
}
