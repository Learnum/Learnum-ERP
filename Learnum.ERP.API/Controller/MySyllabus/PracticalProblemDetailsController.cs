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
    public class PracticalProblemDetailsController : ControllerBase
    {
        private readonly IPracticalProblemDetailsRepository  practicalproblemDetailsRepository;
        private readonly ILogger<PracticalProblemDetailsController> logger;

        public PracticalProblemDetailsController(
            ILogger<PracticalProblemDetailsController> _logger,
            IPracticalProblemDetailsRepository _practicalproblemDetailsRepository)
        {
            logger = _logger;
            practicalproblemDetailsRepository = _practicalproblemDetailsRepository;
        }

        [HttpPost("InsertPracticalProblemDetails")]
        public async Task<IActionResult> InsertPracticalProblemDetails(PracticalProblemModel practicalproblemDetailsModel)
        {
            if (practicalproblemDetailsModel == null)
            {
                return BadRequest("Object is null");
            }
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid model object");
            }

            var result = await practicalproblemDetailsRepository.InsertPracticalProblemDetails(practicalproblemDetailsModel);
            if (result == ResponseCode.Success || result == ResponseCode.Updated)
            {
                return Ok(result);
            }
            return BadRequest("Failed to Save");
        }

        [HttpGet("getAllPracticalProblemList")]
        public async Task<IActionResult> GetAllPracticalProblemDetailsList()
        {
            var data = await practicalproblemDetailsRepository.GetPracticalProblemDetailsList();
            if (data != null)
            {
                return Ok(data);
            }
            return NotFound("No record found");
        }

    }
}
