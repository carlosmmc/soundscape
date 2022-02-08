import '../styling/error.css'
import React from 'react'
import { Link } from 'react-router-dom'

const ErrorPage = () => {
    return (
        <div className="ErrorPage">
            <h1 className="ErrorTitle">Whoops!</h1>
            <h4 className="SubTitle">Page Not Found</h4>
            <p className="ErrorText">Something went wrong & we couldn't find the page you requested! Try going back to the home page and trying that again.</p>
            <Link to="/" className='GoHome'>Home Page</Link>
        </div>
    );
}

export default ErrorPage;