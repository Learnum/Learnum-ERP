using Learnum.ERP.API.Controller.Student_Management;
using Learnum.ERP.Repository.Master;
using Learnum.ERP.Repository.Master.Student_Management;
using Learnum.ERP.Repository.Master.Trainers;
using Learnum.ERP.Shared.Core;
using Learnum.ERP.Shared.Entities.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Learnum.ERP.API.Controller.Trainers_Details
{
    [Route("api/[controller]")]
    [ApiController]
    public class SyllabusStatusController : ControllerBase
    {
        private readonly ISyllabusStatusRepository syllabusStatusRepository;
        private readonly ILogger<SyllabusStatusController> logger;

        public SyllabusStatusController(
           ILogger<SyllabusStatusController> _logger,
           ISyllabusStatusRepository _syllabusStatusRepository)
        {
            logger = _logger;
            syllabusStatusRepository = _syllabusStatusRepository;
        }

        [HttpPost("AddSyllabusStatuses")]
        public async Task<IActionResult> AddSyllabusStatuses(SyllabusStatusModel syllabusStatusModel)
        {
            if (syllabusStatusModel == null)
            {
                return BadRequest("Object is null");
            }
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid model object");
            }

            var result = await syllabusStatusRepository.AddSyllabusStatuses(syllabusStatusModel);
            if (result == ResponseCode.Success || result == ResponseCode.Updated)
            {
                return Ok(result);
            }
            return BadRequest("Failed to Save");
        }

        [HttpGet("getAllSyllabusStatusesList")]
        public async Task<IActionResult> GetSyllabusStatusesList()
        {
            var data = await syllabusStatusRepository.GetSyllabusStatusesList();
            if (data != null)
            {
                return Ok(data);
            }
            return NotFound("No record found");
        }

        [HttpGet("getSyllabusDetails/{TrainerId}")]
        public async Task<IActionResult> GetSyllabusDetails(long? TrainerId)
        {
            if (TrainerId == null)
            {
                return BadRequest("Object is null");
            }
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid model object");
            }

            var result = await syllabusStatusRepository.GetSyllabusDetails(TrainerId);
            return Ok(result);
        }
    }
}
