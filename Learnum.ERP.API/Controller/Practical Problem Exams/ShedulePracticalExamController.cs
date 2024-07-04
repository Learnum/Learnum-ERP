using Learnum.ERP.API.Controller.Student_Management;
using Learnum.ERP.Repository.Master.Practical_Exams;
using Learnum.ERP.Repository.Master.Student_Management;
using Learnum.ERP.Shared.Core;
using Learnum.ERP.Shared.Entities.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Learnum.ERP.API.Controller.Practical_Exams
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShedulePracticalExamController : ControllerBase
    {
        private readonly IShedulePracticalExamRepository shedulePracticalExamRepository;
        private readonly ILogger<ShedulePracticalExamController> logger;

        public ShedulePracticalExamController(
            ILogger<ShedulePracticalExamController> _logger,
            IShedulePracticalExamRepository _shedulePracticalExamRepository)
        {
            logger = _logger;
            shedulePracticalExamRepository = _shedulePracticalExamRepository;
        }

        [HttpPost("ShedulePracticalExam")]
        public async Task<IActionResult> ShedulePracticalExam(ShedulePracticalExamModel shedulePracticalExamModel)
        {
            if (shedulePracticalExamModel == null)
            {
                return BadRequest("Object is null");
            }
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid model object");
            }

            var result = await shedulePracticalExamRepository.ShedulePracticalExam(shedulePracticalExamModel);
            if (result == ResponseCode.Success || result == ResponseCode.Updated)
            {
                return Ok(result);
            }
            return BadRequest("Failed to Save");
        }

        [HttpGet("getShedulePracticalExamList")]
        public async Task<IActionResult> GetShedulePracticalExamList()
        {
            var data = await shedulePracticalExamRepository.GetShedulePracticalExamList();
            if (data != null)
            {
                return Ok(data);
            }
            return NotFound("No record found");
        }
    }
}
