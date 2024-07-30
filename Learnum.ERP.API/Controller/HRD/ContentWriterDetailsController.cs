using Learnum.ERP.Repository.Master;
using Learnum.ERP.Shared.Core;
using Learnum.ERP.Shared.Entities.Models;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;
using Learnum.ERP.Repository.Master.HRD_repo;

namespace Learnum.ERP.API.Controller.HRD
{
       [Route("api/[controller]")]
        [ApiController]

        public class ContentWriterDetailsController : ControllerBase
        {
            private readonly IContentWriterDetailsRepository contentwriterDetailsRepository;
            private readonly ILogger<ContentWriterDetailsController> logger;

            public ContentWriterDetailsController(
                ILogger<ContentWriterDetailsController> _logger,
                 IContentWriterDetailsRepository _contentwriterDetailsRepository)
            {
                logger = _logger;
                contentwriterDetailsRepository = _contentwriterDetailsRepository;
            }

            [HttpPost("InsertContentWriterDetails")]
            public async Task<IActionResult> InsertContentWriterDetails(ContentWriterDetailsModel contentwriterDetailsModel)
            {
                if (contentwriterDetailsModel == null)
                {
                    return BadRequest("Object is null");
                }
                if (!ModelState.IsValid)
                {
                    return BadRequest("Invalid model object");
                }

                var result = await contentwriterDetailsRepository.InsertContentWriterDetails(contentwriterDetailsModel);
                if (result == ResponseCode.Success || result == ResponseCode.Updated)
                {
                    return Ok(result);
                }
                return BadRequest("Failed to Save");
            }

        [HttpGet("getAllContentWriterList")]
        public async Task<IActionResult> GetContentWriterDetailsList()
        {
            var data = await contentwriterDetailsRepository.GetContentWriterDetailsList();
            if (data != null)
            {
                return Ok(data);
            }
            return NotFound("No record found");
        }


        [HttpGet("getContentWriterDetails/{ContentWriterId}")]
        public async Task<IActionResult> GetContentWriterDetails(long? ContentWriterId)
        {
            if (ContentWriterId == null)
            {
                return BadRequest("Object is null");
            }
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid model object");
            }

            var result = await contentwriterDetailsRepository.GetContentWriterDetails(ContentWriterId);
            return Ok(result);
        }
    }
    }

