import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { login } from '../../store/session';

import './Splashpage.css';

const Splashpage = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const demoLogin = async () => {
        await dispatch(login('demoone@aa.io', 'password'));
        history.push('/');
    };

    return (
        <div id='splashpage'>
            <div>
                <img
                    id='chicken__4__light__gray'
                    src='static/chicken-4-light-gray.png'
                    alt='chicken__4__light__gray' />
            </div>
            <div>
                <img
                    id='chicken__3__brown'
                    src='static/chicken-3-brown.png'
                    alt='chicken__3__brown' />
            </div>
            <div>
                <img
                    id='chicken__8__dark__gray'
                    src='static/chicken-8-dark-gray.png'
                    alt='chicken__8__dark__gray' />
            </div>
            <div className='splash__container'>
                <div className="henmo__logo__splash">
                    <img src='static/henmo-logo.png' alt='henmo-logo' />
                </div>
                <div className="splash__btns__container">
                    <Link>
                        <button className='splash__btn orange__button__v2' onClick={demoLogin}>Demo User</button>
                    </Link>
                    <Link to='/login'>
                        <button className='splash__btn red__button__v2'>Log In</button>
                    </Link>
                    <Link to='/signup'>
                        <button className='splash__btn red__button__v2'>Sign Up</button>
                    </Link>
                </div>
            </div>
            <div className='one__liner'>
                <p>is a clone of venmo where <span className="bold__chickens">chickens</span> are the currency</p>
            </div>
            {/* <div>
                <img id='image_splash' src='static/splashpage.png' alt='henmo-logo' />
            </div> */}
        </div>
    )
};

export default Splashpage;
