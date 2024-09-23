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
        private readonly ISyllabusDetailsRepository _syllabusDetailsRepository;
        private readonly ILogger<SyllabusDetailsController> _logger;

        public SyllabusDetailsController(
            ILogger<SyllabusDetailsController> logger,
            ISyllabusDetailsRepository syllabusDetailsRepository)
        {
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _syllabusDetailsRepository = syllabusDetailsRepository ?? throw new ArgumentNullException(nameof(syllabusDetailsRepository));
        }

        [HttpPost("InsertSyllabusDetails")]
        public async Task<IActionResult> InsertSyllabusDetails( SyllabusListModel syllabusListModel)
        {
            //if (topicFormData == null)
            //{
            //    _logger.LogError("Received null form data");
            //    return BadRequest("Form data is null");
            //}

            //if (!ModelState.IsValid)
            //{
            //    _logger.LogError("Invalid model state");
            //    return BadRequest("Invalid model object");
            //}

            if (Request.Form.Files.Count == 0 || Request.Form.Files[0].Length == 0)
            {
                _logger.LogError("No file uploaded");
                return BadRequest("No file uploaded");
            }

            TopicInformationModel? topicInformationModel;
            SyllabusDetailsModel? syllabusDetailsModel;
            SyllabusListModel? syllabusTopicDetails;

            //try
            //{
            //    topicInformationModel = JsonConvert.DeserializeObject<TopicInformationModel>(topicFormData.TopicInformationModel);
            //    syllabusDetailsModel = JsonConvert.DeserializeObject<SyllabusDetailsModel>(topicFormData.SyllabusDetailsModel);
            //    syllabusTopicDetails = JsonConvert.DeserializeObject<SyllabusListModel>(topicFormData.SyllabusDetailsModel);
            //}
            //catch (JsonException ex)
            //{
            //    _logger.LogError($"Error deserializing input data: {ex.Message}");
            //    return BadRequest("Invalid data format");
            //}

            //if (topicInformationModel == null || syllabusDetailsModel == null || syllabusTopicDetails == null)
            //{
            //    _logger.LogError("Deserialization resulted in null model(s)");
            //    return BadRequest("Deserialization error");
            //}

            var file = Request.Form.Files[0];
            var fullPath = Path.Combine(ApplicationSettings.UploadPath, DateTime.Now.Ticks.ToString() + "_" + file.FileName);

            try
            {
                using (var stream = new FileStream(fullPath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"File upload failed: {ex.Message}");
                return StatusCode(StatusCodes.Status500InternalServerError, "File upload failed");
            }

            //TopicInformationModelFileUpload fileUpload = new TopicInformationModelFileUpload
            //{
            //    FileName = file.FileName,
            //    MimeType = file.ContentType,
            //    FilePath = fullPath,
            //    TopicId = topicInformationModel.TopicId,
            //    Heading = topicInformationModel.Heading,
            //    Content = topicInformationModel.Content,
            //    Reference = topicInformationModel.Reference,
            //    SubTopic = topicInformationModel.SubTopic,
            //    AddedBy = base.User.Identity.GetUserId(),
            //    UpdatedBy = base.User.Identity.GetUserId(),
            //    AddedDate = DateTime.Now,
            //    UpdatedDate = DateTime.Now
            //};

            //var result = await _syllabusDetailsRepository.InsertSyllabusDetails(fileUpload, syllabusDetailsModel, syllabusTopicDetails);

            //if (result == ResponseCode.Success || result == ResponseCode.Updated)
            //{
            //    return Ok(result);
            //}

            _logger.LogError("Failed to save the syllabus details");
            return BadRequest("Failed to save");
        }

        [HttpGet("getSyllabusDetails")]
        public async Task<IActionResult> GetSyllabusDetails()
        {
            var data = await _syllabusDetailsRepository.getSyllabusDetails();
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

            var result = await _syllabusDetailsRepository.GetSyllabusDetailsById(SyllabusId);
            return Ok(result);
        }
    }
}
