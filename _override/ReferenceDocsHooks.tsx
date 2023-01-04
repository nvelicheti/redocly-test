import { setParameterValue, setSecurityDetails, getUserClaims } from '@redocly/developer-portal/ui';

export function onInit() {
  const claims = getUserClaims(); // you can use user claims if login is enabled or get value from other place

  // setParameterValue(in, name, value)
  setParameterValue('header', 'X-Session-ID', 25);
  setParameterValue('header', 'X-Correlation-ID', 'email@email.com');



 
  setSecurityDetails('BearerAuth',   '111111'  );
  
}
