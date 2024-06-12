using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Learnum.ERP.Repository.Core
{
    public interface IGenericRepository<TEntity> where TEntity : class
    {
        Task<long> Add(TEntity entity);
        Task<bool> Delete(TEntity entity);
        Task<bool> Update(TEntity entity);
        Task<TEntity> Find(long id);
        Task<IEnumerable<TEntity>> GetAll();
        Task<IEnumerable<TEntity>> GetAllByActiveStatus(bool isActive);
    }
}
