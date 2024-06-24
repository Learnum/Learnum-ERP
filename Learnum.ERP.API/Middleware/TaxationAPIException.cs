using System.Globalization;

namespace Learnum.ERP.API.Middleware
{
    public class CustomAPiException : Exception
    {
        public CustomAPiException() : base()
        {
        }
        public CustomAPiException(string message) : base(message)
        {
        }
        public CustomAPiException(string message, params object[] args) : base(String.Format(CultureInfo.CurrentCulture, message, args))
        {
        }
    }
}
