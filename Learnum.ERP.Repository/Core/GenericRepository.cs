using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using Dapper.Contrib.Extensions;


namespace Learnum.ERP.Repository.Core
{
    public class GenericRepository<TEntity> : BaseRepository, IGenericRepository<TEntity> where TEntity : class
    {

        private string ConnectionString { get; set; }
        public GenericRepository(string connectionString)
        {
            ConnectionString = connectionString;
        }
        public async Task<long> Add(TEntity entity)
        {
            try
            {
                using (IDbConnection dbConnection = base.GetConnection(ConnectionString))
                {
                    return await dbConnection.InsertAsync(entity);
                }
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public async Task<bool> Delete(TEntity entity)
        {
            using (IDbConnection dbConnection = base.GetConnection(ConnectionString))
            {
                return await dbConnection.DeleteAsync(entity);
            }
        }

        public async Task<bool> Update(TEntity entity)
        {
            using (IDbConnection dbConnection = base.GetConnection(ConnectionString))
            {
                return await dbConnection.UpdateAsync(entity);
            }

        }

        public async Task<TEntity> Find(long id)
        {
            using (IDbConnection dbConnection = base.GetConnection(ConnectionString))
            {
                return await dbConnection.GetAsync<TEntity>(id);
            }
        }

        public async Task<IEnumerable<TEntity>> GetAll()
        {
            using (IDbConnection dbConnection = base.GetConnection(ConnectionString))
            {
                return await dbConnection.QueryAsync<TEntity>("Select * From " + typeof(TEntity).Name);
            }
        }

        public async Task<IEnumerable<TEntity>> GetAllByActiveStatus(bool isActive)
        {
            using (IDbConnection dbConnection = base.GetConnection(ConnectionString))
            {
                return await dbConnection.QueryAsync<TEntity>("Select * From " + typeof(TEntity).Name + "where isActive=" + isActive + "");
            }
        }
    }
}
