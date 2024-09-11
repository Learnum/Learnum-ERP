using Learnum.ERP.Repository.Master;
using Learnum.ERP.Repository.Master.Student_Management;
using Learnum.ERP.Shared.Core;
using Learnum.ERP.Shared.Entities.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Learnum.ERP.API.Controller.Student_Management
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentAdmissionsDetailsController : ControllerBase
    {
        private readonly IStudentAdmissionsDetailsRepository studentAdmissionsDetailsRepository;
        private readonly ILogger<StudentAdmissionsDetailsController> logger;

        public StudentAdmissionsDetailsController(
           ILogger<StudentAdmissionsDetailsController> _logger,
           IStudentAdmissionsDetailsRepository _studentAdmissionsDetailsRepository)
        {
            logger = _logger;
            studentAdmissionsDetailsRepository = _studentAdmissionsDetailsRepository;
        }

        [HttpPost("InsertStudentAdmissionsDetails")]
        public async Task<IActionResult> InsertStudentAdmissionsDetails(StudentAdmissionsDetailsModel studentAdmissionsDetailsModel)
        {
            if (studentAdmissionsDetailsModel == null)
            {
                return BadRequest("Object is null");
            }
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid model object");
            }

            var result = await studentAdmissionsDetailsRepository.InsertStudentAdmissionsDetails(studentAdmissionsDetailsModel);
            if (result == ResponseCode.Success || result == ResponseCode.Updated)
            {
                return Ok(result);
            }
            return BadRequest("Failed to Save");
        }

        [HttpGet("GetAllBranches")]
        public async Task<IActionResult> GetBranchDetails()
        {
            var data = studentAdmissionsDetailsRepository.GetBranchDetails();
            return Ok(data.Result);
        }


        [HttpGet("GetAllCourses")]
        public async Task<IActionResult> GetCourseDetails()
        {
            var data = studentAdmissionsDetailsRepository.GetCourseDetails();
            return Ok(data.Result);
        }

        [HttpGet("getBatchDetails/{BranchId}")]
        public async Task<IActionResult> GetBatchDetailsbyBranchID(long? BranchId)
        {
            if (BranchId == null)
            {
                return BadRequest("Object is null");
            }
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid model object");
            }

            var result = await studentAdmissionsDetailsRepository.GetBatchDetailsbyBranchID(BranchId);
            return Ok(result);
        }

        [HttpGet("getAllStudentAdmissionsList")]
        public async Task<IActionResult> GetStudentAdmissionsDetailsList()
        {
            var data = await studentAdmissionsDetailsRepository.GetStudentAdmissionsDetailsList();
            if (data != null)
            {
                return Ok(data);
            }
            return NotFound("No record found");
        }

        [HttpGet("getStudentDetailsByAdmissionId/{AdmissionId}")]
        public async Task<IActionResult> GetStudentDetailsByAdmissionId(long? AdmissionId)
        {
            if (AdmissionId == null)
            {
                return BadRequest("Object is null");
            }
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid model object");
            }

            var result = await studentAdmissionsDetailsRepository.GetStudentAdmissionsDetailsByAdmissionId(AdmissionId);
            return Ok(result);
        }
    }
}
