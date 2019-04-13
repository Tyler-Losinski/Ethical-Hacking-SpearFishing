using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Twilio;
using Twilio.Rest.Api.V2010.Account;
using System.Configuration;

namespace Search_Api.Controllers.Communication
{
    public class TestAPICallsController : ApiController
    {
        [HttpGet]
        public string GetContacts()
        {
            const string WEBSERVICE_URL = "https://api.dialogflow.com/v1/intents/008e508b-8e5e-4f8f-8f3f-01c517b5321b";
            try
            {
                var webRequest = System.Net.WebRequest.Create(WEBSERVICE_URL);
                if (webRequest != null)
                {
                    webRequest.Method = "GET";
                    webRequest.Timeout = 12000;
                    webRequest.ContentType = "application/json";
                    webRequest.Headers.Add("Authorization", ConfigurationManager.AppSettings["DialgoflowAPI"]);

                    using (System.IO.Stream s = webRequest.GetResponse().GetResponseStream())
                    {
                        using (System.IO.StreamReader sr = new System.IO.StreamReader(s))
                        {
                            var jsonResponse = sr.ReadToEnd();
                            return String.Format("Response: {0}", jsonResponse);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                return "error" + ex.ToString();
            }
            return "null";
        }


        [HttpGet]
        public void StartConversation()
        {
            // Find your Account Sid and Token at twilio.com/console
            // DANGER! This is insecure. See http://twil.io/secure
            string accountSid = ConfigurationManager.AppSettings["TwilioAccountSID"];
            string authToken = ConfigurationManager.AppSettings["TwilioAuthToken"];

            TwilioClient.Init(accountSid, authToken);

            var message = MessageResource.Create(
                body: "Hey this is John, got a new number",
                from: new Twilio.Types.PhoneNumber("+17015751182"),
                to: new Twilio.Types.PhoneNumber("+17012606250")
            );

            Console.WriteLine(message.Sid);
        }


    }
}
