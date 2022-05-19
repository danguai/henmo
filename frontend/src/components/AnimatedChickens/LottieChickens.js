import React from 'react';

import Lottie from 'react-lottie';
import chickenOneWhite from '../../Lotties/chicken-1-white.json';
import chickenTwoBlack from '../../Lotties/chicken-2-black.json';
import chickenThreeBrown from '../../Lotties/chicken-3-brown.json';
import chickenFourLightGray from '../../Lotties/chicken-4-light-gray.json';
import chickenFiveDarkWhite from '../../Lotties/chicken-5-dark-white.json';
import chickenSixYellow from '../../Lotties/chicken-6-yellow.json';
import chickenSevenOrange from '../../Lotties/chicken-7-orange.json';
import chickenEightDarkGray from '../../Lotties/chicken-8-dark-gray.json';

import './LottieChickens.css';

const LottieChickens = ({ size, rotate }) => {

    const animationDatas = [
        chickenOneWhite,
        chickenTwoBlack,
        chickenThreeBrown,
        chickenFourLightGray,
        chickenFiveDarkWhite,
        chickenSixYellow,
        chickenSevenOrange,
        chickenEightDarkGray
    ];

    const randomAnimation = animationDatas[Math.floor(Math.random() * animationDatas.length)];

    const defaultBlinking = {
        loop: true,
        autoplay: true,
        animationData: randomAnimation,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid meet',
        },
    };

    const styleChicken = {
        // transform: `rotate(1deg)`
    };

    if (size) {
        styleChicken['width'] = `${size}px`;
        styleChicken['height'] = `auto`;
    }

    if (rotate) {
        styleChicken['transform'] = `rotate(${rotate}deg)`;
    }

    return (
        <>
            <Lottie
                options={defaultBlinking}
                style={styleChicken}
            />
        </>
    )
};

export default LottieChickens;
