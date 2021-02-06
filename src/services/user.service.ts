import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as BlueBird from 'bluebird';
import { User, UserModel, UserAddModel, UserViewModel } from '../models/user';

export class UserService {
    private readonly _saltRounds = 12
    private readonly _jwtSecret = '0.rfyj3n9nzh'

    static get userAttributes() {
        return ['id', 'email']
    }

    private static _user: any

    static get user() {
        return UserService._user
    }

    register({ email, password }: UserAddModel) {
        return bcrypt.hash(password, this._saltRounds)
            .then((hash) => {
                return User.create({ email, password: hash }).then(u => {
                    this.getUserbyId(u!.id)
                })
            })
    }

    createToken(payload: {}, expiresIn: string) {
        return jwt.sign(payload, this._jwtSecret, { expiresIn })
    }

    login({ email }: UserAddModel) {
        return User.findOne({ where: { email } }).then(u => {
            const { id, email } = u!
            return { token: this.createToken({ id, email }, '24h') }
        })
    }

    verifyToken(token: string) {
        return new Promise((resolve, _) => {
            jwt.verify(token, this._jwtSecret, (err, decoded: any) => {
                if (err) {
                    resolve(false)
                    return
                }
                UserService._user = User.findByPk(decoded['id'])
                resolve(true)
                return
            })
        }) as Promise<Boolean>
    }

    getUserbyId(id: number) {
        return User.findByPk(id, {
            attributes: UserService.userAttributes
        }) as BlueBird<UserViewModel>
    }
}