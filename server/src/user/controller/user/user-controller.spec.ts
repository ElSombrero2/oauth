import { UserModel } from "../../entities/user/user.entity"
import { UserService } from "../../services/user/user.service"
import { UserController } from "./user.controller"
import HttpMocks from 'node-mocks-http'
import { faker } from "@faker-js/faker"
import { Responses } from "../../../utils/responses/responses"

describe('User controller', () => {

    let controller!: UserController
    const service = new UserService(UserModel)
    const req = HttpMocks.createRequest()
    const res = HttpMocks.createResponse()

    beforeEach(() => {
        controller = new UserController(service)
        jest.clearAllMocks()
        
    })

    it('Should create an user', async () => {

        const body = {
            username: faker.internet.userName,
            email: faker.internet.email,
            password: faker.internet.password() 
        }
        req.body = body
        const spyOnCreate = jest.spyOn(service, 'create')
        spyOnCreate.mockResolvedValue(Responses.CREATED)

        expect(await controller.create(req, res)).toBe(Responses.CREATED)
        expect(spyOnCreate).toBeCalledWith(body)

    })

    it('Should throw the service error', async () => {
        
        jest.spyOn(service, 'create').mockRejectedValue(Responses.INTERNAL_SERVER_ERROR)

        try{ await controller.create(req, res) }
        catch(e){ expect(e).toBe(Responses.INTERNAL_SERVER_ERROR) }

    })  

    it('Should fetch all users', async () => {

        const {userName, email} = faker.internet
        const users = [{_id: faker.datatype.uuid(), username: userName(), email: email(), picture: faker.image.avatar() }]
        jest.spyOn(service, 'findAll').mockResolvedValue(users)

        expect(await controller.findAll(req, res)).toEqual(users)

    })

    it('Should throw the service error', async () => {
        
        jest.spyOn(service, 'findAll').mockRejectedValue(Responses.INTERNAL_SERVER_ERROR)

        try{ await controller.findAll(req, res) }
        catch(e){ expect(e).toBe(Responses.INTERNAL_SERVER_ERROR) }

    })

    it('Should find an user by id', async () => {

        const {userName, email} = faker.internet
        const user = {_id: faker.datatype.uuid(), username: userName(), email: email(), picture: faker.image.avatar() }
        const spyOnFindOne = jest.spyOn(service, 'findOne').mockResolvedValue(user)
        req.params = {id: user._id}

        expect(await controller.findOne(req, res)).toEqual(user)
        expect(spyOnFindOne).toBeCalledWith(req.params.id)

    })

    it('Should throw a not found error if the user is not found', async () => {
        
        jest.spyOn(service, 'findOne').mockRejectedValue(Responses.NOT_FOUND)

        try{ await controller.findOne(req, res) }
        catch(e){ expect(e).toBe(Responses.NOT_FOUND) }

    })
})