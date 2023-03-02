import { JwtService } from "./jwt.service"
import jsonwebtoken from 'jsonwebtoken'
import { faker } from "@faker-js/faker"

describe('Jwt Service', () => {

    let jwt!: JwtService

    beforeEach(() => {
        jwt = new JwtService(jsonwebtoken)
        jest.clearAllMocks()
    })

    it('Should return the token returned by the jwt sign function', () => {
        
        const token = '<token>'
        const payload = {username: faker.internet.userName()}
        const spyOnSign = jest.spyOn(jsonwebtoken, 'sign')
        spyOnSign.mockReturnValue(token as any)

        expect(jwt.sign(payload)).toEqual(token)
        expect(spyOnSign).toBeCalledWith(payload, process.env.KEY, {expiresIn: 3600})

    })

    it('Should return the payload if the token is valid', () =>  {

        const payload = { username: faker.internet.userName() }
        const token = '<token>'
        const spyOnVerify = jest.spyOn(jsonwebtoken, 'verify')
        spyOnVerify.mockReturnValue(payload as any)

        expect(jwt.verify(token)).toEqual(payload)
        expect(spyOnVerify).toBeCalledWith(token, process.env.KEY)
    
    })

    it('Should return null if the token is not valid', () => {

        jest.spyOn(jsonwebtoken, 'verify').mockImplementation(() => {throw null})

        expect(jwt.verify('<wrong-token>')).toBeNull()
        

    })

})