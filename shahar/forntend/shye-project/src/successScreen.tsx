import React from 'react';
import ProgressBar from './progressBar';
import './successScreen.css';

const SuccessScreen: React.FC = () => {
    return (
        <div className="success-screen">
            <h1>SUCCESS</h1>
            <p>Congratulations, your account has been successfuly created.</p>
            <ProgressBar duration={3000} />
        </div>
    );
};

export default SuccessScreen;
