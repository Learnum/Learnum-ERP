using Learnum.ERP.API.Controller.Student_Management;
using Learnum.ERP.Repository.Master.CounselorsPlaning;
using Learnum.ERP.Repository.Master.Student_Management;
using Learnum.ERP.Shared.Core;
using Learnum.ERP.Shared.Entities.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Learnum.ERP.API.Controller.CounselorsPlaning
{
    [Route("api/[controller]")]
    [ApiController]
    public class CounselorsPlaningController : ControllerBase
    {
        private readonly ICounselorsPlaningRepository counselorsPlaningRepository;
        private readonly ILogger<CounselorsPlaningController> logger;

        public CounselorsPlaningController(
            ILogger<CounselorsPlaningController> _logger,
            ICounselorsPlaningRepository _counselorsPlaningRepository)
        {
            logger = _logger;
            counselorsPlaningRepository = _counselorsPlaningRepository;
        }

        [HttpPost("InsertTrainersBatches")]
        public async Task<IActionResult> InsertCounselorsPlaningDetails(CounselorsPlaningModel counselorsPlaningModel)
        {
            if (counselorsPlaningModel == null)
            {
                return BadRequest("Object is null");
            }
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid model object");
            }

            var result = await counselorsPlaningRepository.InsertCounselorsPlaningDetails(counselorsPlaningModel);
            if (result == ResponseCode.Success || result == ResponseCode.Updated)
            {
                return Ok(result);
            }
            return BadRequest("Failed to Save");
        }

        [HttpGet("getCounselorsPlaningList")]
        public async Task<IActionResult> GetCounselorsPlaningList()
        {
            var data = await counselorsPlaningRepository.GetCounselorsPlaningList();
            if (data != null)
            {
                return Ok(data);
            }
            return NotFound("No record found");
        }
    }
}
