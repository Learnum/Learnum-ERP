using Learnum.ERP.API.Controller.HRD;
using Learnum.ERP.Repository.Master;
using Learnum.ERP.Repository.Master.Counsellor_Dashboard_repo;
using Learnum.ERP.Shared.Core;
using Learnum.ERP.Shared.Entities.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Learnum.ERP.API.Controller.Counsellor_Dashboard
{
    [Route("api/[controller]")]
    [ApiController]
    public class WebsiteLeadDetailsController : ControllerBase
    {
        private readonly IWebsiteLeadDetailsRepository websiteleadDetailsRepository;
        private readonly ILogger<WebsiteLeadDetailsController> logger;

        public WebsiteLeadDetailsController(
            ILogger<WebsiteLeadDetailsController> _logger,
            IWebsiteLeadDetailsRepository _websiteleadDetailsRepository)
        {
            logger = _logger;
            websiteleadDetailsRepository = _websiteleadDetailsRepository;
        }

        [HttpPost("InsertWebsiteLeadDetails")]
        public async Task<IActionResult> InsertWebsiteLeadDetails(WebsiteLeadDetailsModel websiteleadDetailsModel)
        {
            if (websiteleadDetailsModel == null)
            {
                return BadRequest("Object is null");
            }
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid model object");
            }

            var result = await websiteleadDetailsRepository.InsertWebsiteLeadDetails(websiteleadDetailsModel);
            if (result == ResponseCode.Success || result == ResponseCode.Updated)
            {
                return Ok(result);
            }
            return BadRequest("Failed to Save");
        }

        [HttpGet("getAllWebsiteLeadList")]
        public async Task<IActionResult> GetWebsiteLeadDetailsList()
        {
            var data = await websiteleadDetailsRepository.GetWebsiteLeadDetailsList();
            if (data != null)
            {
                return Ok(data);
            }
            return NotFound("No record found");
        }

        [HttpGet("getWebsiteLeadDetails/{StudentId}")]
        public async Task<IActionResult> GetWebsiteleadDetails(long? StudentId)
        {
            if (StudentId == null)
            {
                return BadRequest("Object is null");
            }
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid model object");
            }

            var result = await websiteleadDetailsRepository.GetWebsiteleadDetails(StudentId);
            return Ok(result);
        }
    }
}
