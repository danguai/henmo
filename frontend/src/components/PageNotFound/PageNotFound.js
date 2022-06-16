import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
    return (
        <Link>
            <img src='/static/404.png' alt='404-error' />
        </Link>
    )
}

export default PageNotFound;
