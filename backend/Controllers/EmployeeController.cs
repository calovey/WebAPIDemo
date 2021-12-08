using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Controllers.Models;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public EmployeeController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public JsonResult Get()
        {
            MongoClient dbClient = new MongoClient(_configuration.GetConnectionString("DamlaDbCon"));
            var dbList = dbClient.GetDatabase("newDB").GetCollection<Employee>("employeeDB").AsQueryable();

            return new JsonResult(dbList);
        }

        [HttpPost]
        public JsonResult Post(Employee emp)
        {
            MongoClient dbClient = new MongoClient(_configuration.GetConnectionString("DamlaDbCon"));
            int LastEmployeeId = dbClient.GetDatabase("newDB").GetCollection<Employee>("employeeDB").AsQueryable().Count();
            emp.EmployeeId = LastEmployeeId + 1;

            dbClient.GetDatabase("newDB").GetCollection<Employee>("employeeDB").InsertOne(emp);
            return new JsonResult("Data Successfully Added");
        }

        [HttpPut]
        public JsonResult Put(Employee emp)
        {
            MongoClient dbClient = new MongoClient(_configuration.GetConnectionString("DamlaDbCon"));

            var filter = Builders<Employee>.Filter.Eq("EmployeeId", emp.EmployeeId);
            var update = Builders<Employee>.Update.Set("EmployeeName", emp.EmployeeName)
                                                   .Set("Department", emp.Department);

            dbClient.GetDatabase("newDB").GetCollection<Employee>("employeeDB").UpdateOne(filter, update);
            return new JsonResult("Data Successfully Updated");
        }

        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            MongoClient dbClient = new MongoClient(_configuration.GetConnectionString("DamlaDbCon"));

            var filter = Builders<Employee>.Filter.Eq("EmployeeId", id);

            dbClient.GetDatabase("newDB").GetCollection<Employee>("employeeDB").DeleteOne(filter);
            return new JsonResult("Data Successfully Deleted");
        }
    }
}
