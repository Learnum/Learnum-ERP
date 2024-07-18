
using Learnum.ERP.API.Controller.Branch;
using Learnum.ERP.API.Helpers;
using Learnum.ERP.Repository.Master;
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
       /* private readonly IEmployeeDetailsRepository employeeDetailsRepository;
        private readonly ILogger<EmployeeDetailsController> logger;

        public EmployeeDetailsController(
            ILogger<EmployeeDetailsController> _logger,
            IEmployeeDetailsRepository _employeeDetailsRepository)
        {
            logger = _logger;
            employeeDetailsRepository = _employeeDetailsRepository;
        }

        [HttpPost("InsertEmployeeDetails")]
        public async Task<IActionResult> InsertEmployeeDetails([FromForm] EmployeeDetailsModel employeeDetailsModel)
        {

            //EmployeeDetailsModel? employeeDetailsModel = JsonConvert.DeserializeObject<EmployeeDetailsModel>(employeeFormData.employeeFormData);

            var files = Request.Form.Files;

            //if (employeeFormData == null)
            //{
            //    return BadRequest("Object is null");
            //}
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

            EmployeePhotoupload fileUpload = new EmployeePhotoupload();
            fileUpload.FileName = file.FileName;
            fileUpload.MimeType = file.ContentType;
            fileUpload.FilePath = fullPath;
            fileUpload.EmployeeName = employeeDetailsModel.EmployeeName;
            fileUpload.EmployeePhone = employeeDetailsModel.EmployeePhone;
            fileUpload.Email = employeeDetailsModel.Email;
            fileUpload.AadharNumber = employeeDetailsModel.AadharNumber;
            fileUpload.DateOfBirth = employeeDetailsModel.DateOfBirth;
            fileUpload.BloodGroup = employeeDetailsModel.BloodGroup;
            fileUpload.Gender = employeeDetailsModel.Gender;
            fileUpload.Qualification = employeeDetailsModel.Qualification;
            //fileUpload.Address = employeeDetailsModel.Address;
            //fileUpload.City = employeeDetailsModel.City;
            //fileUpload.State = employeeDetailsModel.State;
            //fileUpload.PostalCode = employeeDetailsModel.PostalCode;
            fileUpload.Role = employeeDetailsModel.Role;
            fileUpload.IsActive = employeeDetailsModel.IsActive;
            fileUpload.AddedBy = base.User.Identity.GetUserId();
            fileUpload.UpdatedBy = base.User.Identity.GetUserId();
            fileUpload.AddedDate = DateTime.Now;
            fileUpload.UpdatedDate = DateTime.Now;


            var result = await employeeDetailsRepository.InsertEmployeeDetails(employeeDetailsModel);
            if (result == ResponseCode.Success || result == ResponseCode.Updated)
            {
                return Ok(result);
            }
            return BadRequest("Failed to Save");
        }

        [HttpGet("getAllEmployeeList")]
        public async Task<IActionResult> GetEmployeeDetailsList()
        {
            var data = await employeeDetailsRepository.GetEmployeeDetailsList();
            if (data != null)
            {
                return Ok(data);
            }
            return NotFound("No record found");
        }*/
    }
}
