using Dapper;
using Dapper.Contrib.Extensions;
using Learnum.ERP.Repository.Infrastructure;
using System;
using System.Collections.Generic;
using System.Data;
using System.Text;

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
    }
}
