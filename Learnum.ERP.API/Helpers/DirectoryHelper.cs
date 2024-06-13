namespace Learnum.ERP.API.Helpers
{
    public class DirectoryHelper
    {

        public static void VerifyAndCreateDirectory(string path)
        {
            try
            {
                if (!Directory.Exists(path))
                {
                    Directory.CreateDirectory(path);
                }
            }
            catch
            {
                throw;
            }
        }

        public static string GetFilePath(string directory, string fileName)
        {
            return Path.Combine(directory, fileName);
        }

        //public string CreateDocumentZip(EFillingRequestView eFillingRequestView)
        //{
        //    string fileName = Path.Combine(ApplicationSettings.UploadPath, DateTime.Now.Ticks.ToString() + ".zip");
        //    return fileName;
        //}
    }
}
