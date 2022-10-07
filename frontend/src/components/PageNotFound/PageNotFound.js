import React from 'react';
import { Link } from 'react-router-dom';

import './PageNotFound.css';

const PageNotFound = () => {
    return (
        <Link to='/'>
            <img
                src='/static/404.png'
                alt='404-error'
                className='page__not__found__container'
            />
        </Link >
    )
}

export default PageNotFound;
