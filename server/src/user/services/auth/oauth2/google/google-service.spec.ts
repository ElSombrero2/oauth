import { GoogleApiClient, GoogleOauth2Client } from "../../../../../modules/client/client.module"
import { UserModel } from "../../../../entities/user/user.entity"
import { JwtService } from "../../../jwt/jwt.service"
import { UserService } from "../../../user/user.service"
import { GoogleService } from "./google.service"
import jwt from 'jsonwebtoken'
import QueryString from 'querystring'
import { faker } from "@faker-js/faker"
import { Responses } from "../../../../../utils/responses/responses"


describe('Google service', () => {
    
    let service!: GoogleService
    let userService!: UserService
    let jwtService!: JwtService

    beforeEach(() => {
        userService = new UserService(UserModel)
        jwtService = new JwtService(jwt)
        service = new GoogleService(GoogleOauth2Client, GoogleApiClient, userService, jwtService)
        jest.clearAllMocks()
    })

    it('Should login with google', async () => {
        
        const code = 'random-code'
        const oauth2Response = {access_token: '<token>' }

        const user = {
            sub: faker.datatype.uuid(),
            picture: faker.image.avatar(),
            email: faker.internet.email(),
            email_verified: true,
        }

        const createdUser = {
            _id: faker.datatype.uuid(),
            username: user.sub,
            email: user.email,
            picture: user.picture
        }

        const token = jwtService.sign(createdUser, 3600)

        const spyOnPost = jest.spyOn(GoogleOauth2Client, 'post')
        spyOnPost.mockResolvedValue({data: oauth2Response})

        jest.spyOn(userService, 'findByEmail').mockResolvedValue(null as any)
        jest.spyOn(jwtService, 'sign').mockReturnValue(token)
        jest.spyOn(userService, 'createWithOauth2').mockResolvedValue(createdUser)
        jest.spyOn(GoogleApiClient, 'get').mockResolvedValue({data: user})

        expect(await service.login(code)).toEqual({token})

    })

    it('Should throw an Internal Server Error if the email address is not verified', async () => {

        const oauth2Response = {access_token: '<token>' }
        const user = { email_verified: false }

        jest.spyOn(GoogleOauth2Client, 'post').mockResolvedValue({data: oauth2Response})
        jest.spyOn(GoogleApiClient, 'get').mockResolvedValue({data: user})

        try{ await service.login('Code') }
        catch(e){ expect(e).toEqual(Responses.INTERNAL_SERVER_ERROR) }

    })

    it('Should throw an Internal Server Error if the API Call throw an error', async () => {

        const code = 'random-code'

        jest.spyOn(GoogleOauth2Client, 'post').mockRejectedValue(null)

        try{ await service.login(code) }
        catch(e){ expect(e).toEqual(Responses.INTERNAL_SERVER_ERROR) }

    })
})