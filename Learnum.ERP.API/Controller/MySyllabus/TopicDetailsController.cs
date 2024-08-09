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
    public class TopicDetailsController : ControllerBase
    {
        private readonly ITopicDetailsRepository topicDetailsRepository;
        private readonly ILogger<TopicDetailsController> logger;

        public TopicDetailsController(
            ILogger<TopicDetailsController> _logger,
            ITopicDetailsRepository _topicDetailsRepository)
        {
            logger = _logger;
            topicDetailsRepository = _topicDetailsRepository;
        }

        [HttpPost("InsertTopicDetails")]
        public async Task<IActionResult> InsertTopicDetails(TopicDetailsModel topicDetailsModel)
        {
            if (topicDetailsModel == null)
            {
                return BadRequest("Object is null");
            }
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid model object");
            }

            var result = await topicDetailsRepository.InsertTopicDetails(topicDetailsModel);
            if (result == ResponseCode.Success || result == ResponseCode.Updated)
            {
                return Ok(result);
            }
            return BadRequest("Failed to Save");
        }

        [HttpGet("getAllTopicList")]
        public async Task<IActionResult> GetAllTopicDetailsList()
        {
            var data = await topicDetailsRepository.GetTopicDetailsList();
            if (data != null)
            {
                return Ok(data);
            }
            return NotFound("No record found");
        }
    }
}
