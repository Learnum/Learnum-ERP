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
    public class LocationDetailsController : ControllerBase
    {
        private readonly ILocationDetailsRepository locationDetailsRepository;
        private readonly ILogger<LocationDetailsController> logger;

        public LocationDetailsController(
           ILogger<LocationDetailsController> _logger,
           ILocationDetailsRepository _locationDetailsRepository)
        {
            logger = _logger;
            locationDetailsRepository = _locationDetailsRepository;
        }


        [HttpPost("InsertLocationDetails")]
        public async Task<IActionResult>InsertLocationDetails(LocationDetailsModel locationDetailsModel)
        {
            if (locationDetailsModel == null)
            {
                return BadRequest("Object is null");
            }
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid model object");
            }

            var result = await locationDetailsRepository.InsertLocationDetails(locationDetailsModel);
            if (result == ResponseCode.Success || result == ResponseCode.Updated)
            {
                return Ok(result);
            }
            return BadRequest("Failed to Save");
        }

        [HttpGet("getAllLocationList")]
        public async Task<IActionResult> GetLocationDetailsList()
        {
            var data = await locationDetailsRepository.GetLocationDetailsList();
            if (data != null)
            {
                return Ok(data);
            }
            return NotFound("No record found");
        }
    }
}
