import mongoose from 'mongoose'
import { AuthTypes } from '../../../utils/auth-types'

const UserSchema = new mongoose.Schema({
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

export type User = typeof UserSchema

export const UserModel = mongoose.model('user', UserSchema)
