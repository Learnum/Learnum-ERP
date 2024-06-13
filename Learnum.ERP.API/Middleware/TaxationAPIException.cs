using System.Globalization;

namespace Learnum.ERP.API.Middleware
{
    public class TaxationAPiException : Exception
    {
        public TaxationAPiException() : base()
        {
        }
        public TaxationAPiException(string message) : base(message)
        {
        }
        public TaxationAPiException(string message, params object[] args) : base(String.Format(CultureInfo.CurrentCulture, message, args))
        {
        }
    }
}
