using Learnum.ERP.API.Controller.Student_Management;
using Learnum.ERP.Repository.Master.CounselorsPlaning;
using Learnum.ERP.Repository.Master.Student_Management;
using Learnum.ERP.Shared.Core;
using Learnum.ERP.Shared.Entities.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Learnum.ERP.API.Controller.CounselorsPlaning
{
    [Route("api/[controller]")]
    [ApiController]
    public class AddBatchController : ControllerBase
    {
        private readonly IAddBatchDetailsRepository addBatchDetailsRepository;
        private readonly ILogger<AddBatchController> logger;

        public AddBatchController(
           ILogger<AddBatchController> _logger,
           IAddBatchDetailsRepository _addBatchDetailsRepository)
        {
            logger = _logger;
            addBatchDetailsRepository = _addBatchDetailsRepository;
        }

        [HttpPost("AddBatchDetails")]
        public async Task<IActionResult> InsertAddBatchDetails(AddBatchDetailsModel addBatchDetailsModel)
        {
            if (addBatchDetailsModel == null)
            {
                return BadRequest("Object is null");
            }
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid model object");
            }

            var result = await addBatchDetailsRepository.InsertAddBatchDetails(addBatchDetailsModel);
            if (result == ResponseCode.Success || result == ResponseCode.Updated)
            {
                return Ok(result);
            }
            return BadRequest("Failed to Save");
        }

        [HttpGet("getAllAddBatchList")]
        public async Task<IActionResult> GetAddBatchDetailsList()
        {
            var data = await addBatchDetailsRepository.GetAddBatchDetailsList();
            if (data != null)
            {
                return Ok(data);
            }
            return NotFound("No record found");
        }
    }
}
