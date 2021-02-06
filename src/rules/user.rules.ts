import bcrypt from 'bcrypt';
import { check } from 'express-validator/check';
import { User } from '../models/user';

export const userRules = {
    forRegister: [
        check('email')
            .isEmail().withMessage('Invalid Email Format')
            .custom(email => User.findAll({ where: { email } }).then(u => !!!u)).withMessage('Email exists'),
        check('password')
            .isLength({ min: 8 }).withMessage('Invalid Password'),
        check('confirmPassword')
            .custom((confirmPassword, { req }) => req.body.password === confirmPassword).withMessage('Password are diferent')
    ],
    forLogin: [
        check('email')
            .isEmail().withMessage('Invalid Email Format')
            .custom(email => User.findOne({ where: { email } }).then(u => !!u)).withMessage('Invalid Email or password'),
        check('password')
            .custom((password, { req }) => {
                return User.findOne({ where: { email: req.body.email } })
                    .then(u => bcrypt.compare(password, u!.password))
            }).withMessage('Invalid Email or Password')
    ]
}
