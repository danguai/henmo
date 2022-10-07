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

export const validateEmail = email => {
    if (!email) return 'Please provide a valid email.';
};

export const validatePassword = password => {
    if (!password) return `Password is required.`;
    if (password.length < 8) return `Password must be at least 8 characters long.`;
};

export const validateRepeatPassword = (password, repeatPassword) => {
    if (password !== repeatPassword) return `Repeat Password doesn't match Password.`;
};

// S E N D   P A Y M E N T

export const validateAmount = amount => {
    if (!amount) return `You must add a number of chickens.`;
    if (amount < 0) return `You can't send negative chickens.`;
    if (amount === 0) return `You have to send some chickens.`;
    if (amount > 500) return `You can't send more than 500 chickens.`;
};

export const validateMessage = message => {
    if (!message) return 'You must add a message.';
    if (message.length > 500) return `You can't add messages longer than 500 characters.`;
};

export const validateEmailReceiver = email => {
    if (!email) return 'Please provide an email.';
};

// A D D   C O M M E N T

export const validateComment = comment => {
    if (!comment) return `You can't send an empty comment.`;
    if (comment.length > 1000) return `You can't sent comments longer than 1000 characters.`;
};
