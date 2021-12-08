using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Controllers.Models
{
    public class Store
    {
        public ObjectId Id { get; set; }
        public int StoreId { get; set; }
        public string StoreName { get; set; }
    }
}
