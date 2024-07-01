using Learnum.ERP.API.Controller.Branch;
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
    public class StudentDetailsController : ControllerBase
    {
        private readonly IStudentDetailsRepository studentDetailsRepository;
        private readonly ILogger<StudentDetailsController> logger;

        public StudentDetailsController(
            ILogger<StudentDetailsController> _logger,
            IStudentDetailsRepository _studentDetailsRepository )
        {
            logger = _logger;
            studentDetailsRepository = _studentDetailsRepository;
        }

        [HttpPost("InsertStudentDetails")]
        public async Task<IActionResult> InsertStudentDetails(StudentDetailsModel studentDetailsModel)
        {
            if (studentDetailsModel == null)
            {
                return BadRequest("Object is null");
            }
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid model object");
            }

            var result = await studentDetailsRepository.InsertStudentDetails(studentDetailsModel);
            if (result == ResponseCode.Success || result == ResponseCode.Updated)
            {
                return Ok(result);
            }
            return BadRequest("Failed to Save");
        }

        [HttpGet("getAllStudentList")]
        public async Task<IActionResult> GetStudentDetailsList()
        {
            var data = await studentDetailsRepository.GetStudentDetailsList();
            if (data != null)
            {
                return Ok(data);
            }
            return NotFound("No record found");
        }
    }
}
