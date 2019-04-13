using asp_server.Utiliities;
using NLog;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Search_Api.Controllers.Communication
{
    public class EditContactsController : ApiController
    {
        private static Logger Logger = LogManager.GetCurrentClassLogger();

        [HttpGet]
        public List<Person> GetContacts()
        {
            List<Person> people = new List<Person>();
            try
            {
                string query = @"SELECT * FROM PEOPLE";
                DatabaseLibrary.ExecSqlReader(query, dr =>
                {
                    while (dr.Read())
                    {
                        people.Add(new Person()
                        {
                            Id = dr.GetInt32(0),
                            FirstName = dr.GetString(1).Trim(),
                            LastName = dr.GetString(2).Trim(),
                            Address1 = dr.GetString(3).Trim(),
                            Address2 = dr.GetString(4).Trim(),
                            City = dr.GetString(5).Trim(),
                            State = dr.GetString(6).Trim(),
                            PostalCode = dr.GetString(7).Trim(),
                            Phone = dr.GetString(8).Trim(),
                            Email = dr.GetString(9).Trim()
                        });
                    }
                });

            }
            catch (Exception ex)
            {
                Logger.Error(ex);
                return null;
            }
            return people;
        }

        [HttpPost]
        public int UpdateContact(Person person)
        {
            try
            {
                string query = @"
                UPDATE [dbo].[People]
                    SET [FirstName] = @FirstName
                           ,[LastName] = @LastName
                           ,[Address1] = @Address1
                           ,[Address2] = @Address2
                           ,[City] = @City
                           ,[State] = @State
                           ,[Zip] = @Zip
                           ,[Phone] = @Phone
                           ,[Email] = @Email
                   WHERE ID = @Id";

                DatabaseLibrary.ExecSql(query, cmd =>
                {
                    cmd.Parameters.AddWithValue("Id", person.Id);
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


    }
}
