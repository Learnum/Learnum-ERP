﻿using Learnum.ERP.Shared.Core;
using Learnum.ERP.Shared.Entities.Models.ViewModel.Student_Management;
using Learnum.ERP.Shared.Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Learnum.ERP.Shared.Entities.Models.ViewModel.My_Practical_Exam;
using Dapper;
using System.Data;
using Learnum.ERP.Repository.Core;

namespace Learnum.ERP.Repository.Master.My_Practical_Exam
{
    public interface IMyPracticalExamRepository
    { 
        Task<ResponseCode>StudentAnswerDetails(MyPracticalExamModel myPracticalExamModel);
        Task<List<MyPracticalExamResposeModel>> GetStudentAnswerList();
        Task<Tuple<MyPracticalExamModel?, ResponseCode>> GetPracticalExamDetails(long? StudentId);
    }
    public class MyPracticalExamRepository : BaseRepository, IMyPracticalExamRepository
    {
        public async Task<ResponseCode> StudentAnswerDetails(MyPracticalExamModel myPracticalExamModel)
        {
            using (IDbConnection dbConnection = base.GetCoreConnection())
            {
                var dbparams = new DynamicParameters(myPracticalExamModel);
                dbparams.Add("@Action", "PROC_InsertProblemAnswerDetails");
                dbparams.Add("@Result", DbType.Int64, direction: ParameterDirection.InputOutput);
                dbConnection.Query<int>("PROC_MyPracticalExam", dbparams, commandType: CommandType.StoredProcedure);
                ResponseCode result = (ResponseCode)dbparams.Get<int>("@Result");
                return await Task.FromResult(result);
            }
        }

        public async Task<List<MyPracticalExamResposeModel>> GetStudentAnswerList()
        {
            using (IDbConnection dbConnection = base.GetCoreConnection())
            {
                var dbparams = new DynamicParameters();
                dbparams.Add("@Action", "GetProblemAnswerDetails");
                dbparams.Add("@Result", DbType.Int64, direction: ParameterDirection.InputOutput);
                var result = dbConnection.Query<MyPracticalExamResposeModel>("PROC_MyPracticalExam", dbparams, commandType: CommandType.StoredProcedure).ToList();
                return await Task.FromResult(result);
            }
        }

        public async Task<Tuple<MyPracticalExamModel?, ResponseCode>> GetPracticalExamDetails(long? StudentId)
        {
            using (IDbConnection dbConnection = base.GetCoreConnection())
            {
                var dbparams = new DynamicParameters();
                dbparams.Add("@StudentId", StudentId);
                dbparams.Add("@Action", "PROC_GetProblemAnswerByStudentId");
                dbparams.Add("@Result", DbType.Int64, direction: ParameterDirection.InputOutput);
                var result = dbConnection.Query<MyPracticalExamModel?>("PROC_MyPracticalExam", dbparams, commandType: CommandType.StoredProcedure).FirstOrDefault();
                ResponseCode responseCode = (ResponseCode)dbparams.Get<int>("@Result");
                return await Task.FromResult(new Tuple<MyPracticalExamModel?, ResponseCode>(result, responseCode));
            }
        }
    }
}
