using Learnum.ERP.API.Controller.Student_Management;
using Learnum.ERP.Repository.Master.My_Practical_Exam;
using Learnum.ERP.Repository.Master.Student_Management;
using Learnum.ERP.Shared.Core;
using Learnum.ERP.Shared.Entities.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Learnum.ERP.API.Controller.My_Practical_Exam
{
    [Route("api/[controller]")]
    [ApiController]
    public class MyPracticalExamController : ControllerBase
    {
        private readonly IMyPracticalExamRepository myPracticalExamRepository;
        private readonly ILogger<MyPracticalExamController> logger;

        public MyPracticalExamController(
           ILogger<MyPracticalExamController> _logger,
           IMyPracticalExamRepository _myPracticalExamRepository)
        {
            logger = _logger;
            myPracticalExamRepository = _myPracticalExamRepository;
        }

        [HttpPost("StudentAnswerDetails")]
        public async Task<IActionResult> StudentAnswerDetails(MyPracticalExamModel myPracticalExamModel)
        {
            if (myPracticalExamModel == null)
            {
                return BadRequest("Object is null");
            }
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid model object");
            }

            var result = await myPracticalExamRepository.StudentAnswerDetails(myPracticalExamModel);
            if (result == ResponseCode.Success || result == ResponseCode.Updated)
            {
                return Ok(result);
            }
            return BadRequest("Failed to Save");
        }

        [HttpGet("getAllStudentAnswerList")]
        public async Task<IActionResult> GetStudentAnswerList()
        {
            var data = await myPracticalExamRepository.GetStudentAnswerList();
            if (data != null)
            {
                return Ok(data);
            }
            return NotFound("No record found");
        }
    }
}
