import { PasswordMiddleware } from "./password.middleware"
import bcrypt, { hash } from 'bcrypt'


describe('Password Middleware', () => {

    const next = jest.fn()
    const isModified = jest.fn()

    beforeEach(() => jest.clearAllMocks())

    it('Should test if next is called when password is verified', () => {

        const middleware = PasswordMiddleware(bcrypt)
        next.mockReturnValue(true)
        
        isModified.mockReturnValue(false);

        (middleware as Function).apply({isModified}, [next])

        expect(next).toBeCalledTimes(1)
        expect(isModified).lastCalledWith('password')

    })

    it('Should test if bcrypt received the right arguments and next is called', () => {
        
        const password = 'MyLongPassword'
        const spyOnHashSync = jest.spyOn(bcrypt, 'hashSync')
        const middleware = PasswordMiddleware(bcrypt)

        isModified.mockReturnValue(true)

        middleware.apply({password, isModified}, [next])

        expect(spyOnHashSync).toBeCalledWith(password, 10)
        expect(next).toBeCalledTimes(1)

    })

})