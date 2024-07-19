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
    public class StudentLeadDetailsController : ControllerBase
    {
        private readonly IStudentLeadDetailsRepository studentleadDetailsRepository;
        private readonly ILogger<StudentLeadDetailsController> logger;

        public StudentLeadDetailsController(
            ILogger<StudentLeadDetailsController> _logger,
            IStudentLeadDetailsRepository _studentleadDetailsRepository)
        {
            logger = _logger;
            studentleadDetailsRepository = _studentleadDetailsRepository;
        }

        [HttpPost("InsertStudentLeadDetails")]
        public async Task<IActionResult> InsertStudentLeadDetails(StudentLeadDetailsModel studentleadDetailsModel)
        {
            if (studentleadDetailsModel == null)
            {
                return BadRequest("Object is null");
            }
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid model object");
            }

            var result = await studentleadDetailsRepository.InsertStudentLeadDetails(studentleadDetailsModel);
            if (result == ResponseCode.Success || result == ResponseCode.Updated)
            {
                return Ok(result);
            }
            return BadRequest("Failed to Save");
        }

        [HttpGet("getAllStudentLeadList")]
        public async Task<IActionResult> GetStudentLeadDetailsList()
        {
            var data = await studentleadDetailsRepository.GetStudentLeadDetailsList();
            if (data != null)
            {
                return Ok(data);
            }
            return NotFound("No record found");
        }
    }
}
