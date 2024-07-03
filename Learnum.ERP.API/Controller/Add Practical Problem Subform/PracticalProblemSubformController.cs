using Learnum.ERP.API.Controller.Student_Management;
using Learnum.ERP.Repository.Master.Add_Practical_Problems_Subform;
using Learnum.ERP.Repository.Master.Student_Management;
using Learnum.ERP.Shared.Core;
using Learnum.ERP.Shared.Entities.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Learnum.ERP.API.Controller.Add_Practical_Problem_Subform
{
    [Route("api/[controller]")]
    [ApiController]
    public class PracticalProblemSubformController : ControllerBase
    {
        private readonly IPracticalProblemsSubformRepository practicalProblemsSubformRepository;
        private readonly ILogger<PracticalProblemSubformController> logger;

        public PracticalProblemSubformController(
            ILogger<PracticalProblemSubformController> _logger,
            IPracticalProblemsSubformRepository _practicalProblemsSubformRepository)
        {
            logger = _logger;
            practicalProblemsSubformRepository = _practicalProblemsSubformRepository;
        }

        [HttpPost("AddPracticalProblemDetails")]
        public async Task<IActionResult> AddPracticalProblemDetails(PracticalProblemsSubform practicalProblemsSubform)
        {
            if (practicalProblemsSubform == null)
            {
                return BadRequest("Object is null");
            }
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid model object");
            }

            var result = await practicalProblemsSubformRepository.AddPracticalProblemDetails(practicalProblemsSubform);
            if (result == ResponseCode.Success || result == ResponseCode.Updated)
            {
                return Ok(result);
            }
            return BadRequest("Failed to Save");
        }

        [HttpGet("getPracticalProblemList")]
        public async Task<IActionResult> GetPracticalProblemList()
        {
            var data = await practicalProblemsSubformRepository.GetPracticalProblemList();
            if (data != null)
            {
                return Ok(data);
            }
            return NotFound("No record found");
        }
    }
}
