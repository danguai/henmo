import { createContext } from "react";
import './Avatar.css';

export const AvatarContext = createContext();

export const avatars = {
    1: { imageUrl: '/static/chicken-1-white.png', color: '#B3D035', fontColor: '#035B2F' },
    2: { imageUrl: '/static/chicken-2-black.png', color: '#B3D035', fontColor: '#035B2F' },
    3: { imageUrl: '/static/chicken-3-brown.png', color: '#B3D035', fontColor: '#035B2F' },
    4: { imageUrl: '/static/chicken-4-light-gray.png', color: '#B3D035', fontColor: '#035B2F' },
    5: { imageUrl: '/static/chicken-5-dark-white.png', color: '#B3D035', fontColor: '#035B2F' },
    6: { imageUrl: '/static/chicken-6-yellow.png', color: '#B3D035', fontColor: '#035B2F' },
    7: { imageUrl: '/static/chicken-7-orange.png', color: '#B3D035', fontColor: '#035B2F' },
    8: { imageUrl: '/static/chicken-8-dark-gray.png', color: '#B3D035', fontColor: '#035B2F' }
};

export const AvatarProvider = ({ children }) => {
    return (
        <AvatarContext.Provider value={{ avatars }}>
            {children}
        </AvatarContext.Provider>
    )
};
