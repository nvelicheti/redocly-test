import { setParameterValue, setSecurityDetails, getUserClaims } from '@redocly/developer-portal/ui';
  import axios from "axios";
export function onInit() {
  const claims = getUserClaims(); // you can use user claims if login is enabled or get value from other place

  // setParameterValue(in, name, value)
  setParameterValue('header', 'X-Session-ID', 25);
  setParameterValue('header', 'X-Correlation-ID', '454545');
    setParameterValue('header', 'Authorization', 'Bearer 111111');



const options = {
  method: 'POST',
  url: 'https://dev-unityapi.experiancs.com/ecs/oauth/partnertoken',
  headers: {
  
    'Content-Type': 'application/json',
    client_id: '95b4b010fde64b1aace9d46f3c1880d5',
    client_secret: '9a169F9B0F4f4350Ad1a430ce4F9d215'
  },
  data: {
    client_id: 'nA6bFmGWaKF4WaBjjjuo23xPxOkpNiiI',
    client_secret: '2b3szWYPDCTE3nR93rQYLwvRlh88KJaF2NitYi1wiwoLaEoY53vBq-sBIRsP3uUx',
    audience: 'https://unityms/api',
    grant_type: 'client_credentials',
    'partner-id': '123424',
    'app-id': '123'
  }
};

axios.request(options).then(function (response) {
//   console.log(response.data);
   setSecurityDetails('BearerAuth',   response.data.access_token );
}).catch(function (error) {
  setSecurityDetails('BearerAuth',   'error' );
  console.error(error);
});


 
  setSecurityDetails('BearerAuth',   '111111'  );
  
}
