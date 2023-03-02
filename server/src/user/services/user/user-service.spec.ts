import { FindUserDto } from "../../entities/user/dto/find-user.dto"
import { UserModel } from "../../entities/user/user.entity"
import { UserService } from "./user.service"
import {faker} from '@faker-js/faker'
import { Responses } from "../../../utils/responses/responses"
import { CreateUserDto } from "../../entities/user/dto/create-user.dto"

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

    it('Should throw an Internal Server Error if there is an error', async () => {

        const user: CreateUserDto = {
            username: faker.internet.userName(), 
            email: faker.internet.email(), 
            password: faker.internet.password()
        };

        (UserModel as unknown as jest.Mock).mockReturnValue({save: jest.fn().mockRejectedValue(null)})

        try{ await service.create(user) }
        catch(e){ expect(e).toEqual(Responses.INTERNAL_SERVER_ERROR) }

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

        try{ await service.findAll() }
        catch(e){ expect(e).toEqual(Responses.INTERNAL_SERVER_ERROR) }

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

        try{ await service.findOne(id) }
        catch(e){
            expect(e).toEqual(Responses.NOT_FOUND)
            expect(spyOnFindById).toBeCalledWith(id, ['_id', 'username', 'email', 'picture'])
        }
    })

})