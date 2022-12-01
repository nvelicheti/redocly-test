import React, { useState } from 'react';
import showPwdImg from '../images/show-password.svg';
import hidePwdImg from '../images/hide-password.svg';

function App() {

  const [pwd, setPwd] = useState('');
  const [isRevealPwd, setIsRevealPwd] = useState(false);

  return (
    <div className="App">
      <h3>Your APP's Client Creds </h3>
      <label for="clientid"><p>Client ID:</p></label>
        <input id="clientid"
          name="Client-id"
         
          value="clientid"
          
          readonly
        />
      <label for="clientsecret">Client-Secret:</label>
      <div className="pwd-container">
       
       
         <input id="clientsecret"
          name="Client-secret"
          
          type={isRevealPwd ? "text" : "password"}
          value="clientsecret"
          onChange={e => setPwd(e.target.value)}
          readonly
        />
        <img
          title={isRevealPwd ? "Hide password" : "Show password"}
          src={isRevealPwd ? hidePwdImg : showPwdImg}
          onClick={() => setIsRevealPwd(prevState => !prevState)}
        />
      </div>

    </div>
  );
}

export default App;
