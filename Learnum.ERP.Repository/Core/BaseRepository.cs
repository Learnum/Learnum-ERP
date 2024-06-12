using Dapper.Contrib.Extensions;
using Dapper;
using Learnum.ERP.Repository.Infrastructure;
using Learnum.ERP.Shared.Core;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Learnum.ERP.Repository.Core
{
    public class BaseRepository : DBFactory
    {
        protected IDbConnection _dbConnection;
        public BaseRepository()
        {
            SqlMapperExtensions.TableNameMapper = (type) => {
                //use exact name
                return type.Name;
            };

            SqlMapper.Settings.CommandTimeout = 3600;
        }

        ~BaseRepository()
        {
            CloseConnection();
        }
        public void ClearCatche()
        {
            try
            {
                SqlMapper.PurgeQueryCache();
            }
            catch (Exception ex)
            {

            }
        }

        /*internal IDbConnection GetConnection()
        {
            string connectionString = ApplicationSettings.TDSConnectionString;
            _dbConnection = new SqlConnection(connectionString);
            return _dbConnection;
        }*/
    }
}
