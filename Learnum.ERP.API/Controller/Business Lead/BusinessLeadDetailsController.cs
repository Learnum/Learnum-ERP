using Learnum.ERP.API.Controller.Counsellor_Dashboard;
using Learnum.ERP.Repository.Master.Business_Lead_repo;
using Learnum.ERP.Repository.Master.Counsellor_Dashboard_repo;
using Learnum.ERP.Shared.Core;
using Learnum.ERP.Shared.Entities.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Learnum.ERP.API.Controller.Business_Lead
{
    [Route("api/[controller]")]
    [ApiController]
    public class BusinessLeadDetailsController : ControllerBase
    {
        private readonly IBusinessLeadDetailsRepository businessLeadDetailsRepository;
        private readonly ILogger<BusinessLeadDetailsController> logger;

        public BusinessLeadDetailsController(
            ILogger<BusinessLeadDetailsController> _logger,
            IBusinessLeadDetailsRepository _businessLeadDetailsRepository)
        {
            logger = _logger;
            businessLeadDetailsRepository = _businessLeadDetailsRepository;
        }

        [HttpPost("InsertBusinessLeadDetails")]
        public async Task<IActionResult> InsertBusinessLeadDetails(BuisnessLeadDetailsModel businessLeadDetailsModel)
        {
            if (businessLeadDetailsModel == null)
            {
                return BadRequest("Object is null");
            }
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid model object");
            }

            var result = await businessLeadDetailsRepository.InsertBusinessLeadDetails(businessLeadDetailsModel);
            if (result == ResponseCode.Success || result == ResponseCode.Updated)
            {
                return Ok(result);
            }
            return BadRequest("Failed to Save");
        }

        [HttpGet("getAllBusinessLeadList")]
        public async Task<IActionResult> GetScheduleMeetingDetailsList()
        {
            var data = await businessLeadDetailsRepository.GetBuisnessLeadDetailsList();
            if (data != null)
            {
                return Ok(data);
            }
            return NotFound("No record found");
        }
    }
}
