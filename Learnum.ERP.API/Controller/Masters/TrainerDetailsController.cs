using Learnum.ERP.API.Controller.Branch;
using Learnum.ERP.Repository.Master;
using Learnum.ERP.Repository.Master.Masters;
using Learnum.ERP.Shared.Core;
using Learnum.ERP.Shared.Entities.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Learnum.ERP.API.Controller.Masters
{
    [Route("api/[controller]")]
    [ApiController]
    public class TrainerDetailsController : ControllerBase
    {
        private readonly ITrainerDetailsRepository trainerDetailsRepository;
        private readonly ILogger<TrainerDetailsController> logger;

        public TrainerDetailsController(
            ILogger<TrainerDetailsController> _logger,
            ITrainerDetailsRepository _trainerDetailsRepository)
        {
            logger = _logger;
            trainerDetailsRepository = _trainerDetailsRepository;
        }

        [HttpPost("InsertTrainerDetails")]
        public async Task<IActionResult> InsertTrainerDetails(TrainerDetailsModel trainerDetailsModel)
        {
            if (trainerDetailsModel == null)
            {
                return BadRequest("Object is null");
            }
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid model object");
            }

            var result = await trainerDetailsRepository.InsertTrainerDetails(trainerDetailsModel);
            if (result == ResponseCode.Success || result == ResponseCode.Updated)
            {
                return Ok(result);
            }
            return BadRequest("Failed to Save");
        }

        [HttpGet("getAllTrainerList")]
        public async Task<IActionResult> GetTrainerDetailsList()
        {
            var data = await trainerDetailsRepository.GetTrainerDetailsList();
            if (data != null)
            {
                return Ok(data);
            }
            return NotFound("No record found");
        }
    }

}
