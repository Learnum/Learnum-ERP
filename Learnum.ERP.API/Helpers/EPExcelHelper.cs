using System.Data;
using OfficeOpenXml;

namespace Learnum.ERP.API.Helpers
{
    public class EPExcelHelper
    {
        public string ErrorMessage { get; set; }

        public DataTable GetDataTableFromExcel(Stream stream)
        {
            ExcelPackage.LicenseContext = OfficeOpenXml.LicenseContext.NonCommercial;
            using (var pck = new OfficeOpenXml.ExcelPackage())
            {
                pck.Load(stream);
                DataTable tbl = new DataTable();
                var ws = pck.Workbook.Worksheets.FirstOrDefault();
                if (ws != null && ws.Dimension != null && ws.Dimension.End.Row > 1)
                {

                    int lastColumnIndx = ws.Dimension.End.Column;
                    foreach (var firstRowCell in ws.Cells[1, 1, 1, ws.Dimension.End.Column])
                    {
                        string columnName = firstRowCell.Text;
                        if (!string.IsNullOrEmpty(columnName)) // if empty header found then do not add column into table
                        {
                            if (tbl.Columns[columnName] == null)
                            {
                                tbl.Columns.Add(firstRowCell.Text);
                            }
                            else
                            {
                                ErrorMessage = "Duplicate column name " + columnName + ". Please correct it & try to upload again";
                                break;
                            }
                        }
                        else
                        {
                            lastColumnIndx = firstRowCell.Columns - 1;
                            break;
                        }
                    }

                    var startRow = 2;
                    for (int rowNum = startRow; rowNum <= ws.Dimension.End.Row; rowNum++)
                    {
                        var wsRow = ws.Cells[rowNum, 1, rowNum, ws.Dimension.End.Column];
                        DataRow row = tbl.Rows.Add();
                        foreach (var cell in wsRow)
                        {
                            if (cell.Columns <= lastColumnIndx) // set data only for valid columns
                            {
                                row[cell.Start.Column - 1] = cell.Text;
                            }
                            else
                            {
                                break;
                            }
                        }
                    }

                }
                else
                {
                    ErrorMessage = "Invalid excel file. Unable to process";
                }
                return tbl;
            }
        }
    }
}
