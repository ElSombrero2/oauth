import { Responses, HttpResponse as _HttpResponse, HttpResponse } from "../../../utils/responses/responses";
import { LoginResponseDto } from "../../entities/user/dto/login-user.dto";
import { User } from "../../entities/user/user.entity";
import bcrypt from 'bcrypt'

type Bcrypt = typeof bcrypt

export class AuthService{

    constructor(private Model: User, private bcrypt: Bcrypt){}

    public async login(username: string, password: string): Promise<LoginResponseDto>{
        try{
            const user = await this.Model.findOne({username})
            if(!user) throw Responses.NOT_FOUND
            if(!this.bcrypt.compareSync(password, user.password)) throw Responses.WRONG_PASSWORD
            return { token: '<token>' }
        }catch(e: any){
            if(e instanceof HttpResponse) throw e
            throw Responses.INTERNAL_SERVER_ERROR 
        }
    }

}