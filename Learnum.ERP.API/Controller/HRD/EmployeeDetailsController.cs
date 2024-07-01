
using Learnum.ERP.API.Controller.Branch;
using Learnum.ERP.Repository.Master;
using Learnum.ERP.Shared.Core;
using Learnum.ERP.Shared.Entities.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


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
        public async Task<IActionResult> InsertEmployeeDetails(EmployeeDetailsModel employeeDetailsModel)
        {
            if (employeeDetailsModel == null)
            {
                return BadRequest("Object is null");
            }
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid model object");
            }

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
        }
    }
}
