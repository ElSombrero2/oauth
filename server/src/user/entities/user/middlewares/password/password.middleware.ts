import _bcrypt from 'bcrypt'

type Bcrypt = typeof _bcrypt

export const PasswordMiddleware = (bcrypt: Bcrypt) => function (this: any, next: () => void){
    if(!this.isModified('password')) return next()
    this.password = bcrypt.hashSync(this.password, 10)
    next()
}
