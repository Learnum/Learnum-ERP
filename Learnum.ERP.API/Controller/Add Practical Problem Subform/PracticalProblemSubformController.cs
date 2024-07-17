using Learnum.ERP.API.Controller.Student_Management;
using Learnum.ERP.API.Helpers;
using Learnum.ERP.Repository.Master;
using Learnum.ERP.Repository.Master.Add_Practical_Problems_Subform;
using Learnum.ERP.Repository.Master.Student_Management;
using Learnum.ERP.Shared.Core;
using Learnum.ERP.Shared.Entities;
using Learnum.ERP.Shared.Entities.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Learnum.ERP.API.Controller.Add_Practical_Problem_Subform
{
    [Route("api/[controller]")]
    [ApiController]
    public class PracticalProblemSubformController : ControllerBase
    {
        private readonly IPracticalProblemsSubformRepository practicalProblemsSubformRepository;
        private readonly ILogger<PracticalProblemSubformController> logger;

        public PracticalProblemSubformController(
          ILogger<PracticalProblemSubformController> _logger,
          IPracticalProblemsSubformRepository _practicalProblemsSubformRepository)
        {
            logger = _logger;
            practicalProblemsSubformRepository = _practicalProblemsSubformRepository;
        }


        [HttpPost("AddPracticalProblem")]
        public async Task<IActionResult> AddPracticalProblem([FromForm] PracticalFormData practicalFormData)
        {

            PracticalProblemsSubform? practicalProblemsSubform = JsonConvert.DeserializeObject<PracticalProblemsSubform>(practicalFormData.PracticalProblemsSubform); ;

            var files = Request.Form.Files;

            if (practicalFormData == null)
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

            AddPracticalFileUpload fileUpload = new AddPracticalFileUpload();
            fileUpload.FileName = file.FileName;
            fileUpload.MimeType = file.ContentType;
            fileUpload.FilePath = fullPath;
            fileUpload.Question = practicalProblemsSubform.Question;
            fileUpload.ModelAnswer = practicalProblemsSubform.ModelAnswer;
            fileUpload.Marks = practicalProblemsSubform.Marks;
            fileUpload.IsActive = practicalProblemsSubform.IsActive;
            fileUpload.AddedBy = base.User.Identity.GetUserId();
            fileUpload.UpdatedBy = base.User.Identity.GetUserId();
            fileUpload.AddedDate = DateTime.Now;
            fileUpload.UpdatedDate = DateTime.Now;

            var result = await practicalProblemsSubformRepository.AddPracticalProblem(fileUpload);

            if (result == ResponseCode.Success || result == ResponseCode.Updated)
            {
                return Ok(result);
            }

            return BadRequest("Failed to save");
        }

        [HttpGet("getAllPracticalProblemList")]
        public async Task<IActionResult> GetCourseDetailsList()
        {
            var data = await practicalProblemsSubformRepository.GetPracticalProblemList();
            if (data != null)
            {
                return Ok(data);
            }
            return NotFound("No record found");
        }
    }
}
