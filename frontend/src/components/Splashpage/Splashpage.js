import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { login } from '../../store/session';

import './Splashpage.css';
import './Footer.css';

const Splashpage = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const sessionUser = useSelector(state => state.session?.user)

    const demoLogin = async () => {
        await dispatch(login('demoone@aa.io', 'password'));
        history.push('/all-approved');
    };

    if (sessionUser) {
        history.push('/all-approved');
    }

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
                    id='chicken__7__orange'
                    src='static/chicken-7-orange.png'
                    alt='chicken__7__orange' />
            </div>
            <div>
                <img
                    id='chicken__1__white'
                    src='static/chicken-1-white.png'
                    alt='chicken__1__white' />
            </div>
            <div>
                <img
                    id='chicken__8__dark__gray'
                    src='static/chicken-8-dark-gray.png'
                    alt='chicken__8__dark__gray' />
            </div>
            <div>
                <img
                    id='chicken__5__dark__white'
                    src='static/chicken-5-dark-white.png'
                    alt='chicken__5__dark__white' />
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

            <div className="built__with__container">
                <a>
                    <img id='chicken__8__dark__gray__small' src='static/chicken-8-dark-gray.png' alt='chicken__8__dark__gray' />
                </a>
                <a href='https://github.com/danguai' target="_blank" className='built__with__logos'>
                    <img className='built__with__logos' src='static/github.png' />
                </a>
                <a href='https://www.linkedin.com/in/blancodaniel/' target="_blank" className='built__with__logos'>
                    <img className='built__with__logos' src='static/linkedin.png' />
                </a>
                <a href='https://www.instagram.com/danguai/' target="_blank" className='built__with__logos'>
                    <img className='built__with__logos' src='static/instagram.png' />
                </a>
                <a href='https://d-blanco.com/' target="_blank" className='built__with__logos'>
                    d-blanco.com
                </a>
            </div>
        </div>
    )
};

export default Splashpage;
