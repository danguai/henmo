import { createContext } from "react";

import './Avatar.css';

export const AvatarContext = createContext();

export const avatars = {
    1: { imageUrl: '/static/chicken-1-white.png' },
    2: { imageUrl: '/static/chicken-2-black.png' },
    3: { imageUrl: '/static/chicken-3-brown.png' },
    4: { imageUrl: '/static/chicken-4-light-gray.png' },
    5: { imageUrl: '/static/chicken-5-dark-white.png' },
    6: { imageUrl: '/static/chicken-6-yellow.png' },
    7: { imageUrl: '/static/chicken-7-orange.png' },
    8: { imageUrl: '/static/chicken-8-dark-gray.png' }
};

export const AvatarProvider = ({ children }) => {
    return (
        <AvatarContext.Provider value={{ avatars }}>
            {children}
        </AvatarContext.Provider>
    )
};
