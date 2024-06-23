import React, { useEffect, useState } from 'react';
import './progressBar.css';

const ProgressBar: React.FC<{ duration: number }> = ({ duration }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let start = Date.now();

        const interval = setInterval(() => {
            const timeElapsed = Date.now() - start;
            const newProgress = Math.min((timeElapsed / duration) * 100, 100);
            setProgress(newProgress);

            if (newProgress >= 100) {
                clearInterval(interval);
            }
        }, 50);

        return () => clearInterval(interval);
    }, [duration]);

    return (
        <div className="progress-bar">
            <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
        </div>
    );
};

export default ProgressBar;
