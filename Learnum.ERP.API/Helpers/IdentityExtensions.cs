using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Security.Principal;
using System.Web;

namespace Learnum.ERP.API.Helpers
{
    public static class CustomClaimTypes
    {
        public const string OrganizationId = "OrganizationId";
    }

    public static class IdentityExtensions
    {
        public static long GetOrganizationId(this IIdentity identity)
        {
            ClaimsIdentity claimsIdentity = identity as ClaimsIdentity;
            Claim claim = claimsIdentity?.FindFirst(CustomClaimTypes.OrganizationId);

            if (claim == null)
                return 0;

            return long.Parse(claim.Value);
        }

        public static string GetName(this IIdentity identity)
        {
            ClaimsIdentity claimsIdentity = identity as ClaimsIdentity;
            Claim claim = claimsIdentity?.FindFirst(ClaimTypes.Name);

            return claim?.Value ?? string.Empty;
        }

        public static long GetRoleId(this IIdentity identity)
        {
            ClaimsIdentity claimsIdentity = identity as ClaimsIdentity;
            Claim claim = claimsIdentity?.FindFirst(ClaimTypes.Role);


            if (claim == null)
                return 0;

            return long.Parse(claim.Value);
        }

        public static long GetUserId(this IIdentity identity)
        {
            ClaimsIdentity claimsIdentity = identity as ClaimsIdentity;
            Claim claim = claimsIdentity?.FindFirst(ClaimTypes.Sid);

            if (claim == null)
                return 0;

            return long.Parse(claim.Value);
        }
    }
}
