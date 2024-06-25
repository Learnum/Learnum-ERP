using Learnum.ERP.Repository.Master;
using Learnum.ERP.Shared.Core;
using Learnum.ERP.Shared.Entities.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Learnum.ERP.API.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class CourseDetailsController : ControllerBase
    {
        private readonly ICourseDetailsRepository courseDetailsRepository;
        private readonly ILogger<CourseDetailsController> logger;

        public CourseDetailsController(
           ILogger<CourseDetailsController> _logger,
           ICourseDetailsRepository _courseDetailsRepository)
        {
            logger = _logger;
            courseDetailsRepository = _courseDetailsRepository;
        }


        [HttpPost("InsertCourseDetails")]
        public async Task<IActionResult> InsertCourseDetails(CourseDetailsModel courseDetailsModel)
        {
            if (courseDetailsModel == null)
            {
                return BadRequest("Object is null");
            }
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid model object");
            }

            var result = await courseDetailsRepository.InsertCourseDetails(courseDetailsModel);
            if (result == ResponseCode.Success || result == ResponseCode.Updated)
            {
                return Ok(result);
            }
            return BadRequest("Failed to Save");
        }

        [HttpGet("getAllCourseList")]
        public async Task<IActionResult> GetCourseDetailsList()
        {
            var data = await courseDetailsRepository.GetCourseDetailsList();
            if (data != null)
            {
                return Ok(data);
            }
            return NotFound("No record found");
        }

    }
}
