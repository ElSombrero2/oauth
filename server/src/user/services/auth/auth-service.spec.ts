import { faker } from "@faker-js/faker"
import bcrypt from 'bcrypt'
import { Responses } from "../../../utils/responses/responses"
import { UserModel } from "../../entities/user/user.entity"
import { JwtService } from "../jwt/jwt.service"
import { AuthService } from './auth.service'
import jsonwebtoken from 'jsonwebtoken'

describe('Auth service', () => {

    let service!: AuthService
    let jwt = new JwtService(jsonwebtoken)

    beforeEach(() => { service = new AuthService(UserModel, bcrypt, jwt) })

    it('Should login with password and username', async () => {
        
        const username = faker.internet.userName() 
        const password = faker.internet.password()
        const user = {picture: faker.image.avatar(), email: faker.internet.email(), _id: faker.datatype.uuid()}
        const hashedPassword =  bcrypt.hashSync(password, 10)
        jest.spyOn(UserModel, 'findOne').mockResolvedValue({password: hashedPassword, username, ...user})
    
        expect(await service.login(username, password)).toHaveProperty('token')

    })

    test('Bcrypt compare should take password and hashed password argument', async () => {
        
        const username = faker.internet.userName() 
        const password = faker.internet.password()
        const hashedPassword =  bcrypt.hashSync(password, 10)
        jest.spyOn(UserModel, 'findOne').mockResolvedValue({password: hashedPassword})
        const spyOnCompareSync = jest.spyOn(bcrypt, 'compareSync')
        spyOnCompareSync.mockReturnValue(true)

        expect(await service.login(username, password)).toHaveProperty('token')
        expect(spyOnCompareSync).toBeCalledWith(password, hashedPassword)

    })


    it('Should throw a not found exception if user is falsy', async () => {

        const username = faker.internet.userName()
        const password = faker.internet.password()
        jest.spyOn(UserModel, 'findOne').mockResolvedValue(null)

        await expect(service.login(username, password)).rejects.toEqual(Responses.NOT_FOUND)

    })

    it('Should throw an Internal Server Exception if findOne is rejected', async () => {

        const username = faker.internet.userName()
        const password = faker.internet.password()
        jest.spyOn(UserModel, 'findOne').mockRejectedValue(null)

        await expect(service.login(username, password)).rejects.toEqual(Responses.INTERNAL_SERVER_ERROR) 

    })

    it('Should throw an exception if compareSync is false', async () => {
        
        jest.spyOn(UserModel, 'findOne').mockResolvedValue(true)
        const spyOnCompareSync = jest.spyOn(bcrypt, 'compareSync')
        spyOnCompareSync.mockReturnValue(false)

        await expect(service.login(faker.internet.password(), faker.internet.password()))
        .rejects.toEqual(Responses.WRONG_PASSWORD)

    })
})