import { useState } from 'react';

function signIn(){
  const [Email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
      // Add authentication logic here
      console.log('Username:', Email);
      console.log('Password:', password);
  };

  return (
      <div>
          <h1>login</h1>
          <form onSubmit={handleSubmit}>
              <div className='form-login-user'>
                  <label>Username: </label>
                  <input
                      type="text"
                      placeholder='example@example.com'
                      value={Email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                  />
              </div>
              <div>
                  <label>Password: </label>
                  <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                  />
              </div>
              <p></p>
              <button type="submit">Create Account</button>
          </form>
      </div>
  );
};

export default signIn;