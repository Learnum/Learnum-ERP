using Learnum.ERP.API.Helpers;
using Learnum.ERP.Repository.Master;
using Learnum.ERP.Shared.Core;
using Learnum.ERP.Shared.Entities;
using Learnum.ERP.Shared.Entities.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

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
        public async Task<IActionResult> InsertCourseDetails([FromForm] CourseFormData courseFormData)
        {

            CourseDetailsModel? courseDetailsModel = JsonConvert.DeserializeObject<CourseDetailsModel>(courseFormData.CourseDetailsModel); ;

            var files = Request.Form.Files;

            if (courseFormData == null)
            {
                return BadRequest("Object is null");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid model object");
            }

            if (files.Count == 0 || files[0].Length == 0)
            {
                return BadRequest("No file uploaded");
            }

            var file = files[0];
            var fullPath = Path.Combine(ApplicationSettings.UploadPath, DateTime.Now.Ticks.ToString() + "_" + file.FileName);

            using (var stream = new FileStream(fullPath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            //courseDetailsModel.FilePath = fullPath;
            //courseDetailsModel.MimeType = file.ContentType;
            //courseDetailsModel.FileName = file.FileName;
            //courseDetailsModel.AddedBy = base.User.Identity.GetUserId();
            //courseDetailsModel.UpdatedBy = base.User.Identity.GetUserId();
            //courseDetailsModel.AddedDate = DateTime.Now;
            //courseDetailsModel.UpdatedDate = DateTime.Now;

            CourseDetailFileUpload fileUpload = new CourseDetailFileUpload();
            fileUpload.FileName = file.FileName;
            fileUpload.MimeType = file.ContentType;
            fileUpload.FilePath = fullPath;
            fileUpload.CourseId = courseDetailsModel.CourseId;
            fileUpload.CourseName = courseDetailsModel.CourseName;
            fileUpload.Description = courseDetailsModel.Description;
            fileUpload.IsActive = courseDetailsModel.IsActive;
            fileUpload.AddedBy = base.User.Identity.GetUserId();
            fileUpload.UpdatedBy = base.User.Identity.GetUserId();
            fileUpload.AddedDate = DateTime.Now;
            fileUpload.UpdatedDate = DateTime.Now;

            var result = await courseDetailsRepository.InsertCourseDetails(fileUpload);

            if (result == ResponseCode.Success || result == ResponseCode.Updated)
            {
                return Ok(result);
            }

            return BadRequest("Failed to save");
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

        [HttpGet("getCourseDetails/{CourseId}")]
        public async Task<IActionResult> GetCourseDetails(long? CourseId)
        {
            if (CourseId == null)
            {
                return BadRequest("Object is null");
            }
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid model object");
            }

            var result = await courseDetailsRepository.GetCourseDetails(CourseId);
            return Ok(result);
        }

    }
}
