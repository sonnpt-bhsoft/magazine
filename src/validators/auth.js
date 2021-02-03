import { check, validationResult } from 'express-validator'

export const validateSignUpRequest = [
    check('firstName').notEmpty().withMessage('firstName is required'),
    check('lastName').notEmpty().withMessage('lastName is required'),
    check('email').isEmail().withMessage('Valid Email is required'),
    check('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters'),
]

export const validateSignInRequest = [
    check('email').isEmail().withMessage('Valid Email is required'),
    check('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters'),
]

export const isRequestValidated = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.array().length > 0) {
        return res.status(400).json({ errors: errors.array()[0].msg })
    }
    next();
}