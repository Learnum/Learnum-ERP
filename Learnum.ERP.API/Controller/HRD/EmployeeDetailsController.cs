
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


namespace Learnum.ERP.API.Controller.HRD
{

    [Route("api/[controller]")]
    [ApiController]

    public class EmployeeDetailsController : ControllerBase
    {
        private readonly IEmployeeDetailsRepository employeeDetailsRepository;
        private readonly ILogger<EmployeeDetailsController> logger;

        public EmployeeDetailsController(
            ILogger<EmployeeDetailsController> _logger,
            IEmployeeDetailsRepository _employeeDetailsRepository)
        {
            logger = _logger;
            employeeDetailsRepository = _employeeDetailsRepository;
        }

        [HttpPost("InsertEmployeeDetails")]

        public async Task<IActionResult> InsertEmployeeDetails([FromForm] employeeFormData employeeFormData)
        {

            EmployeeDetailsModel? employeeDetailsModel = JsonConvert.DeserializeObject<EmployeeDetailsModel>(employeeFormData.EmployeeDetailsModel); ;

            var files = Request.Form.Files;

            if (employeeFormData == null)
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

            EmployeePhotoupload fileUpload = new EmployeePhotoupload();
            fileUpload.FileName = file.FileName;
            fileUpload.MimeType = file.ContentType;
            fileUpload.FilePath = fullPath;
            fileUpload.EmployeeId = employeeDetailsModel.EmployeeId;
            fileUpload.EmployeeName = employeeDetailsModel.EmployeeName;
            fileUpload.Email = employeeDetailsModel.Email;
            fileUpload.EmployeePhone = employeeDetailsModel.EmployeePhone;
            fileUpload.AadharNumber = employeeDetailsModel.AadharNumber;
            fileUpload.DateofBirth = employeeDetailsModel.DateofBirth;
            fileUpload.Qualification = employeeDetailsModel.Qualification;
            fileUpload.BloodGroup = employeeDetailsModel.BloodGroup;
            fileUpload.Gender = employeeDetailsModel.Gender;
            fileUpload.Address = employeeDetailsModel.Address;
            fileUpload.City = employeeDetailsModel.City;
            fileUpload.StateId = employeeDetailsModel.StateId;
            fileUpload.PostalCode = employeeDetailsModel.PostalCode;
            fileUpload.Role = employeeDetailsModel.Role;
            fileUpload.IsActive = employeeDetailsModel.IsActive;
            fileUpload.AddedBy = base.User.Identity.GetUserId();
            fileUpload.UpdatedBy = base.User.Identity.GetUserId();
            fileUpload.AddedDate = DateTime.Now;
            fileUpload.UpdatedDate = DateTime.Now;

            var result = await employeeDetailsRepository.InsertEmployeeDetails(fileUpload);

            if (result == ResponseCode.Success || result == ResponseCode.Updated)
            {
                return Ok(result);
            }

            return BadRequest("Failed to save");
        }



        [HttpGet("getEmployeeDetailsList")]
        public async Task<IActionResult> GetEmployeeDetailsList()
        {
            var data = await employeeDetailsRepository.GetEmployeeDetailsList();
            if (data != null)
            {
                return Ok(data);
            }
            return NotFound("No record found");
        }

        [HttpGet("getemployeeDetailsById/{EmployeeId}")]
        public async Task<IActionResult> GetemployeeDetailsById(long? EmployeeId)
        {
            if (EmployeeId == null)
            {
                return BadRequest("Object is null");
            }
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid model object");
            }

            var result = await employeeDetailsRepository.GetemployeeDetailsById(EmployeeId);
            return Ok(result);
        }

    }
}

