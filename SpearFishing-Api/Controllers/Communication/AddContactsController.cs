using asp_server.Utiliities;
using NLog;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace Search_Api.Controllers
{
    public class AddContactsController : ApiController
    {
        private static Logger Logger = LogManager.GetCurrentClassLogger();

        [HttpPost]
        public int SaveContact(Person person)
        {
            try
            {
                string query = @"
                INSERT INTO [dbo].[People]
                           ([FirstName]
                           ,[LastName]
                           ,[Address1]
                           ,[Address2]
                           ,[City]
                           ,[State]
                           ,[Zip]
                           ,[Phone]
                           ,[Email])
                     VALUES
                           (@FirstName
                           ,@LastName
                           ,@Address1
                           ,@Address2
                           ,@City
                           ,@State
                           ,@Zip
                           ,@Phone
                           ,@Email)";

                DatabaseLibrary.ExecSql(query, cmd =>
                {
                    cmd.Parameters.AddWithValue("FirstName", person.FirstName);
                    cmd.Parameters.AddWithValue("LastName", person.LastName);
                    cmd.Parameters.AddWithValue("Address1", person.Address1);
                    cmd.Parameters.AddWithValue("Address2", person.Address2);
                    cmd.Parameters.AddWithValue("City", person.City);
                    cmd.Parameters.AddWithValue("State", person.State);
                    cmd.Parameters.AddWithValue("Zip", person.PostalCode);
                    cmd.Parameters.AddWithValue("Phone", person.Phone);
                    cmd.Parameters.AddWithValue("Email", person.Email);
                });

            }
            catch (Exception ex)
            {
                Logger.Error(ex);
                return -1;
            }
            return 1;
        }

        [HttpPost]
        public async Task<string> Upload()
        {
            var provider = new MultipartMemoryStreamProvider();
            await Request.Content.ReadAsMultipartAsync(provider);

            // extract file name and file contents
            var fileNameParam = provider.Contents[0].Headers.ContentDisposition.Parameters
                .FirstOrDefault(p => p.Name.ToLower() == "filename");
            string fileName = (fileNameParam == null) ? "" : fileNameParam.Value.Trim('"');
            byte[] file = await provider.Contents[0].ReadAsByteArrayAsync();

            // Here you can use EF with an entity with a byte[] property, or
            // an stored procedure with a varbinary parameter to insert the
            // data into the DB

            var result
                = string.Format("Received '{0}' with length: {1}", fileName, file.Length);
            return result;
        }
    }

    public class Person
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string PostalCode { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
    }

}
