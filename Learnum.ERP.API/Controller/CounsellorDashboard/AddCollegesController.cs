using Learnum.ERP.API.Controller.Branch;
using Learnum.ERP.Repository.Master;
using Learnum.ERP.Repository.Master.CounsellorDashboard;
using Learnum.ERP.Shared.Core;
using Learnum.ERP.Shared.Entities;
using Learnum.ERP.Shared.Entities.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Learnum.ERP.API.Controller.CounsellorDashboard
{
    [Route("api/[controller]")]
    [ApiController]
    public class AddCollegesController : ControllerBase
    {
        private readonly IAddCollegesRepository addCollegesRepository;
        private readonly ILogger<AddCollegesController> logger;

        public AddCollegesController(
            ILogger<AddCollegesController> _logger,
            IAddCollegesRepository _addCollegesRepository)
        {
            logger = _logger;
            addCollegesRepository = _addCollegesRepository;
        }

        [HttpPost("InsertCollegesDetails")]
        public async Task<IActionResult> InsertCollegesDetails(CollegeContactDetails collegeContactDetails)
        {
            if (collegeContactDetails == null)
            {
                return BadRequest("Object is null");
            }
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid model object");
            }

            var result = await addCollegesRepository.InsertCollegesDetails(collegeContactDetails);
            if (result == ResponseCode.Success || result == ResponseCode.Updated)
            {
                return Ok(result);
            }
            return BadRequest("Failed to Save");
        }


        [HttpGet("getAllCollegesList")]
        public async Task<IActionResult> GetCollegesDetailsList()
        {
            var data = await addCollegesRepository.GetCollegesDetailsList();
            if (data != null)
            {
                return Ok(data);
            }
            return NotFound("No record found");
        }
    }
}
