import React from 'react';
import { Link } from 'react-router-dom';

import './PageNotFound.css';

const PageNotFound = () => {

    const back = () => {
        return (
            <div className='back__all'>
                <Link to='/'
                    className='back__404__btn'
                >
                    BACK
                </Link>
            </div>
        )
    }
    return (
        <div className='transactions__container'>
            {back()}
            <div>
                {/* <Link to='/'> */}
                <img
                    src='/static/404.png'
                    alt='404-error'
                    className='page__not__found__container'
                />
                {/* </Link > */}
            </div>
        </div>
    )
}

export default PageNotFound;
