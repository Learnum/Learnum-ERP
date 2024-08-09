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
    public class StudentCounsellingDetailsController : ControllerBase
    {
        private readonly IStudentCounsellingDetailsRepository studentcounsellingDetailsRepository;
        private readonly ILogger<StudentCounsellingDetailsController> logger;

        public StudentCounsellingDetailsController(
            ILogger<StudentCounsellingDetailsController> _logger,
            IStudentCounsellingDetailsRepository _studentcounsellingDetailsRepository)
        {
            logger = _logger;
            studentcounsellingDetailsRepository = _studentcounsellingDetailsRepository;
        }

        [HttpPost("InsertStudentCounsellingDetails")]
        public async Task<IActionResult> InsertStudentCounsellingDetails(StudentCounsellingDetailsModel studentcounsellingDetailsModel)
        {
            if (studentcounsellingDetailsModel == null)
            {
                return BadRequest("Object is null");
            }
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid model object");
            }

            var result = await studentcounsellingDetailsRepository.InsertStudentCounsellingDetails(studentcounsellingDetailsModel);
            if (result == ResponseCode.Success || result == ResponseCode.Updated)
            {
                return Ok(result);
            }
            return BadRequest("Failed to Save");
        }

        [HttpGet("getAllStudentCounsellingList")]
        public async Task<IActionResult> GetStudentCounsellingDetailsList()
        {
            var data = await studentcounsellingDetailsRepository.GetStudentCounsellingDetailsList();
            if (data != null)
            {
                return Ok(data);
            }
            return NotFound("No record found");
        }

        [HttpGet("getStudentCounsellingDetails/{CounsellingId}")]
        public async Task<IActionResult> GetStudentCounselling(long? CounsellingId)
        {
            if (CounsellingId == null)
            {
                return BadRequest("Object is null");
            }
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid model object");
            }

            var result = await studentcounsellingDetailsRepository.GetStudentCounselling(CounsellingId);
            return Ok(result);
        }
    }
}
