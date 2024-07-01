using Learnum.ERP.Repository.Master.Student_Management;
using Learnum.ERP.Shared.Core;
using Learnum.ERP.Shared.Entities.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Learnum.ERP.API.Controller.Student_Management
{
    [Route("api/[controller]")]
    [ApiController]
    public class SendFeesReminderController : ControllerBase
    {
        private readonly ISendFeesReminderRepository sendFeesReminderRepository;
        private readonly ILogger<SendFeesReminderController> logger;

        public SendFeesReminderController(
            ILogger<SendFeesReminderController> _logger,
            ISendFeesReminderRepository _sendFeesReminderRepository)
        {
            logger = _logger;
            sendFeesReminderRepository = _sendFeesReminderRepository;
        }

        [HttpPost("SendFeesReminder")]
        public async Task<IActionResult> SendFeesReminder(SendFeesReminderModel sendFeesReminderModel)
        {
            if (sendFeesReminderModel == null)
            {
                return BadRequest("Object is null");
            }
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid model object");
            }

            var result = await sendFeesReminderRepository.SendFeesReminder(sendFeesReminderModel);
            if (result == ResponseCode.Success || result == ResponseCode.Updated)
            {
                return Ok(result);
            }
            return BadRequest("Failed to Save");
        }

        [HttpGet("getSendFeesReminderList")]
        public async Task<IActionResult> GetSendFeesReminderList()
        {
            var data = await sendFeesReminderRepository.GetSendFeesReminderList();
            if (data != null)
            {
                return Ok(data);
            }
            return NotFound("No record found");
        }
    }
}
