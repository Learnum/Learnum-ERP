using Learnum.ERP.API.Controller.HRD;
using Learnum.ERP.Repository.Master.HRD_repo;
using Learnum.ERP.Repository.Master.MySyllabus_repo;
using Learnum.ERP.Shared.Core;
using Learnum.ERP.Shared.Entities.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Learnum.ERP.API.Controller.MySyllabus
{
    [Route("api/[controller]")]
    [ApiController]
    public class SyllabusDetailsController : ControllerBase
    {
        private readonly ISyllabusDetailsRepository syllabusDetailsRepository;
        private readonly ILogger<SyllabusDetailsController> logger;

        public SyllabusDetailsController(
            ILogger<SyllabusDetailsController> _logger,
            ISyllabusDetailsRepository _syllabusDetailsRepository)
        {
            logger = _logger;
            syllabusDetailsRepository = _syllabusDetailsRepository;
        }

        [HttpPost("InsertSyllabusDetails")]
        public async Task<IActionResult> InsertSyllabusDetails(SyllabusDetailsModel syllabusDetailsModel)
        {
            if (syllabusDetailsModel == null)
            {
                return BadRequest("Object is null");
            }
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid model object");
            }

            var result = await syllabusDetailsRepository.InsertSyllabusDetails(syllabusDetailsModel);
            if (result == ResponseCode.Success || result == ResponseCode.Updated)
            {
                return Ok(result);
            }
            return BadRequest("Failed to Save");
        }

        [HttpGet("getAllSyllabusList")]
        public async Task<IActionResult> GetAllSyllabusDetailsList()
        {
            var data = await syllabusDetailsRepository.GetSyllabusDetailsList();
            if (data != null)
            {
                return Ok(data);
            }
            return NotFound("No record found");
        }
    }
}
