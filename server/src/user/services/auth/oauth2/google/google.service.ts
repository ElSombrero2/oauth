import { AxiosInstance } from "axios";
import QueryString from 'querystring'
import { Responses } from "../../../../../utils/responses/responses";
import { GoogleUserDto } from "../../../../entities/user/dto/google-user.dto";
import { LoginResponseDto } from "../../../../entities/user/dto/login-user.dto";
import { JwtService } from "../../../jwt/jwt.service";
import { UserService } from "../../../user/user.service";

export class GoogleService{

    constructor(private googleOauth2Client: AxiosInstance, private googleApiClient: AxiosInstance, private userService: UserService, private jwt: JwtService){}

    private async handle(code: string): Promise<GoogleUserDto>{
        try{
            const query = QueryString.stringify({
                code,
                client_id: process.env.GOOGLE_CLIENT_ID,
                client_secret: process.env.GOOGLE_CLIENT_SECRET,
                grant_type: 'authorization_code',
                redirect_uri: process.env.GOOGLE_REDIRECT_URI
            })

            const tokenResponse = await this.googleOauth2Client.post(`/token?${query}`)
            const {access_token} = tokenResponse.data

            const userInfoRes = await this.googleApiClient.get('/oauth2/v3/userinfo', {headers: {Authorization: `Bearer ${access_token}`}})
            return userInfoRes.data
        }catch(e){ throw Responses.INTERNAL_SERVER_ERROR }
    }

    
    private async subscribe(username: string, email: string, picture: string){
        return await this.userService.createWithOauth2(username, email, picture)
    }

    public async login(code: string): Promise<LoginResponseDto>{
        try{
            const googleUserInfo = await this.handle(code)
            if(!googleUserInfo.email_verified) throw null
            let user = await this.userService.findByEmail(googleUserInfo.email)
            if(!user) user = await this.subscribe(googleUserInfo.sub, googleUserInfo.email, googleUserInfo.picture)
            const {_id, picture, username, email} = user
            return { token: this.jwt.sign({_id, username, email, picture}) }
        }
        catch(e){ throw Responses.INTERNAL_SERVER_ERROR }
    }

}