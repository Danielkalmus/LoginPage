import axios from "axios";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { baseUrl } from "../../../const";

interface BooleanArray {
  passwordValid: boolean;
  confirmPasswordValid: boolean;
}

const booleanArray: BooleanArray = {
  passwordValid: false,
  confirmPasswordValid: false,
};




function EditOrDeleteAccount() {
  const navigate = useNavigate()
  const location = useLocation()

  const { email } = location.state;

  const [password, setPassword] = useState("");
  const [PasswordErrorMessage, setPasswordErrorMessage] = useState('');

  const [confirmPassword, setConfirmPassword] = useState("");
  const [ConfirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = useState('');

  const [message, setMessage] = useState("");

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    if (newPassword.length < 6 && newPassword !== '') {
      booleanArray.passwordValid = false
      setPasswordErrorMessage('Password must be at least 6 characters long');
    } else {
      booleanArray.passwordValid = newPassword !== ''
      setPasswordErrorMessage('');
    }
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);

    if (newConfirmPassword != password && newConfirmPassword !== '') {
      booleanArray.confirmPasswordValid = false
      setConfirmPasswordErrorMessage('Not mach to password');
    } else {
      booleanArray.confirmPasswordValid = newConfirmPassword !== ''
      setConfirmPasswordErrorMessage('');
    }
  };

  const handleCancelDeleteAccount = () => {
    window.location.reload();
  }

  const handleDeleteAccount = async () => {
    const response = await axios.delete(`${baseUrl}/deleteUser`, {
      params: { email }
    });
    setMessage(response.data);
    alert("User deleted")
    navigate("/")
  }

  const handleChangePassword = async () => {
    console.log(password)
    const response = await axios.put(`${baseUrl}/updateUser`, {
      email, password
    });
    setMessage(response.data);
    if (response.data === "Change password successful.") {
      alert("Password updated")
      navigate("/")
    }
  }


  const [clickChangePassword, setOnClickChangePassword] = useState(false);
  const [clickDeleteAccount, setOnClickDeleteAccount] = useState(false);

  const handleClickChangePassword = () => {
    setOnClickChangePassword(true)
  }

  const handleClickDeleteAccount = () => {
    setOnClickDeleteAccount(true)
  }
  return (
    <div>

      <div>
        <button type="submit" onClick={handleClickChangePassword}>Change password</button>
      </div>
      {clickChangePassword &&
        <div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              placeholder="password"
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
            />
            {PasswordErrorMessage && <p style={{ color: 'red' }}>{PasswordErrorMessage}</p>}
          </div>
          <div>
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              placeholder="password"
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
            {ConfirmPasswordErrorMessage && <p style={{ color: 'red' }}>{ConfirmPasswordErrorMessage}</p>}
          </div>
          <button type="submit" onClick={handleChangePassword}>Change password</button>
        </div>
      }

      {!clickChangePassword &&
        <div>
          <div>
            <button onClick={handleClickDeleteAccount}>Delete Account</button>
          </div>
          {clickDeleteAccount &&
            <div>
              <div>
                <button type="submit" onClick={handleDeleteAccount}>Yes, delete my account</button>
                {message && <p>{message}</p>}
              </div>
              <div>
                <button type="submit" onClick={handleCancelDeleteAccount}>Cancel</button>
                {message && <p>{message}</p>}
              </div>
            </div>
          }
        </div>
      }
    </div>
  );
};

export default EditOrDeleteAccount;