using Learnum.ERP.API.Controller.Branch;
using Learnum.ERP.API.Helpers;
using Learnum.ERP.Repository.Master;
using Learnum.ERP.Repository.Master.Student_Management;
using Learnum.ERP.Shared.Core;
using Learnum.ERP.Shared.Entities;
using Learnum.ERP.Shared.Entities.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Learnum.ERP.API.Controller.Student_Management
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentDetailsController : ControllerBase
    {
        private readonly IStudentDetailsRepository studentDetailsRepository;
        private readonly ILogger<StudentDetailsController> logger;

        public StudentDetailsController(
            ILogger<StudentDetailsController> _logger,
            IStudentDetailsRepository _studentDetailsRepository )
        {
            logger = _logger;
            studentDetailsRepository = _studentDetailsRepository;
        }

        [HttpPost("InsertStudentDetails")]
        public async Task<IActionResult> InsertStudentDetails([FromForm] studentFormData studentFormData)
        {

            StudentDetailsModel? studentDetailsModel = JsonConvert.DeserializeObject<StudentDetailsModel>(studentFormData.StudentDetailsModel); ;

            var files = Request.Form.Files;

            if (studentFormData == null)
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

            StudentDetailFileUpload fileUpload = new StudentDetailFileUpload();
            fileUpload.FileName = file.FileName;
            fileUpload.MimeType = file.ContentType;
            fileUpload.FilePath = fullPath;
            fileUpload.StudentName = studentDetailsModel.StudentName;
            fileUpload.StudentEmail = studentDetailsModel.StudentEmail;
            fileUpload.StudentPhone = studentDetailsModel.StudentPhone;
            fileUpload.AadharNumber = studentDetailsModel.AadharNumber;
            fileUpload.DateofBirth = studentDetailsModel.DateofBirth;
            fileUpload.Education = studentDetailsModel.Education;
            fileUpload.BloodGroup = studentDetailsModel.BloodGroup;
            fileUpload.Gender = studentDetailsModel.Gender;
            fileUpload.Town = studentDetailsModel.Town;
            fileUpload.City = studentDetailsModel.City;
            fileUpload.State = studentDetailsModel.State;
            fileUpload.PostalCode = studentDetailsModel.PostalCode;
            fileUpload.FatherName = studentDetailsModel.FatherName;
            fileUpload.FatherOccupation = studentDetailsModel.FatherOccupation; 
            fileUpload.FatherPhone = studentDetailsModel.FatherPhone;
            fileUpload.MotherName = studentDetailsModel.MotherName;
            fileUpload.MotherOccupation = studentDetailsModel.MotherOccupation;
            fileUpload.MotherPhone = studentDetailsModel.MotherPhone;
            fileUpload.StudentRole = studentDetailsModel.StudentRole;
            fileUpload.IsActive = studentDetailsModel.IsActive;
            fileUpload.AddedBy = base.User.Identity.GetUserId();
            fileUpload.UpdatedBy = base.User.Identity.GetUserId();
            fileUpload.AddedDate = DateTime.Now;
            fileUpload.UpdatedDate = DateTime.Now;

            var result = await studentDetailsRepository.InsertStudentDetails(fileUpload);

            if (result == ResponseCode.Success || result == ResponseCode.Updated)
            {
                return Ok(result);
            }

            return BadRequest("Failed to save");
        }

        [HttpGet("getAllStudentList")]
        public async Task<IActionResult> GetStudentDetailsList()
        {
            var data = await studentDetailsRepository.GetStudentDetailsList();
            if (data != null)
            {
                return Ok(data);
            }
            return NotFound("No record found");
        }

        [HttpGet("getStudentDetails/{StudentId}")]
        public async Task<IActionResult> GetStudentDetails(long? StudentId)
        {
            if (StudentId == null)
            {
                return BadRequest("Object is null");
            }
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid model object");
            }

            var result = await studentDetailsRepository.GetStudentDetails(StudentId);
            return Ok(result);
        }

    }
}
