using Learnum.ERP.Repository.Master.MySyllabus_repo;
using Learnum.ERP.Shared.Core;
using Learnum.ERP.Shared.Entities.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;

namespace Learnum.ERP.API.Controller.MySyllabus
{
    [Route("api/[controller]")]
    [ApiController]
    public class GeneralExamDetailsController : ControllerBase
    {
        private readonly IGeneralExamDetailsRepository generalexamDetailsRepository;
        private readonly ILogger<GeneralExamDetailsController> logger;

        public GeneralExamDetailsController(
            ILogger<GeneralExamDetailsController> _logger,
            IGeneralExamDetailsRepository _generalexamDetailsRepository)
        {
            logger = _logger;
            generalexamDetailsRepository = _generalexamDetailsRepository;
        }

        [HttpPost("InsertGeneralExamDetails")]
        public async Task<IActionResult> InsertGeneralExamDetails(GeneralExamDetailsModel generalexamDetailsModel)
        {
            if (generalexamDetailsModel == null)
            {
                return BadRequest("Object is null");
            }
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid model object");
            }

            var result = await generalexamDetailsRepository.InsertGeneralExamDetails(generalexamDetailsModel);
            if (result == ResponseCode.Success || result == ResponseCode.Updated)
            {
                return Ok(result);
            }
            return BadRequest("Failed to Save");
        }

        [HttpGet("getAllGeneralExamList")]
        public async Task<IActionResult> GetAllGeneralExamDetailsList()
        {
            var data = await generalexamDetailsRepository.GetGeneralExamDetailsList();
            if (data != null)
            {
                return Ok(data);
            }
            return NotFound("No record found");
        }
    }
}
