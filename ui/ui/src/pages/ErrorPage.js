import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <div>
            <h1>404</h1>
            <p>Looks like something went wrong. Go back to the home page and try again!</p>
            <Link to="/">Home Page</Link>
        </div>
    );
}

export default ErrorPage;