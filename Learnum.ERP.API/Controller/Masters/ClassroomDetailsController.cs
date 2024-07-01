using Learnum.ERP.API.Controller.Branch;
using Learnum.ERP.Repository.Master;
using Learnum.ERP.Shared.Core;
using Learnum.ERP.Shared.Entities.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Learnum.ERP.API.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClassroomDetailsController : ControllerBase
    {
        private readonly IClassroomDetailsRepository  classroomDetailsRepository;
        private readonly ILogger<ClassroomDetailsController> logger;

        public ClassroomDetailsController(
            ILogger<ClassroomDetailsController> _logger,
            IClassroomDetailsRepository _classroomDetailsRepository)
        {
            logger = _logger;
            classroomDetailsRepository = _classroomDetailsRepository;
        }

        [HttpPost("InsertClassroomDetails")]
        public async Task<IActionResult> InsertClassroomDetails(ClassroomDetailsModel classroomDetailsModel)
        {
            if (classroomDetailsModel == null)
            {
                return BadRequest("Object is null");
            }
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid model object");
            }

            var result = await classroomDetailsRepository.InsertClassroomDetails(classroomDetailsModel);
            if (result == ResponseCode.Success || result == ResponseCode.Updated)
            {
                return Ok(result);
            }
            return BadRequest("Failed to Save");
        }

        [HttpGet("getAllClassroomList")]
        public async Task<IActionResult> GetClassroomDetailsList()
        {
            var data = await classroomDetailsRepository.GetClassroomDetailsList();
            if (data != null)
            {
                return Ok(data);
            }
            return NotFound("No record found");
        }
    }
}
