const { check } = require('express-validator');

// Validation middleware for login
const loginCheck = [
    check('email').isEmail().withMessage('Invalid email address'),
    check('password').notEmpty().withMessage('Password is required'),
];

// Validation middleware for signup
const signupCheck = [
    check('name').notEmpty().withMessage('Name is required').isLength({ min: 3 }).withMessage('Name must be at least 3 characters long'),
    check('email').isEmail().withMessage('Invalid email address'),
    check('password')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
];

module.exports = {
    loginCheck,
    signupCheck,
};
