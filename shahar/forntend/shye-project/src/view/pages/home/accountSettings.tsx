import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { baseURL } from '../../../const';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouseUser } from '@fortawesome/free-solid-svg-icons';
import './accountSettings.css';
import { User } from './home';
import Sidebar from './sidebar';

const Settings: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = location.state || {} as { loggedUser: User };
    const [error, setError] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [updatedPassword, setUpdatedPassword] = useState('');
    const [confirmUpdatedPassword, setConfirmUpdatedPassword] = useState('');
    const [showDeleteButton, setShowDeleteButton] = useState(true);
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);
    const [showChangePasswordButton, setShowChangePasswordButton] = useState(true);
    const [showChangePasswordContainer, setShowChangePasswordContainer] = useState(false);

    console.log(user);

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
        else if (updatedPassword !== confirmUpdatedPassword) return;
        else if (currentPassword !== user.password) return;

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
        setShowChangePasswordContainer(!showChangePasswordContainer);
        setShowChangePasswordButton(!showChangePasswordButton);
    }

    const handleDeleteButtons = () => {
        setShowConfirmDelete(!showConfirmDelete);
        setShowDeleteButton(!showDeleteButton);
    }

    const returnHome = () => {
        navigate('/home', { state: { loggedUser: user } });
    }

    return (
        <div className='form'>
             <div className='top-left'>
                <button type="button" className='icon-button' onClick={returnHome}>
                    <FontAwesomeIcon icon={faHouseUser} />
                </button>
            </div>
            
            <div className='settings-form'>
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
                        <br />
                        {showChangePasswordButton && (
                            <div>
                                <button type="button" onClick={handlePasswordButtons}>Change Password</button>
                            </div>
                        )}
                        {showChangePasswordContainer && (
                            <div className='password-input'>
                                <div>
                                    <label>Currrent Password:</label>
                                    <input
                                        type='password'
                                        name="password"
                                        value={currentPassword}
                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                        required
                                    />
                                </div>
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
                                <div className='change-password-buttons'>
                                    <button type="button" onClick={handlePasswordChange}>Update Password</button>
                                    <button type="button" onClick={handlePasswordButtons}>Cancle</button>
                                </div>
                            </div>
                        )}
                        <br />
                        {showDeleteButton && (<div>
                            <button type="button" onClick={handleDeleteButtons}>Delete This Account</button>
                        </div>)}
                        {showConfirmDelete && (
                            <div className='delete-buttons'>
                                <p>Are you sure you want to delete this account?</p>
                                <button type="button" onClick={handleDeleteAccount}>Yes</button>
                                <button type="button" onClick={handleDeleteButtons}>Cancel</button>
                            </div>
                        )}
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                    </>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
};

export default Settings;