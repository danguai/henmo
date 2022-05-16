// S I G N   U P
export const validateFirstName = firstName => {
    if (!firstName) return `Please provide a First Name.`;

    if (firstName.length > 100) return `First Name should be less than 100 characters`;
    return '';
};

export const validateLastName = lastName => {
    if (!lastName) return `Please provide a Last Name.`;

    if (lastName.length > 100) return `Last Name should be less than 100 characters`;
    return '';
};

export const validateAvatar = avatarId => {
    if (!avatarId) return `You must choose an avatar`;
};

export const validateEmail = (email) => {
    if (!email) return 'Please provide an email.';

};

export const validatePassword = (password) => {
    if (!password) return `Password is required.`;
};

export const validateRepeatPassword = (password, repeatPassword) => {
    if (password !== repeatPassword) return `Repeat Password doesn't match Password.`;
};
