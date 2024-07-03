using Learnum.ERP.Repository.Master.HRD_repo;
using Learnum.ERP.Shared.Core;
using Learnum.ERP.Shared.Entities.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;

namespace Learnum.ERP.API.Controller.HRD
{
    [Route("api/[controller]")]
    [ApiController]
    public class AttendenceSheetDetailsController : ControllerBase
    {
        private readonly IAttendenceSheetDetailsRepository attendencesheetDetailsRepository;
        private readonly ILogger<AttendenceSheetDetailsController> logger;

        public AttendenceSheetDetailsController(
            ILogger<AttendenceSheetDetailsController> _logger,
            IAttendenceSheetDetailsRepository _attendencesheetDetailsRepository)
        {
            logger = _logger;
            attendencesheetDetailsRepository = _attendencesheetDetailsRepository;
        }

        [HttpPost("InsertAttendenceSheetDetails")]
        public async Task<IActionResult> InsertAttendenceSheetDetails(AttendenceSheetDetailsModel attendencesheetDetailsModel)
        {
            if (attendencesheetDetailsModel == null)
            {
                return BadRequest("Object is null");
            }
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid model object");
            }

            var result = await attendencesheetDetailsRepository.InsertAttendenceSheetDetails(attendencesheetDetailsModel);
            if (result == ResponseCode.Success || result == ResponseCode.Updated)
            {
                return Ok(result);
            }
            return BadRequest("Failed to Save");
        }

        [HttpGet("getAllAttendenceSheetList")]
        public async Task<IActionResult> GetAllAttendenceDetailsList()
        {
            var data = await attendencesheetDetailsRepository.GetAttendenceSheetDetailsList();
            if (data != null)
            {
                return Ok(data);
            }
            return NotFound("No record found");
        }
    }
}
