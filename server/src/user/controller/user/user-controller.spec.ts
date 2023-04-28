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

    it('Should fetch all users', async () => {

        const {userName, email} = faker.internet
        const users = [{_id: faker.datatype.uuid(), username: userName(), email: email(), picture: faker.image.avatar() }]
        jest.spyOn(service, 'findAll').mockResolvedValue(users)

        expect(await controller.findAll(req, res)).toEqual(users)

    })

    it('Should find an user by id', async () => {

        const {userName, email} = faker.internet
        const user = {_id: faker.datatype.uuid(), username: userName(), email: email(), picture: faker.image.avatar() }
        const spyOnFindOne = jest.spyOn(service, 'findOne').mockResolvedValue(user)
        req.params = {id: user._id}

        expect(await controller.findOne(req, res)).toEqual(user)
        expect(spyOnFindOne).toBeCalledWith(req.params.id)

    })

})