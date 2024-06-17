using System;
using System.Collections.Specialized;
using Serilog;


namespace Learnum.ERP.API.Helpers
{
    public class FormDataToTypeConverter
    {
        // ILogger logger = null;
        public FormDataToTypeConverter()
        {
            //logger = _logger;
        }

        public T GenerateObject<T>(NameValueCollection param)
        {
            Type type = typeof(T);
            dynamic o = Activator.CreateInstance(type);
            foreach (var property in type.GetProperties())
            {
                string val = null;
                try
                {
                    val = GetNameHeaderValue(param, property.Name);
                    if (val == null || val == "undefined") continue;
                    Type propertyType = property.GetType();

                    if (!property.PropertyType.Name.Contains("Nullable"))
                    {
                        property.SetValue(o, Convert.ChangeType(val, property.PropertyType), null);
                    }
                    else
                    {
                        property.SetValue(o, Convert.ChangeType(val, Nullable.GetUnderlyingType(property.PropertyType)), null);
                    }
                }
                catch (Exception ex)
                {
                    throw;
                    // logger.Error(property.Name + '-' + val);
                    // throw;
                }
            }
            return o;
        }

        private static string GetNameHeaderValue(NameValueCollection param, string name)
        {
            return param[name];
        }


    }
}
