using System.Text;
using Microsoft.IdentityModel.Tokens;

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
