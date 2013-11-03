using AreYouHungry.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace AreYouHungry.Services.Controllers
{
    public class BaseApiController : ApiController
    {
        public BaseApiController(IUowData db)
        {
            this.db = db;
        }

        protected IUowData db { get; set; }

        protected T PerformOperationAndHandleExceptions<T>(Func<T> operation)
        {
            try
            {
                return operation();
            }
            catch (Exception ex)
            {
                var errResponse = this.Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex.Message);
                throw new HttpResponseException(errResponse);
            }
        }
    }
}
