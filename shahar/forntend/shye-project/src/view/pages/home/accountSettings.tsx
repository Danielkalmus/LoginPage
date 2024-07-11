import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { baseURL } from '../../../const';
import './account settings.css'

const Settings: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = (location.state as any) || {};
    const [error, setError] = useState('');
    const [updatedPassword, setUpdatedPassword] = useState('');
    const [confirmUpdatedPassword, setConfirmUpdatedPassword] = useState('');
    const [showConfirm, setShowConfirm] = useState(false);
    const [showChangeButton, setShowChangeButton] = useState(true);
    const [showChangePassword, setShowChangePassword] = useState(false);

    const handleDeleteAccount = async () => {
        if (!user) return;

        try {
            const response = await axios.delete(`${baseURL}/api/user`, {
                params: { email: user.email }
            });

            if (response.status === 200) {
                alert('Account deleted successfully');
                navigate('/');
            } else {
                setError(response.data.message || 'An error occurred');
            }
        } catch (error: unknown) {
            const axiosError = error as AxiosError;
            if (axiosError.response && axiosError.response.data && (axiosError.response.data as any).message) {
                setError((axiosError.response.data as any).message);
            } else {
                setError('An error occurred');
            }
        }
    };

    const handlePasswordChange = async () => {
        if (!updatedPassword || !confirmUpdatedPassword) return;
        if (updatedPassword !== confirmUpdatedPassword) return;

        try {
            const response = await axios.put(`${baseURL}/api/user/${user.id}`, {
                field: "password",
                newValue: updatedPassword
            });

            if (response.status === 200) {
                alert('Password updated successfully');
                navigate('/');
            } else {
                setError(response.data.message || 'An error occurred');
            }
        } catch (error: unknown) {
            const axiosError = error as AxiosError;
            if (axiosError.response && axiosError.response.data && (axiosError.response.data as any).message) {
                setError((axiosError.response.data as any).message);
            } else {
                setError('An error occurred');
            }
        }
    };

    const handlePasswordButtons = () => {
        setShowChangePassword(!showChangePassword);
        setShowChangeButton(!showChangeButton);
    }

    return (
        <form>
            {user ? (
                <>
                    <label>
                        First Name:
                        <input
                            type="text"
                            name="first_name"
                            value={user.first_name}
                            readOnly
                        />
                    </label>
                    <label>
                        Last Name:
                        <input
                            type='text'
                            name='last_name'
                            value={user.last_name}
                            readOnly
                        />
                    </label>
                    <label>
                        Birth Date:
                        <input
                            type='date'
                            name='birthday'
                            value={user.birthday}
                            readOnly
                        />
                    </label>
                    <label>
                        Email:
                        <input
                            type='email'
                            name='email'
                            value={user.email}
                            readOnly
                        />
                    </label>
                    {showChangeButton && (
                        <div>
                            <button type="button" onClick={handlePasswordButtons}>Change Password</button>
                        </div>
                    )}
                    {showChangePassword && (
                        <div className='password-input'>
                            <div>
                                <label>New Password:</label>
                                <input
                                    type='password'
                                    name="password"
                                    value={updatedPassword}
                                    onChange={(e) => setUpdatedPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label>Confirm New Password:</label>
                                <input
                                    type='password'
                                    name="password"
                                    value={confirmUpdatedPassword}
                                    onChange={(e) => setConfirmUpdatedPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <br />
                            <div>
                                <button type="button" onClick={handlePasswordChange}>Update Password</button>
                                <button type="button" onClick={handlePasswordButtons}>Cancle</button>
                            </div>
                        </div>
                    )}
                    <br />
                    <div>
                        <button type="button" onClick={() => setShowConfirm(true)}>Delete This Account</button>
                    </div>
                    {showConfirm && (
                        <div>
                            <p>Are you sure you want to delete this account?</p>
                            <button type="button" onClick={handleDeleteAccount}>Yes</button>
                            <button type="button" onClick={() => setShowConfirm(false)}>Cancel</button>
                        </div>
                    )}
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </>
            ) : (
                <p>Loading...</p>
            )}
        </form>
    );
};

export default Settings;