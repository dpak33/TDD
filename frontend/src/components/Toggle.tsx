import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Toggle.css';

const Toggle: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const currentPath = location.pathname;

    const handleClick = () => {
        if (currentPath === '/jobsearch') {
            navigate('/savedjobs');
        } else if (currentPath === '/savedjobs') {
            navigate('/jobsearch');
        } else if (currentPath === '/login') {
            navigate('/signup');
        } else if (currentPath === '/signup') {
            navigate('/login');
        }
    };

    const getToggleText = () => {
        if (currentPath === '/jobsearch') {
            return 'To Saved Jobs';
        } else if (currentPath === '/savedjobs') {
            return 'To Job Search';
        } else if (currentPath === '/login') {
            return 'To Sign Up';
        } else if (currentPath === '/signup') {
            return 'To Login';
        } else {
            return '';
        }
    };

    return (
        <div
            className="toggle-container"
            onClick={handleClick}
            role="button"
            aria-label="toggle navigation"
        >
            <span>↩</span>
            <h3>{getToggleText()}</h3>
        </div>
    );
};

export default Toggle;