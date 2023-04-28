import { FindUserDto } from "../../entities/user/dto/find-user.dto"
import { UserModel } from "../../entities/user/user.entity"
import { UserService } from "./user.service"
import {faker} from '@faker-js/faker'
import { Responses } from "../../../utils/responses/responses"
import { CreateUserDto } from "../../entities/user/dto/create-user.dto"
import { AuthTypes } from "../../../utils/auth-types"

jest.mock('../../entities/user/user.entity')

describe('User service', () => {

    let service!: UserService

    beforeEach(() => {
        service = new UserService(UserModel)
        jest.resetAllMocks()
    })

    it('Should create and user and save it to the database', async () => {

        const user: CreateUserDto = {
            username: faker.internet.userName(), 
            email: faker.internet.email(), 
            password: faker.internet.password()
        };
        
        expect(await service.create(user)).toEqual(Responses.CREATED)
        expect(UserModel).toBeCalledWith(user)

    })

    it('Should throw an Internal Server Error if password is falsy', async () => {

        const user: any = {
            username: faker.internet.userName(), 
            email: faker.internet.email()
        };
        
        await expect(service.create(user)).rejects.toEqual(Responses.INTERNAL_SERVER_ERROR)

    })

    it('Should throw an Internal Server Error if there is an error in create', async () => {

        const user: CreateUserDto = {
            username: faker.internet.userName(), 
            email: faker.internet.email(), 
            password: faker.internet.password()
        };

        const save = jest.fn().mockRejectedValue(null);

        (UserModel as unknown as jest.Mock).mockReturnValue({...user, save})

        await expect(service.create(user)).rejects.toEqual(Responses.INTERNAL_SERVER_ERROR)
    })

    it('Should create and user and save it to the database from Oauth2', async () => {

        const username = faker.internet.userName() 
        const email = faker.internet.email()
        const picture = faker.image.avatar()
        const _id = faker.datatype.uuid() 
        const user = {username, picture, email, type: AuthTypes.GOOGLE}
        const saveMock = jest.fn();
        (UserModel as unknown as jest.Mock).mockReturnValue({_id, ...user, save: saveMock})
        
        expect(await service.createWithOauth2(username, email, picture)).toEqual({_id, ...user, save: saveMock})
        expect(UserModel).toBeCalledWith(user)
        expect(saveMock).toBeCalledTimes(1)

    })

    it('Should throw an Internal Server Error if there is an error in createOAuth2', async () => {

        const username = faker.internet.userName() 
        const email = faker.internet.email()
        const picture = faker.image.avatar();

        (UserModel as unknown as jest.Mock).mockReturnValue({save: jest.fn().mockRejectedValue(null)})

        await expect(service.createWithOauth2(username, email, picture)).rejects.toEqual(Responses.INTERNAL_SERVER_ERROR)

    })

    it('Should fetch all users from database', async () => {
        
        const data: FindUserDto[] = [{
            _id: faker.datatype.uuid(), 
            email: faker.internet.email(), 
            username: faker.internet.userName(), 
            picture: faker.image.people()
        }]
        jest.spyOn(UserModel, 'find').mockResolvedValue(data)

        expect(await service.findAll()).toEqual(data)

    })

    it('Should throw an Internal Server Error on Error', async () => {
        
        jest.spyOn(UserModel, 'find').mockRejectedValue(null)
        
        await expect(service.findAll()).rejects.toEqual(Responses.INTERNAL_SERVER_ERROR)

    })

    it('Should find an user from database', async () => {

        const data: FindUserDto = {
            _id: faker.datatype.uuid(), 
            email: faker.internet.email(), 
            username: faker.internet.userName(), 
            picture: faker.image.people()
        }
        const spyOnFindById = jest.spyOn(UserModel, 'findById')
        spyOnFindById.mockResolvedValue(data)

        expect(await service.findOne(data._id)).toEqual(data)
        expect(spyOnFindById).toBeCalledWith(data._id, ['_id', 'username', 'email', 'picture'])

    })

    it('Should throw a Not Found Exception if the user is not macthed', async () => {

        const id = 'fake_id'
        const spyOnFindById = jest.spyOn(UserModel, 'findById')
        spyOnFindById.mockRejectedValue(null)

        await expect(service.findOne(id)).rejects.toEqual(Responses.NOT_FOUND)
        expect(spyOnFindById).toBeCalledWith(id, ['_id', 'username', 'email', 'picture'])

    })

    it('Should find an user from Database by email', async () => {

        const data: FindUserDto = {
            _id: faker.datatype.uuid(), 
            email: faker.internet.email(), 
            username: faker.internet.userName(), 
            picture: faker.image.people()
        }
        const spyOnFindOne = jest.spyOn(UserModel, 'findOne')
        spyOnFindOne.mockResolvedValue(data)

        expect(await service.findByEmail(data.email)).toEqual(data)
        expect(spyOnFindOne).toBeCalledWith({email: data.email}, ['_id', 'username', 'email', 'picture'])

    })

    it('Should throw a Not Found Exception if the user is not macthed', async () => {

        const email = 'false_email'
        const spyOnFindOne = jest.spyOn(UserModel, 'findOne')
        spyOnFindOne.mockRejectedValue(null)

        await expect(service.findByEmail(email) ).rejects.toEqual(Responses.NOT_FOUND)
        expect(spyOnFindOne).toBeCalledWith({email}, ['_id', 'username', 'email', 'picture'])

    })

})