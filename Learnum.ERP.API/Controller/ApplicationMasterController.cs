using Learnum.ERP.API.Controller.Student_Management;
using Learnum.ERP.Repository.Master;
using Learnum.ERP.Repository.Master.Student_Management;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Learnum.ERP.API.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class ApplicationMasterController : ControllerBase
    {
        private readonly IMasterRepository masterRepository;
        private readonly ILogger<ApplicationMasterController> logger;

        public ApplicationMasterController(
            ILogger<ApplicationMasterController> _logger,
            IMasterRepository _masterRepository)
        {
            logger = _logger;
            masterRepository = _masterRepository;
        }

        [HttpGet("GetAllJobrole")]
        public async Task<IActionResult> GetAllJobrole()
        {
            var data = masterRepository.GetAllJobrole();
            return Ok(data.Result);
        }

        [HttpGet("GetAllColleges")]
        public async Task<IActionResult> GetAllColleges()
        {
            var data = masterRepository.GetAllColleges();
            return Ok(data.Result);
        }

        [HttpGet("GetAllStates")]
        public async Task<IActionResult> GetAllStates()
        {
            var data = masterRepository.GetAllStates();
            return Ok(data.Result);
        }

        [HttpGet("LoadStateWiseCities/{StateId}")]

        public async Task<IActionResult> LoadStateWiseCities(long StateId)
        {
            var data = masterRepository.LoadStateWiseCities(StateId);
            return Ok(data.Result);
        }
    }
}
