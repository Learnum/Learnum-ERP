using Learnum.ERP.Shared.Core;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Learnum.ERP.Repository.Infrastructure
{
    public class DBFactory
    {
        private IDbConnection _dbConnection;

        //common 
        public IDbConnection GetConnection(string connectionString)
        {
            _dbConnection = new SqlConnection(connectionString);
            return _dbConnection;
        }

        //application wise
        public IDbConnection GetCoreConnection()
        {
            _dbConnection = new SqlConnection(ApplicationSettings.CoreConnectionString);
            return _dbConnection;
        }
        public IDbConnection GetTDSConnection()
        {
            _dbConnection = new SqlConnection(ApplicationSettings.TDSConnectionString);
            return _dbConnection;
        }

        public IDbConnection GetCMSConnection()
        {
            _dbConnection = new SqlConnection(ApplicationSettings.CMSConnectionString);
            return _dbConnection;
        }
        public IDbConnection GetCommunicationConnection()
        {
            _dbConnection = new SqlConnection(ApplicationSettings.CommunicationConnectionString);
            return _dbConnection;
        }
        public IDbConnection GetTransactionConnection()
        {
            _dbConnection = new SqlConnection(ApplicationSettings.TransactionConnectionString);
            return _dbConnection;
        }

        public IDbCommand GetCommand()
        {
            return new SqlCommand();
        }

        ~DBFactory()
        {
            CloseConnection();
        }

        public void CloseConnection()
        {
            if (_dbConnection != null && _dbConnection.State == ConnectionState.Open)
            {
                try
                {
                    _dbConnection.Close();
                    _dbConnection.Dispose();
                }
                catch { }
            }
        }
    }
}
