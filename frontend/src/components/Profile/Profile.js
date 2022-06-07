import React from 'react';
import { useSelector } from 'react-redux';

import './Profile.css';

const Profile = () => {
    const sessionUser = useSelector(state => state.session?.user);

    return (
        <div className='transactions__container'>
            {`${sessionUser.first_name}, ${sessionUser.last_name}`}
        </ div>
    )
};

export default Profile;
