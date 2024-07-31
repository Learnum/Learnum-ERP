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
    public class StudentLeadCallDetailsController : ControllerBase
    {
        private readonly IStudentLeadCallDetailsRepository studentleadcallDetailsRepository;
        private readonly ILogger<StudentLeadCallDetailsController> logger;

        public StudentLeadCallDetailsController(
            ILogger<StudentLeadCallDetailsController> _logger,
            IStudentLeadCallDetailsRepository _studentleadcallDetailsRepository)
        {
            logger = _logger;
            studentleadcallDetailsRepository = _studentleadcallDetailsRepository;
        }

        [HttpPost("InsertStudentLeadCallDetails")]
        public async Task<IActionResult> InsertStudentLeadCallDetails(StudentLeadCalldetailsModel studentleadcallDetailsModel)
        {
            if (studentleadcallDetailsModel == null)
            {
                return BadRequest("Object is null");
            }
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid model object");
            }

            var result = await studentleadcallDetailsRepository.InsertStudentLeadDetails(studentleadcallDetailsModel);
            if (result == ResponseCode.Success || result == ResponseCode.Updated)
            {
                return Ok(result);
            }
            return BadRequest("Failed to Save");
        }

        [HttpGet("getAllStudentLeadCallList")]
        public async Task<IActionResult> GetStudentLeadCallDetailsList()
        {
            var data = await studentleadcallDetailsRepository.GetStudentLeadDetailsList();
            if (data != null)
            {
                return Ok(data);
            }
            return NotFound("No record found");
        }

        [HttpGet("getStudentCallDetails/{CallId}")]
        public async Task<IActionResult> GetStudentLeadDetails(long? CallId)
        {
            if (CallId == null)
            {
                return BadRequest("Object is null");
            }
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid model object");
            }

            var result = await studentleadcallDetailsRepository.GetStudentLeadDetails(CallId);
            return Ok(result);
        }
    }
}
