using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace Learnum.ERP.API.Helpers
{
    public static class JwtSecurityKeyBuilder
    {
        public static SymmetricSecurityKey Create(string secret)
        {
            return new SymmetricSecurityKey(Encoding.ASCII.GetBytes(secret));
        }
    }
}
