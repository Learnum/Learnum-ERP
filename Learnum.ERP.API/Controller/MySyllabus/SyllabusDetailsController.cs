using Learnum.ERP.API.Controller.CounsellorDashboard;
using Learnum.ERP.API.Controller.HRD;
using Learnum.ERP.API.Helpers;
using Learnum.ERP.Repository.Master;
using Learnum.ERP.Repository.Master.CounsellorDashboard;
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
        private readonly ILogger<SyllabusDetailsController> _logger;

        public SyllabusDetailsController(
            ILogger<SyllabusDetailsController> logger,
            ISyllabusDetailsRepository _syllabusDetailsRepository)
        {
            _logger = logger;
            syllabusDetailsRepository = _syllabusDetailsRepository;
        }

        [HttpPost("InsertSyllabusDetails")]
        public async Task<IActionResult> InsertTopicDetails(SyllabusListModel syllabusListModel)
        {
            if (syllabusListModel == null)
            {
                return BadRequest("Object is null");
            }
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid model object");
            }

            var result = await syllabusDetailsRepository.InsertTopicDetails(syllabusListModel);
            if (result == ResponseCode.Success || result == ResponseCode.Updated)
            {
                return Ok(result);
            }
            return BadRequest("Failed to Save");
        }
    }
}
