using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net.Http;
using System.Security.Claims;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;
using Microsoft.IdentityModel.Tokens;

namespace asp_server
{
    public class VerifyUser
    {
        public static async Task<bool> RunAsync(string userToken)
        {
            HttpClient client = new HttpClient();
            string encodedJwt = userToken;
            // 1. Get Google signing keys
            client.BaseAddress = new Uri("https://www.googleapis.com/robot/v1/metadata/");
            HttpResponseMessage response = await client.GetAsync(
              "x509/securetoken@system.gserviceaccount.com");
            if (!response.IsSuccessStatusCode) { return false; }
            var x509Data = await response.Content.ReadAsAsync<Dictionary<string, string>>();
            SecurityKey[] keys = x509Data.Values.Select(CreateSecurityKeyFromPublicKey).ToArray();
            // 2. Configure validation parameters
            const string FirebaseProjectId = "personal-directory";
            var parameters = new TokenValidationParameters
            {
                ValidIssuer = "https://securetoken.google.com/" + FirebaseProjectId,
                ValidAudience = FirebaseProjectId,
                IssuerSigningKeys = keys,
            };
            // 3. Use JwtSecurityTokenHandler to validate signature, issuer, audience and lifetime
            var handler = new JwtSecurityTokenHandler();
            SecurityToken token;
            ClaimsPrincipal principal = handler.ValidateToken(encodedJwt, parameters, out token);
            var jwt = (JwtSecurityToken)token;
            // 4.Validate signature algorithm and other applicable valdiations
            if (jwt.Header.Alg != SecurityAlgorithms.RsaSha256)
            {
                return false;
            }
            client.Dispose();
            response.Dispose();
            return true;
        }
        static SecurityKey CreateSecurityKeyFromPublicKey(string data)
        {
            return new X509SecurityKey(new X509Certificate2(Encoding.UTF8.GetBytes(data)));
        }
    }
}
