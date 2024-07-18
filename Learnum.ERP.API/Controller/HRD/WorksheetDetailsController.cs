using Learnum.ERP.Repository.Master;
using Learnum.ERP.Repository.Master.HRD_repo;
using Learnum.ERP.Shared.Core;
using Learnum.ERP.Shared.Entities.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging; 

namespace Learnum.ERP.API.Controller.HRD
{
    [Route("api/[controller]")]
    [ApiController]
    public class WorksheetDetailsController : ControllerBase
    {
        private readonly IWorksheetDetailsRepository worksheetDetailsRepository;
        private readonly ILogger<WorksheetDetailsController> logger;

        public WorksheetDetailsController(
          ILogger<WorksheetDetailsController> _logger,
         IWorksheetDetailsRepository _worksheetDetailsRepository)
        {
            logger = _logger;
            worksheetDetailsRepository = _worksheetDetailsRepository;
        }

        [HttpPost("InsertWorkSheetDetails")]
        public async Task<IActionResult> InsertWorksheetDetails(WorksheetDetailsModel worksheetDetailsModel)
        {
            if (worksheetDetailsModel == null)
            {
                return BadRequest("Object is null");
            }
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid model object");
            }

            var result = await worksheetDetailsRepository.InsertWorksheetDetails(worksheetDetailsModel);
            if (result == ResponseCode.Success || result == ResponseCode.Updated)
            {
                return Ok(result);
            }
            return BadRequest("Failed to Save");
        }

        [HttpGet("getWorkSheetList")]
        public async Task<IActionResult> GetWorksheetDetailsList()
        {
            var data = await worksheetDetailsRepository.GetWorksheetDetailsList();
            if (data != null)
            {
                return Ok(data);
            }
            return NotFound("No record found");
        }
    }
}
