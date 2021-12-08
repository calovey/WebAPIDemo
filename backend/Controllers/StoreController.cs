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
    public class StoreController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public StoreController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public JsonResult Get()
        {
            MongoClient dbClient = new MongoClient(_configuration.GetConnectionString("DamlaDbCon"));
            var dbList = dbClient.GetDatabase("newDB").GetCollection<Store>("storeDB").AsQueryable();

            return new JsonResult(dbList);
        }

        [HttpPost]
        public JsonResult Post(Store store)
        {
            MongoClient dbClient = new MongoClient(_configuration.GetConnectionString("DamlaDbCon"));
            int LastStoreId = dbClient.GetDatabase("newDB").GetCollection<Store>("storeDB").AsQueryable().Count();
            store.StoreId = LastStoreId + 1;

            dbClient.GetDatabase("newDB").GetCollection<Store>("storeDB").InsertOne(store);
            return new JsonResult("Data Successfully Added");
        }

        [HttpPut]
        public JsonResult Put(Store store)
        {
            MongoClient dbClient = new MongoClient(_configuration.GetConnectionString("DamlaDbCon"));

            var filter = Builders<Store>.Filter.Eq("StoreId", store.StoreId);
            var update = Builders<Store>.Update.Set("StoreName", store.StoreName);

            dbClient.GetDatabase("newDB").GetCollection<Store>("storeDB").UpdateOne(filter,update);
            return new JsonResult("Data Successfully Updated");
        }

        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            MongoClient dbClient = new MongoClient(_configuration.GetConnectionString("DamlaDbCon"));

            var filter = Builders<Store>.Filter.Eq("StoreId", id);

            dbClient.GetDatabase("newDB").GetCollection<Store>("storeDB").DeleteOne(filter);
            return new JsonResult("Data Successfully Deleted");
        }
    }
}
