import { setParameterValue, setSecurityDetails, getUserClaims } from '@redocly/developer-portal/ui';

export function onInit() {
  const claims = getUserClaims(); // you can use user claims if login is enabled or get value from other place

  // setParameterValue(in, name, value)
  setParameterValue('path', 'petId', 25);
  setParameterValue('header', 'x-user-email', 'email@email.com');
    setParameterValue('header', 'Authorization', 'Bearer '+ 'blah blah');


  setSecurityDetails('api_key', 'sk_123123'); // 'api_key' is the security scheme id from the OAS definition
  
}
