import { Responses, HttpResponse as _HttpResponse, HttpResponse } from "../../../utils/responses/responses";
import { LoginResponseDto } from "../../entities/user/dto/login-user.dto";
import { User } from "../../entities/user/user.entity";
import bcrypt from 'bcrypt'
import { JwtService } from "../jwt/jwt.service";

type Bcrypt = typeof bcrypt

export class AuthService{

    constructor(private Model: User, private bcrypt: Bcrypt, private jwt: JwtService){}

    public async login(username: string, password: string): Promise<LoginResponseDto>{
        try{
            const user = await this.Model.findOne({username})
            if(!user) throw Responses.NOT_FOUND
            if(!user.password || !this.bcrypt.compareSync(password, user.password)) 
                throw Responses.WRONG_PASSWORD
            const {_id, email, picture} = user
            return { token: this.jwt.sign({_id, username, email, picture}) }
        }catch(e: any){
            if(e instanceof HttpResponse) throw e
            throw Responses.INTERNAL_SERVER_ERROR 
        }
    }

}