using Learnum.ERP.Repository.Master.HRD_repo;
using Learnum.ERP.Shared.Core;
using Learnum.ERP.Shared.Entities.Models;
using Microsoft.AspNetCore.Mvc;

namespace Learnum.ERP.API.Controller.HRD
{
    [Route("api/[controller]")]
    [ApiController]
    public class BirthdayDetailsController : ControllerBase
    {
        private readonly IBirthdayDetailsRepository birthdayDetailsRepository;
        private readonly ILogger<BirthdayDetailsController> logger;

        public BirthdayDetailsController(
            ILogger<BirthdayDetailsController> _logger,
           IBirthdayDetailsRepository _birthdayDetailsRepository)
        {
            logger = _logger;
            birthdayDetailsRepository = _birthdayDetailsRepository;
        }

        [HttpPost("InsertBirthdayDetails")]
        public async Task<IActionResult> InsertBirthdayDetails(BirthdayDetailsModel birthdaytDetailsModel)
        {
            if (birthdaytDetailsModel == null)
            {
                return BadRequest("Object is null");
            }
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid model object");
            }

            var result = await birthdayDetailsRepository.InsertBirthdayDetails(birthdaytDetailsModel);
            if (result == ResponseCode.Success || result == ResponseCode.Updated)
            {
                return Ok(result);
            }
            return BadRequest("Failed to Save");
        }

        [HttpGet("getAllBirthdayList")]
        public async Task<IActionResult> GetBirthdayDetailsList()
        {
            var data = await birthdayDetailsRepository.GetBirthdayDetailsList();
            if (data != null)
            {
                return Ok(data);
            }
            return NotFound("No record found");
        }
    }
}
