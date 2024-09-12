using Learnum.ERP.API.Controller.HRD;
using Learnum.ERP.API.Helpers;
using Learnum.ERP.Repository.Master;
using Learnum.ERP.Repository.Master.HRD_repo;
using Learnum.ERP.Repository.Master.MySyllabus_repo;
using Learnum.ERP.Shared.Core;
using Learnum.ERP.Shared.Entities;
using Learnum.ERP.Shared.Entities.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Learnum.ERP.API.Controller.MySyllabus
{
    [Route("api/[controller]")]
    [ApiController]
    public class SyllabusDetailsController : ControllerBase
    {
        private readonly ISyllabusDetailsRepository syllabusDetailsRepository;
        private readonly ILogger<SyllabusDetailsController> logger;

        public SyllabusDetailsController(
            ILogger<SyllabusDetailsController> _logger,
            ISyllabusDetailsRepository _syllabusDetailsRepository)
        {
            logger = _logger;
            syllabusDetailsRepository = _syllabusDetailsRepository;
        }

        [HttpPost("InsertSyllabusDetails")]
        public async Task<IActionResult> InsertCourseDetails([FromForm] TopicFormData topicFormData)
        {

            TopicInformationModel? topicInformationModel = JsonConvert.DeserializeObject<TopicInformationModel>(topicFormData.TopicInformationModel); ;

            var files = Request.Form.Files;

            if (topicFormData == null)
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

            TopicInformationModel fileUpload = new TopicInformationModel();
            fileUpload.FileName = file.FileName;
            fileUpload.MimeType = file.ContentType;
            fileUpload.FilePath = fullPath;
            fileUpload.TopicId = topicInformationModel.TopicId;
            fileUpload.Heading = topicInformationModel.Heading;
            fileUpload.Content = topicInformationModel.Content;
            fileUpload.Reference = topicInformationModel.Reference;
            fileUpload.SubTopic = topicInformationModel.SubTopic;
            fileUpload.AddedBy = base.User.Identity.GetUserId();
            fileUpload.UpdatedBy = base.User.Identity.GetUserId();
            fileUpload.AddedDate = DateTime.Now;
            fileUpload.UpdatedDate = DateTime.Now;

            var result = await syllabusDetailsRepository.InsertSyllabusDetails(fileUpload);

            if (result == ResponseCode.Success || result == ResponseCode.Updated)
            {
                return Ok(result);
            }

            return BadRequest("Failed to save");
        }

        [HttpGet("getSyllabusDetails")]
        public async Task<IActionResult> GetSyllabusDetails()
        {
            var data = await syllabusDetailsRepository.getSyllabusDetails();
            if (data != null)
            {
                return Ok(data);
            }
            return NotFound("No record found");
        }


        [HttpGet("getSyllabusDetailsById/{SyllabusId}")]
        public async Task<IActionResult> GetSyllabusDetailsById(long? SyllabusId)
        {
            if (SyllabusId == null)
            {
                return BadRequest("Object is null");
            }
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid model object");
            }

            var result = await syllabusDetailsRepository.GetSyllabusDetailsById(SyllabusId);
            return Ok(result);
        }
    }
}
