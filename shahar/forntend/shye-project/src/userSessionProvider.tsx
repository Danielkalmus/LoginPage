import axios, { AxiosError } from 'axios';
import React, { createContext, FC, useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { baseURL } from './const';

// Define the User interface
export interface User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    birthday: string;
    password: string;
}

// Define the IUserSession interface
interface IUserSession {
    data: User | null;
    isProcessing: boolean;
    isSignedIn: boolean;
    error: string | null;
    signin: (email: string, password: string) => void;
}

// Define the context
const UserSessionContext = createContext<IUserSession | undefined>(undefined);

// Define the UserSessionProvider props interface
interface IProps {
    children: React.ReactNode;
}

// Define the UserSessionProvider component
export const UserSessionProvider: FC<IProps> = ({ children }) => {
    const navigate = useNavigate();
    const [data, setData] = useState<User | null>(null);
    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const signin = useCallback(async (email: string, password: string) => {
        setProcessing(true);
        setError(null); // Clear previous error

        try {
            const response = await axios.post(`${baseURL}/api/userLogin`, { email, password }, {
                headers: { 'Content-Type': 'application/json' },
            });
            const user = response.data.user;
            setData(user);
            navigate('/home');
        } catch (error: unknown) {
            const axiosError = error as AxiosError;
            if (axiosError.response && axiosError.response.data && (axiosError.response.data as any).message) {
                setError((axiosError.response.data as any).message);
                console.log(error)
            } else {
                setError('An error occurred');
            }
        } finally {
            setProcessing(false);
        }
    }, [navigate]);

    const userSession: IUserSession = useMemo(() => ({
        data,
        isProcessing: processing,
        isSignedIn: !!data?.id,
        error,
        signin,
    }), [data, processing, error, signin]);

    return (
        <UserSessionContext.Provider value={userSession}>
            {children}
        </UserSessionContext.Provider>
    );
};

export default UserSessionContext;
