import { useContext } from "react";
import { useSelector } from "react-redux";
import { avatars } from '../../context/Avatar';

import './UserIcons.css';

export const UserIcon = ({ givenUser, size }) => {

    const sessionUser = useSelector(state => state.session?.user);

    const user = givenUser || sessionUser;

    const avatar = avatars[user?.avatar_id];

    const styleObj = {
        backgroundImage: `url(${avatar?.imageUrl})`,
    };

    if (size) {
        styleObj['height'] = `${size}px`;
        styleObj['width'] = `${size}px`;
    }

    return (
        <div
            className={'user__icon'}
            style={styleObj}
        />
    )
};
