﻿using Learnum.ERP.API.Controller.HRD;
using Learnum.ERP.Repository.Master.HRD_repo;
using Learnum.ERP.Repository.Master.MySyllabus_repo;
using Learnum.ERP.Shared.Core;
using Learnum.ERP.Shared.Entities.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Learnum.ERP.API.Controller.MySyllabus
{
    [Route("api/[controller]")]
    [ApiController]
    public class McqDetailsController : ControllerBase
    {
        private readonly IMcqDetailsRepository mcqDetailsRepository;
        private readonly ILogger<McqDetailsController> logger;

        public McqDetailsController(
             ILogger<McqDetailsController> _logger,
             IMcqDetailsRepository _mcqDetailsRepository)
        {
            logger = _logger;
            mcqDetailsRepository = _mcqDetailsRepository;
        }

        [HttpPost("InsertMcqSheetDetails")]
        public async Task<IActionResult> InsertMcqDetails(McqDetailsModel mcqDetailsModel)
        {
            if (mcqDetailsModel == null)
            {
                return BadRequest("Object is null");
            }
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid model object");
            }

            var result = await mcqDetailsRepository.InsertMcqDetails(mcqDetailsModel);
            if (result == ResponseCode.Success || result == ResponseCode.Updated)
            {
                return Ok(result);
            }
            return BadRequest("Failed to Save");
        }

        [HttpGet("getAllMcqSheetList")]
        public async Task<IActionResult> GetAllMcqDetailsList()
        {
            var data = await mcqDetailsRepository.GetMcqDetailsList();
            if (data != null)
            {
                return Ok(data);
            }
            return NotFound("No record found");
        }
    }
}
