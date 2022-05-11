import { useContext } from "react";
import { useSelector } from "react-redux";

import { AvatarContext } from '../../context/Avatar';

import './UserIcons.css';

export const UserIcon = ({ givenUser, size, isShareIcon }) => {
    const { avatars } = useContext(AvatarContext);
    const sessionUser = useSelector(state => state.session?.user);

    const user = givenUser || sessionUser;

    const avatar = avatars[user?.avartar_id];

    const styleObj = {
        backgroundImage: `url(${avatar?.imageUrl})`,
    };

    if (size) {
        styleObj['height'] = `${size}px`;
        styleObj['width'] = `${size}px`;
    }

    return (
        <div className={`user__icon ${isShareIcon ? 'share__icon' : ''}`}
            style={styleObj}
            title={givenUser ? givenUser.email : ''} />
    )
};
