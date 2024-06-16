import React from 'react';
import ProgressBar from './progressBar';
import './successScreen.css';

const SuccessScreen: React.FC = () => {
    return (
        <div className="success-screen">
            <h1>Sign Up Successful!</h1>
            <ProgressBar duration={2000} />
        </div>
    );
};

export default SuccessScreen;
