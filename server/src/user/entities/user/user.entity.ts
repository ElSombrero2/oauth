import mongoose from 'mongoose'
import { AuthTypes } from '../../../utils/auth-types'
import bcrypt from 'bcrypt'
import { PasswordMiddleware } from './middlewares/password/password.middleware'

export const UserSchema = new mongoose.Schema({
    email: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true
    },
    username: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true
    },
    password: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    picture: mongoose.Schema.Types.String,
    type: {
        type: mongoose.Schema.Types.String,
        required: true,
        default: AuthTypes.CLASSIC
    }
})

UserSchema.pre('save', PasswordMiddleware(bcrypt))

export const UserModel = mongoose.model('user', UserSchema)

export type User = typeof UserModel
