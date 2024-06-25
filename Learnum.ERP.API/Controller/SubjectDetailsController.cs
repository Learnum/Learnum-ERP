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
    public class SubjectDetailsController : ControllerBase
    {
        private readonly ISubjectDetailsRepository subjectDetailsRepository;
        private readonly ILogger<SubjectDetailsController> logger;

        public SubjectDetailsController(
            ILogger<SubjectDetailsController> _logger,
            ISubjectDetailsRepository _subjectDetailsRepository)
        {
            logger = _logger;
            subjectDetailsRepository = _subjectDetailsRepository;
        }

        [HttpPost("InsertSubjectDetails")]
        public async Task<IActionResult> InsertSubjectDetails(SubjectDetailsModel subjectDetailsModel)
        {
            if (subjectDetailsModel == null)
            {
                return BadRequest("Object is null");
            }
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid model object");
            }

            var result = await subjectDetailsRepository.InsertSubjectDetails(subjectDetailsModel);
            if (result == ResponseCode.Success || result == ResponseCode.Updated)
            {
                return Ok(result);
            }
            return BadRequest("Failed to Save");
        }

        [HttpGet("getAllSubjectList")]
        public async Task<IActionResult> GetSubjectDetailsList()
        {
            var data = await subjectDetailsRepository.GetSubjectDetailsList();
            if (data != null)
            {
                return Ok(data);
            }
            return NotFound("No record found");
        }
    }
}
